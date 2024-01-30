// src/app/user/user-list/user-list.component.ts

import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/data.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {

  userList!: any[];
  isLoading: boolean = true;
  constructor(private dataService: DataService, private router: Router, private dialog: MatDialog, private toster: ToastrService) { }

  ngOnInit(): void {
    try {
      this.dataService.getUserList().subscribe(users => {
        if (users.length) {
          this.userList = users;
          this.isLoading = false;
        }
        else {
          this.dataService.getDummyUsers().subscribe(users => {
            this.userList = users;
            this.isLoading = false;
          });
        }

      });
    } catch (err) {
      console.log(err);
    }
  }

  editUser(userData: any): void {
    this.router.navigate(['/user/edit', userData.id]);
  }

  deleteUser(userData: any): void {
    this.dialog.open(ConfirmationModalComponent, {
      data: { action: "delete" }
    }).afterClosed().subscribe(result => {
      if (result) {
        let _result = this.dataService.deleteUser(userData.id);
        if (_result.action) {
          this.userList = this.userList.filter((user) => user.id !== userData.id);
          this.toster.success(`User ${userData.firstname} ${userData.lastname} has been deleted`, "Deleted")
        }
        else {
          this.toster.error("An error occured", "Error")
        }
      }
    });
  }

  getInitials(name:any): string {
    // Get the first character of each name and concatenate them
    const firstInitial = name.firstname.charAt(0).toUpperCase();
    const lastInitial = name.lastname.charAt(0).toUpperCase();

    return firstInitial + lastInitial;
  }
}
