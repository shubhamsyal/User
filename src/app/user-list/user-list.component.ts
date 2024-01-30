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
  currentPageData: any[] = [];
  itemsPerPage:number = 9;
  handlePageChange(page: number): void {
    // Load data based on the page number
    const startIndex = (page - 1) * this.itemsPerPage; // Assuming 5 items per page
    const endIndex = startIndex + this.itemsPerPage;
    this.currentPageData = this.userList.slice(startIndex, endIndex);
  }
  ngOnInit(): void {
    try {
      this.dataService.getUserList().subscribe(users => {
        if (users.length) {
          this.userList = users;
          this.isLoading = false;
          this.handlePageChange(1);
        }
        else {
          this.dataService.getDummyUsers().subscribe(users => {
            this.userList = users;
            this.isLoading = false;
            this.handlePageChange(1);
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

  getInitials(name: any): string {
    // Get the first character of each name and concatenate them
    const firstInitial = name.firstname.charAt(0).toUpperCase();
    const lastInitial = name.lastname.charAt(0).toUpperCase();

    return firstInitial + lastInitial;
  }
  toggleActionButton(id:number) {
    // Get the button element by ID
    var actionButton:any = document.getElementById(`action-button${id}`);
    var userDiv:any = document.getElementById(`user-card${id}`);

    // Change the display property
    if (actionButton.style.display === 'none') {
      actionButton.style.display = 'block';
      userDiv.style.opacity = "0.5";
    } else {
      actionButton.style.display = 'none';
      userDiv.style.opacity = "1";
    }
  }
}
