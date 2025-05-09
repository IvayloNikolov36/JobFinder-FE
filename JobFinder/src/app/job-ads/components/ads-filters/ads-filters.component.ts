import { Component, input, InputSignal, OnInit } from '@angular/core';
import { BasicModel } from '../../../core/models';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OrderEnum, SortByColumnEnum } from '../../../core/enums';
import { JobAdvertisementsService } from '../../services';
import { AdsFilterProps } from '../../models';

@Component({
  selector: 'jf-ads-filters',
  templateUrl: './ads-filters.component.html',
  standalone: false
})
export class AdsFiltersComponent implements OnInit {

  categories: InputSignal<BasicModel[]> = input.required();
  engagements: InputSignal<BasicModel[]> = input.required();
  locations: InputSignal<BasicModel[]> = input.required();

  form!: FormGroup;

  filterType: typeof SortByColumnEnum = SortByColumnEnum;
  sortType: typeof OrderEnum = OrderEnum;
  itemsCountArray!: number[];

  readonly allValue = { id: null, name: 'All' };

  constructor(
    private formBuilder: FormBuilder,
    private jobAdsService: JobAdvertisementsService
  ) {
    this.itemsCountArray = this.jobAdsService.getItemsCountArray();
  }

  ngOnInit(): void {
    this.initializeFiltersForm();
  }

  changeSortBy(data: any): void {
    const sortBy = data.value === SortByColumnEnum.Published ? SortByColumnEnum[SortByColumnEnum.Published] : SortByColumnEnum[SortByColumnEnum.Salary];
    this.form.controls['sortBy'].setValue(sortBy);
  }

  onSearchClicked(form: FormGroup): void {
    this.jobAdsService.currentPage.set(this.jobAdsService.initialPage);
    this.jobAdsService.filterModel.set({ ...form.value } as AdsFilterProps);
  }

  changeItems(selectedItemsCount: number): void {
    this.form.controls['items'].setValue(selectedItemsCount);
  }

  changeLocation(selectedLocation: number | null): void {
    this.form.controls['location'].setValue(selectedLocation);
  }

  changeCategory(selectedCategory: number | null): void {
    this.form.controls['category'].setValue(selectedCategory);
  }

  changeEngagement(selectedEngagement: number | null): void {
    this.form.controls['engagement'].setValue(selectedEngagement);
  }

  changeSortType(sortData: any): void {
    const isAscending: boolean = sortData.value === OrderEnum.Asc ? true : false;
    this.form.controls['isAscending'].setValue(isAscending);
  }

  clearSearchInput(): void {
    this.form.controls['searchText'].setValue(null);
  }

  private initializeFiltersForm(): void {
    const filter: AdsFilterProps = this.jobAdsService.filterModel();
    this.form = this.formBuilder.group({
      items: [filter.items],
      searchText: [filter.searchText],
      locationId: [filter.locationId],
      categoryId: [filter.categoryId],
      engagementId: [filter.engagementId],
      sortBy: [filter.sortBy],
      isAscending: [filter.isAscending],
      specifiedSalary: [filter.specifiedSalary],
      intership: [filter.intership]
    });
  }
}
