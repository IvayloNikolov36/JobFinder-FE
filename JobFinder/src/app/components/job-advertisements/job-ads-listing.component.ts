import { Component, computed, OnInit, signal, Signal, WritableSignal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { JobAdvertisementsService, SubscriptionsService } from '../../services';
import { BasicModel, JobAd, JobAdsFilter } from '../../models';
import { NomenclatureService } from '../../core/services';
import { ToastrService } from 'ngx-toastr';
import { renderSalary } from '../../shared/functions';
import { JobSubscriptionCriterias } from '../../users/models';

const ShowFiltersText: string = 'Show Filters';
const HideFiltersText: string = 'Hide Filters';
const SortByValues: string[] = ['Published', 'Salary'];
const InitialPage: number = 1;
const MinItemsOnPage: number = 10;

@Component({
  selector: 'jf-job-ads-listing',
  templateUrl: './job-ads-listing.component.html',
  standalone: false
})
export class JobAdsListing implements OnInit {

  categories!: Signal<BasicModel[]>;
  engagements!: Signal<BasicModel[]>;
  locations!: Signal<BasicModel[]>;
  jobAds: JobAd[] = [];

  totalCount!: number;
  searchText: string = '';
  showFiltersArea: boolean = false;
  filterButtonLabel: string = ShowFiltersText;
  currentPage: number = InitialPage;
  itemsCount: number = MinItemsOnPage;
  sortBy: string = SortByValues[0];
  isAscending: boolean = true;

  readonly itemsCountArray: number[] = [MinItemsOnPage, 20, 25, 50];
  readonly allValue = { id: null, name: 'All' };

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

  location: WritableSignal<number | null> = signal(null);
  category: WritableSignal<number | null> = signal(null);
  engagement: WritableSignal<number | null> = signal(null);

  showSubscribeButton: Signal<boolean> = computed(() => {
    return this.location() !== null || this.category() !== null;
  });

  ngOnInit(): void {
    this.getJobAds();
  }

  searchForJobAds(): void {
    this.currentPage = InitialPage;
    this.updateQueryParams({ page: this.currentPage, searchText: this.searchText });
    this.getJobAds();
  }

  subscribeForJobs(): void {
    const subscriptionCriterias: JobSubscriptionCriterias = {
      jobCategoryId: this.category(),
      jobEngagementId: this.engagement(),
      locationId: this.location(),
      reccuringTypeId: 1, // TODO: fix the model
      intership: false,
      specifiedSalary: false,
      searchTerm: this.searchText
    };

    this.subscriptionsService
      .subscribeForJobsWithCriterias(subscriptionCriterias)
      .subscribe({
        next: () => this.toastr.success("Succsessfully subscribed for jobs with selected criterias."),
        error: (err: any) => {
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

  changeFilterLocation(selectedLocation: number | null): void {
    this.currentPage = InitialPage;
    this.location.set(selectedLocation);
    this.updateQueryParams({ page: this.currentPage, locationId: selectedLocation });
    this.getJobAds();
  }

  changeFilterCategory(selectedCategory: number | null): void {
    this.currentPage = InitialPage;
    this.category.set(selectedCategory);
    this.updateQueryParams({ page: this.currentPage, categoryId: selectedCategory });
    this.getJobAds();
  }

  changeFilterEngagement(selectedEngagement: number | null): void {
    this.currentPage = InitialPage;
    this.engagement.set(selectedEngagement);
    this.updateQueryParams({ page: this.currentPage, engagementId: selectedEngagement });
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
      this.engagement(),
      this.sortBy,
      this.isAscending);

    this.jobAdsService.getAll(filterModel)
      .subscribe((data: any) => {
        this.totalCount = data.totalCount;
        const ads = data.data as JobAd[];
        this.jobAds = ads.map((a: JobAd) => {
          a.salary = renderSalary(a.minSalary, a.maxSalary, a.currency);
          return a;
        });
      });
  }

  private getDataFromQueryParams = (): void => {
    const queryParams: ParamMap = this.route.snapshot.queryParamMap;

    const pageValue: string | null = queryParams.get('page');
    this.currentPage = pageValue === null ? InitialPage : parseInt(pageValue);

    const itemsValue: string | null = queryParams.get('items');
    this.itemsCount = itemsValue === null ? MinItemsOnPage : parseInt(itemsValue);

    this.searchText = queryParams.get('searchText') ?? '';

    const locationValue: string | null = queryParams.get('locationId');
    this.location.set(locationValue !== null ? parseInt(locationValue) : null);

    const categoryValue: string | null = queryParams.get('categoryId');
    this.category.set(categoryValue !== null ? parseInt(categoryValue) : null);

    const engagementValue: string | null = queryParams.get('engagementId');
    this.engagement.set(engagementValue !== null ? parseInt(engagementValue) : null);

    this.sortBy = queryParams.get('sortBy') ?? SortByValues[0];
    this.isAscending = queryParams.get('isAscending') === 'true' ? true : false;
  }

  private getNomenclaturesData(): void {
    this.categories = toSignal(this.nomenclatureService.getJobCategories(), { initialValue: [] });
    this.engagements = toSignal(this.nomenclatureService.getJobEngagements(), { initialValue: [] });
    this.locations = toSignal(this.nomenclatureService.getCities(), { initialValue: [] });
  }
}
