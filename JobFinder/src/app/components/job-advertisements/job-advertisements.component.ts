import { Component, computed, OnInit, signal, Signal, WritableSignal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { SubscriptionsService } from './../../services/subscriptions.service';
import { JobAdvertisementsService } from '../../services/job-advertisements.service';
import { BasicModel, JobAd, JobAdsFilter } from '../../models';
import { NomenclatureService } from '../../core/services';
import { ToastrService } from 'ngx-toastr';

const ShowFiltersText: string = 'Show Filters';
const HideFiltersText: string = 'Hide Filters';
const SortByValues: string[] = ['Published', 'Salary'];
const InitialPage: number = 1;
const SelectValueNone: number = 0;
const MinItemsOnPage: number = 5;

@Component({
  selector: 'jf-job-advertisements',
  templateUrl: './job-advertisements.component.html',
  standalone: false
})
export class JobAdvertisementsComponent implements OnInit {

  categories!: Signal<BasicModel[]>;
  engagements!: Signal<BasicModel[]>;
  jobAds: JobAd[] = [];

  totalCount!: number;
  searchText: string = '';
  showFiltersArea: boolean = false;
  filterButtonLabel: string = ShowFiltersText;
  currentPage: number = InitialPage;
  itemsCount: number = MinItemsOnPage;
  engagement: number = SelectValueNone;
  sortBy: string = SortByValues[0];
  isAscending: boolean = true;

  readonly itemsCountArray: number[] = [MinItemsOnPage, 10, 15, 20, 30, 50, 100];
  readonly locationsArray: string[] = ['All', 'Sofia', 'Plovdiv', 'Varna', 'Burgas', 'Ruse', 'Stara Zagora', 'Pleven', 'Veliko Tarnovo'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private jobAdsService: JobAdvertisementsService,
    private subscriptionsService: SubscriptionsService,
    private nomenclatureService: NomenclatureService,
    private toastr: ToastrService
  ) {
    this.getDataFromQueryParams();
    this.getNomenclaturesData();
  }

  location: WritableSignal<string> = signal(this.locationsArray[0]);
  category: WritableSignal<number> = signal(SelectValueNone);

  showSubscribeButton: Signal<boolean> = computed(() => {
    return this.location() !== this.locationsArray[0] || this.category() !== 0;
  });

  ngOnInit(): void {
    this.getJobAds();
  }

  searchForJobAds(): void {
    this.currentPage = InitialPage;
    this.updateQueryParams({ page: this.currentPage, searchText: this.searchText });
    this.getJobAds();
  }

  viewAdDetails(jobAdId: number): void {
    this.router.navigate(['/job-details', jobAdId]);
  }

  subscribeForJobs(): void {
    this.subscriptionsService
      .subscribeForJobsWithCriterias(
        this.category() === 0 ? null : this.category(),
        this.location() === this.locationsArray[0] ? null : this.location())
      .subscribe({
        next: () => this.toastr.success("Succsessfully subscribed for jobs with selected criterias."),
        error: (err) => {
          this.toastr.error(err.error.errors[0]);
        }
      });
  }

  changeItemsCount(selectedItemsCount: number): void {
    this.itemsCount = selectedItemsCount;
    this.currentPage = InitialPage;
    this.updateQueryParams({ page: this.currentPage, items: selectedItemsCount });
    this.getJobAds();
  }

  changeFilterLocation(selectedLocation: string): void {
    this.currentPage = InitialPage;
    this.location.set(selectedLocation);
    this.updateQueryParams({ page: this.currentPage, location: selectedLocation });
    this.getJobAds();
  }

  changeFilterCategory(selectedCategory: string): void {
    this.currentPage = InitialPage;
    this.category.set(parseInt(selectedCategory));
    this.updateQueryParams({ page: this.currentPage, category: selectedCategory });
    this.getJobAds();
  }

  changeFilterEngagement(selectedEngagement: number): void {
    this.currentPage = InitialPage;
    this.engagement = selectedEngagement;
    this.updateQueryParams({ page: this.currentPage, engagement: selectedEngagement });
    this.getJobAds();
  }

  changeSortBy(sortBy: string): void {
    this.currentPage = InitialPage;
    this.sortBy = sortBy;
    this.updateQueryParams({ page: this.currentPage, sortBy: sortBy });
    this.getJobAds();
  }

  changeSortingOrder(orderValue: string): void {
    this.currentPage = InitialPage;
    this.isAscending = orderValue === 'true' ? true : false;
    this.updateQueryParams({ page: this.currentPage, isAscending: orderValue });
    this.getJobAds();
  }

  loadActivePageItems(activePageNumber: number): void {
    if (this.currentPage === activePageNumber) {
      return;
    }
    this.currentPage = activePageNumber;
    this.updateQueryParams({ page: this.currentPage });
    this.getJobAds();
  }

  toggleFilters(): void {
    this.showFiltersArea = !this.showFiltersArea;
    this.filterButtonLabel === ShowFiltersText
      ? this.filterButtonLabel = HideFiltersText
      : this.filterButtonLabel = ShowFiltersText;
  }

  private updateQueryParams(queryParamsObject: object): void {
    this.router.navigate([],
      {
        relativeTo: this.route,
        queryParams: queryParamsObject,
        queryParamsHandling: 'merge'
      });
  }

  private getJobAds(): void {
    const filterModel: JobAdsFilter = new JobAdsFilter(this.currentPage,
      this.itemsCount,
      this.searchText,
      this.location(),
      this.category(),
      this.engagement,
      this.sortBy,
      this.isAscending);

    this.jobAdsService.getAll(filterModel)
      .subscribe((data: any) => {
        this.totalCount = data.totalCount;
        this.jobAds = data.data;
      });
  }

  private getDataFromQueryParams = (): void => {
    const queryParams: ParamMap = this.route.snapshot.queryParamMap;

    const pageValue: string | null = queryParams.get('page');
    this.currentPage = pageValue === null ? InitialPage : parseInt(pageValue);

    const itemsValue: string | null = queryParams.get('items');
    this.itemsCount = itemsValue === null ? MinItemsOnPage : parseInt(itemsValue);

    this.searchText = queryParams.get('searchText') ?? '';
    this.location.set(queryParams.get('location') ?? this.locationsArray[0]);

    const categoryValue: string | null = queryParams.get('category');
    this.category.set(categoryValue === null ? SelectValueNone : parseInt(categoryValue));

    const engagementValue: string | null = queryParams.get('engagement');
    this.engagement = engagementValue === null ? SelectValueNone : parseInt(engagementValue);

    this.sortBy = queryParams.get('sortBy') ?? SortByValues[0];
    this.isAscending = queryParams.get('isAscending') === 'true' ? true : false;
  }

  private getNomenclaturesData(): void {
    this.categories = toSignal(this.nomenclatureService.getJobCategories(), { initialValue: [] });
    this.engagements = toSignal(this.nomenclatureService.getJobEngagements(), { initialValue: [] });
  }
}
