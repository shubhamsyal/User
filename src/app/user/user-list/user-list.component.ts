// src/app/user/user-list/user-list.component.ts

import { Component, OnInit } from '@angular/core';
import { DataService } from '../../shared/data.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationModalComponent } from '../common-components/confirmation-modal/confirmation-modal.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  // initializing variables
  userList!: any[];
  isLoading: boolean = true;
  currentPageData: any[] = [];
  itemsPerPage: number = 9;
  searchTerm: string = "";
  currentPage: number = 0;
  filter: string = "asc";
  toggle: boolean = false;
  displayLength:number = 0;
  constructor(private dataService: DataService, private router: Router, private dialog: MatDialog, private toster: ToastrService) { }

  // function will take all the data in user list and sort accordingly
  //  and after that it will check searched term and return data
  handlePageChange(page: number): void {
    // Filter data based on the search term
    if (this.filter === "desc") {
      this.userList = this.userList.slice().sort(function (a, b) {
        var nameA = a.name.firstname.toLowerCase();
        var nameB = b.name.firstname.toLowerCase();
        return nameB.localeCompare(nameA);
      });
    }
    else {
      this.userList = this.userList.slice().sort(function (a, b) {
        var nameA = a.name.firstname.toLowerCase();
        var nameB = b.name.firstname.toLowerCase();
        return nameA.localeCompare(nameB);
      });
    }

    const filteredData = this.filterDataBySearchTerm();
    // Load data based on the page number
    this.displayLength = filteredData.length;
    // slicing data display on page wise per page 9
    const startIndex = (page - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.currentPageData = filteredData.slice(startIndex, endIndex);
  }

  // returns matching results for searched
  filterDataBySearchTerm(): any[] {
    // If no search term, return the original data
    if (!this.searchTerm.trim()) {
      return this.userList;
    }

    // Otherwise, filter the data based on the search term
    return this.userList.filter(item =>
      Object.values(item).some(value =>
        String(value).toLowerCase().includes(this.searchTerm.toLowerCase())
      )
    );
  }

  onSearchChange(): void {
    // When the search term changes, reset to the first page
    this.currentPage = 1;
    this.handlePageChange(this.currentPage);
  }

  // getting data from dummy api when there is no data locally
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

  // on action button edit it will change the route by passing the id of the user to be edited
  editUser(userData: any): void {
    this.sendUserInfo(userData)
    this.router.navigate(['/user/edit', userData.id]);
  }
  sendUserInfo(userData:any) {
    this.dataService.setUserInfo(userData);
  }

  // will send id to service and it will delete this user
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

  // returns initials to diplay on user cards instead of images
  getInitials(name: any): string {
    // Get the first character of each name and concatenate them
    const firstInitial = name.firstname.charAt(0).toUpperCase();
    const lastInitial = name.lastname.charAt(0).toUpperCase();

    return firstInitial + lastInitial;
  }

  // this will toggle action buttons on click on three dots
  toggleActionButton(id: number) {
    // Get the button element by ID
    var actionButton: any = document.getElementById(`action-button${id}`);
    var userDiv: any = document.getElementById(`user-card${id}`);

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
