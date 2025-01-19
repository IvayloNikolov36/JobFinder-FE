import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

@Component({
  selector: 'jf-pagination',
  templateUrl: './pagination.component.html',
  standalone: false
})
export class PaginationComponent implements OnChanges {

  @Input() totalRecords = 0;
  @Input() recordsPerPage = 0;
  @Input() activePage = 1;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  pages: number[] = [];

  ngOnChanges(): void {
    const pageCount = this.getPageCount();
    this.pages = this.getArrayOfPage(pageCount);
  }

  onClickPage(pageNumber: number): void {
    if (pageNumber < 1) {
      return;
    }

    if (pageNumber > this.pages.length) {
      return;
    }

    this.activePage = pageNumber;

    this.pageChange.emit(this.activePage);
  }

  private getPageCount(): number {
    let totalPage: number = 0;

    if (this.totalRecords > 0 && this.recordsPerPage > 0) {
      const pageCount: number = this.totalRecords / this.recordsPerPage;
      const roundedPageCount: number = Math.floor(pageCount);
      totalPage = roundedPageCount < pageCount ? roundedPageCount + 1 : roundedPageCount;
    }

    return totalPage;
  }

  private getArrayOfPage(pageCount: number): number[] {
    const pageArray: number[] = [];

    if (pageCount > 0) {
      for (let i = 1; i <= pageCount; i++) {
        pageArray.push(i);
      }
    }

    return pageArray;
  }
}

