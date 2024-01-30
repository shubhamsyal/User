// src/app/user/shared/data.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private userListSubject = new BehaviorSubject<any[]>([]);
  userList$ = this.userListSubject.asObservable();

  private selectedUserSubject = new BehaviorSubject<any>(null);
  selectedUser$ = this.selectedUserSubject.asObservable();

  private apiUrl = 'https://fakestoreapi.com/users'; // Dummy API URL

  constructor(private http: HttpClient) { }

  getDummyUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((data: any) => {
        this.userListSubject.next(data);  // Update the subject with the received data
        return data;  // Return the data to the subscriber
      })
    );
  }

  getUserList(): Observable<any[]> {
    return this.userList$;
  }

  getSelectedUser(): Observable<any> {
    return this.selectedUser$;
  }

  addUser(user: any) {
    let _returnObject = {
      action: true
    }
    try {
      const userList = this.userListSubject.value;
      const isDuplicate = userList.some((u) => u.email === user.email);
      if (isDuplicate) {
        console.error('User already exists!');
      } else {
        user.id = Date.now();
        userList.push(user);
        this.userListSubject.next(userList);
      }
      return _returnObject;
    } catch (err) {
      _returnObject.action = false;
      console.log(err)
      return _returnObject;
    }
  }

  updateUser(user: any) {
    let _returnObject = {
      action: true
    }
    try {
      const userList = this.userListSubject.value;
      const index = userList.findIndex((u) => u.id === user.id);
      if (index !== -1) {
        userList[index] = user;
        this.userListSubject.next(userList);
      }
      return _returnObject;
    } catch (err) {
      _returnObject.action = false;
      console.log(err)
      return _returnObject;
    }
  }

  deleteUser(userId: number) {
    let _returnObject = {
      action: true
    }
    try {
      const userList = this.userListSubject.value;
      const updatedList = userList.filter((user) => user.id !== userId);
      this.userListSubject.next(updatedList);
      return _returnObject
    } catch (err) {
      _returnObject.action = false;
      console.log(err)
      return _returnObject;
    }
  }

  setSelectedUser(user: any): void {
    this.selectedUserSubject.next(user);
  }

  getUserById(userId: number): Observable<any> {
    return this.userList$.pipe(
      map((data: any) => data.find((user: any) => user.id === userId)
      )
    );
  }
}
