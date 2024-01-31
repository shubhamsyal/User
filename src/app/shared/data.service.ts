// src/app/user/shared/data.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  // using BehaviorSubject to transfer userlist from one component to another
  private userListSubject = new BehaviorSubject<any[]>([]);
  userList$ = this.userListSubject.asObservable();

  // using  to transfer selected user from one component to another
  userInfo: any;

  setUserInfo(info: string) {
    this.userInfo = info;
  }
  getUserInfo(){
    return this.userInfo;
  }

  private apiUrl = 'https://fakestoreapi.com/users'; // Dummy API URL

  constructor(private http: HttpClient) { }

  // will return dummy data and saves it
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

  // creates new user also validates if email or phone number already linked with other user or not
  addUser(user: any) {
    let _returnObject = {
      action: true,
      message: "User created"
    }
    try {
      const userList = this.userListSubject.value;

      // Check if a user with the same email or number already exists
      const isDuplicate = userList.some((u) => u.email === user.email || u.phone === user.phone);

      if (isDuplicate) {
        _returnObject.action = false;
        _returnObject.message = 'User with the same email or number already exists!';
      } else {
        // Create the user if not a duplicate
        user.id = Date.now();
        userList.push(user);
        this.userListSubject.next(userList);
      }
      return _returnObject;
    } catch (err) {
      _returnObject.action = false;
      _returnObject.message = "An error occured";
      console.log(err)
      return _returnObject;
    }
  }

  // update existing user also validates if email or phone number already linked with other user or not
  updateUser(user: any) {
    let _returnObject = {
      action: true,
      message: 'User updated successfully'
    };

    try {
      const userList = this.userListSubject.value;

      // Check if a user with the same email or number already exists
      const isDuplicate = userList.some(u => u.id !== user.id && (u.email === user.email || u.phone === user.phone));

      if (isDuplicate) {
        _returnObject.action = false;
        _returnObject.message = 'User with the same email or number already exists!';
      } else {
        // Update the user if not a duplicate
        const index = userList.findIndex(u => u.id === user.id);
        if (index !== -1) {
          userList[index] = user;
          this.userListSubject.next([...userList]);  // Using spread operator to create a new array
        }
      }

      return _returnObject;
    } catch (err) {
      _returnObject.action = false;
      _returnObject.message = 'An error occured';
      console.error(err);
      return _returnObject;
    }
  }

  // delete user expects an userid
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
}
