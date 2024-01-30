// pagination.component.ts

import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {
  @Input() items: any[] = [];
  @Input() itemsPerPage!: number;
  @Output() pageChange = new EventEmitter<number>();
  currentPage: number = 1; // Set the initial page value to 1
  // itemsPerPage: number = 5;

  get totalPages(): number {
    return Math.ceil(this.items.length / this.itemsPerPage);
  }

  get pageArray(): number[] {
    const pages: number[] = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  setPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.pageChange.emit(this.currentPage);
    }
  }
}
