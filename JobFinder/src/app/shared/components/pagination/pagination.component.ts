import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

const FirstPage: number = 1;

@Component({
  selector: 'jf-pagination',
  templateUrl: './pagination.component.html',
  standalone: false
})
export class PaginationComponent implements OnChanges {

  @Input() totalRecords: number = 0;
  @Input() recordsPerPage: number = 0;
  @Input() activePage: number = FirstPage;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  pages: number[] = [];
  isPreviousDisabled: boolean = true;
  isNextDisabled: boolean = true;

  ngOnChanges(): void {
    const pagesCount: number = this.getPagesCount();

    if (pagesCount <= 1) {
      this.isNextDisabled = true;
      this.isPreviousDisabled = true;
    } else {

      if (this.activePage < pagesCount) {
        this.isNextDisabled = false;
      }
      if (this.activePage > FirstPage) {
        this.isPreviousDisabled = false;
      }
    }

    this.pages = this.getArrayOfPageNumbers(pagesCount);
  }

  onPreviousClicked(event: any): void {
    this.onNavigationButtonClicked(event, -1);
  }

  onNextClicked(event: any): void {
    this.onNavigationButtonClicked(event, 1);
  }

  onClickPage(page: number): void {
    if (page < FirstPage) {
      return;
    }

    if (page > this.pages[this.pages.length - 1]) {
      return;
    }

    this.activePage = page;
    this.isPreviousDisabled = this.activePage <= FirstPage;
    this.isNextDisabled = this.activePage === this.pages[this.pages.length - 1];
    this.pageChange.emit(this.activePage);
  }

  private onNavigationButtonClicked(event: any, pageAddition: number): void {
    const toggle: any = event.source;
    const pageToGo: number = this.activePage + pageAddition;
    toggle.buttonToggleGroup.value = pageToGo;
    this.onClickPage(pageToGo);
  }

  private getPagesCount(): number {
    let maxPage: number = 0;

    if (this.totalRecords > 0 && this.recordsPerPage > 0) {
      const pageCount: number = this.totalRecords / this.recordsPerPage;
      const roundedPageCount: number = Math.floor(pageCount);
      maxPage = roundedPageCount < pageCount ? roundedPageCount + 1 : roundedPageCount;
    }

    return maxPage;
  }

  private getArrayOfPageNumbers(pageCount: number): number[] {
    const pageNumbers: number[] = [];

    if (pageCount > 0) {
      for (let i = 1; i <= pageCount; i++) {
        pageNumbers.push(i);
      }
    }

    return pageNumbers;
  }
}

