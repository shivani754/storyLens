import { CommonModule, NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  imports: [CommonModule, NgClass],
  standalone: true,
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css',
})
export class PaginationComponent {
  @Input() currentPage = 1;
  @Input() totalPages = 1;
  @Output() pageChange = new EventEmitter<number>();

  /**
   * @description Getting pages to show in the pagination bar
   */
  get pages(): number[] {
    const visiblePages = 5;
    let start = Math.max(this.currentPage - Math.floor(visiblePages / 2), 1);
    const end = Math.min(start + visiblePages - 1, this.totalPages);

    if (end - start < visiblePages - 1) {
      start = Math.max(end - visiblePages + 1, 1);
    }

    const range = [];
    for (let i = start; i <= end; i++) {
      range.push(i);
    }
    return range;
  }

  /**
   * @description Emitting page change to parent
   * @param page
   */
  changePage(page: number) {
    if (page !== this.currentPage && page >= 1 && page <= this.totalPages) {
      this.pageChange.emit(page);
    }
  }
}
