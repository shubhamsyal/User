// pagination.component.ts

import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {
  @Input() items: any[] = [];                       //array of all users
  @Input() itemsPerPage!: number;                   //get how many cards are we showing on each page
  @Output() pageChange = new EventEmitter<number>();//emmiter which will emit page 
  currentPage: number = 1;                          // Set the initial page value to 1

  // calculates number of pages according to number of cards per page and total cards
  get totalPages(): number {
    return Math.ceil(this.items.length / this.itemsPerPage);
  }

  // returns array of pages like [1,2,3,4,5...]
  get pageArray(): number[] {
    const pages: number[] = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  // this changes page number and emmits on which page has been 
  // clicked so that we can show next set of user cards
  setPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.pageChange.emit(this.currentPage);
    }
  }
}
