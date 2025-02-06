import { ToastrService } from 'ngx-toastr';
import { SubscriptionsService } from './../../services/subscriptions.service';
import { JobAdvertisementsService } from '../../services/job-advertisements.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { BasicModel } from '../../models/basic.model';
import { JobAd } from '../../models/job-ad';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { NomenclatureService } from '../../core/services';

@Component({
  selector: 'jf-job-advertisements',
  templateUrl: './job-advertisements.component.html',
  standalone: false
})
export class JobAdvertisementsComponent implements OnInit, OnDestroy {

  categories$!: Observable<BasicModel[]>;
  engagements$!: Observable<BasicModel[]>;
  jobAds!: JobAd[];
  totalCount!: number;

  subscriptions: Subscription[] = [];

  searchText!: string;
  currentPage!: number;
  itemsCount!: number;
  location!: string;
  category!: number;
  engagement!: number;
  sortBy!: string;
  isAscending!: boolean;
  showFiltersArea: boolean = false;
  showSubscribeButton: boolean = false;

  readonly locationsArray: string[] = ['All', 'Sofia', 'Plovdiv', 'Varna', 'Burgas', 'Ruse', 'Stara Zagora', 'Pleven', 'Veliko Tarnovo'];
  readonly itemsCountArray: number[] = [5, 10, 15, 20, 30, 50, 100];
  readonly initialPage = 1;
  readonly selectValueNone: number = 0;
  readonly showFiltersText: string = 'Show Filters';
  readonly hideFiltersText: string = 'Hide Filters';

  buttonText: string = this.showFiltersText;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private jobAdsService: JobAdvertisementsService,
    private subscriptionsService: SubscriptionsService,
    private nomenclatureService: NomenclatureService,
    private toastr: ToastrService
  ) {
    this.getDataFromQueryParams();
  }

  ngOnInit(): void {
    this.getJobAds();
    this.categories$ = this.nomenclatureService.getJobCategories();
    this.engagements$ = this.nomenclatureService.getJobEngagements();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  searchJob(): void {
    this.currentPage = this.initialPage;
    this.updateQueryParams({ page: this.currentPage, searchText: this.searchText });
    this.showSubscribeButton = this.showSubscribeForJobs();
    this.getJobAds();
  }

  subscribeForJobs(): void {
    this.subscriptionsService
      .subscribeForJobsWithCriterias(
        this.category === 0 ? null : this.category,
        this.location === this.locationsArray[0] ? null : this.location)
      .subscribe({
        next: () => this.toastr.success("Succsessfully subscribed for jobs with selected criterias."),
        error: (err) => this.toastr.error(err.title)
      });
  }

  changeItemsCount(selectedItemsCount: number): void {
    this.itemsCount = selectedItemsCount;
    this.currentPage = this.initialPage;
    this.updateQueryParams({ page: this.currentPage, items: selectedItemsCount });
    this.getJobAds();
  }

  changeFilterLocation(selectedLocation: string): void {
    this.currentPage = this.initialPage;
    this.location = selectedLocation;
    this.updateQueryParams({ page: this.currentPage, location: selectedLocation });
    this.getJobAds();
  }

  changeFilterCategory(selectedCategory: string): void {
    this.currentPage = this.initialPage;
    this.category = parseInt(selectedCategory);
    this.updateQueryParams({ page: this.currentPage, category: selectedCategory });
    this.getJobAds();
  }

  changeFilterEngagement(selectedEngagement: number): void {
    this.currentPage = this.initialPage;
    this.engagement = selectedEngagement;
    this.updateQueryParams({ page: this.currentPage, engagement: selectedEngagement });
    this.getJobAds();
  }

  changeSortBy(sortBy: string): void {
    this.currentPage = this.initialPage;
    this.sortBy = sortBy;
    this.updateQueryParams({ page: this.currentPage, sortBy: sortBy });
    this.getJobAds();
  }

  changeSortingOrder(orderValue: string): void {
    this.currentPage = this.initialPage;
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

  // TODO: create it private and use variable in the template
  showOrHideFilters(): void {
    this.showFiltersArea = !this.showFiltersArea;
    this.buttonText === this.showFiltersText
      ? this.buttonText = this.hideFiltersText
      : this.buttonText = this.showFiltersText;
  }

  // TODO: create signal to reevaluate the value of showSubscribeButton based on location and category
  private showSubscribeForJobs(): boolean {
    return this.location !== this.locationsArray[0] || this.category !== 0;
  }

  private updateQueryParams(queryParamsObject: object): void {
    this.router.navigate([],
      {
        relativeTo: this.route,
        queryParams: queryParamsObject,
        queryParamsHandling: 'merge'
      });
  }

  // TODO: create filterModel that contains searchText, engagement...
  private getJobAds(): void {
    const subscription: Subscription = this.jobAdsService.all(
      this.currentPage,
      this.itemsCount,
      this.searchText,
      this.location,
      this.category,
      this.engagement,
      this.sortBy,
      this.isAscending)
      .subscribe((data: any) => {
        this.totalCount = data.totalCount;
        this.jobAds = data.data;
      });

    this.subscriptions.push(subscription);
  }

  private getDataFromQueryParams = (): void => {
    const queryParams: ParamMap = this.route.snapshot.queryParamMap;

    const pageValue: string | null = queryParams.get('page');
    this.currentPage = pageValue === null ? this.initialPage : parseInt(pageValue);

    const itemsValue: string | null = queryParams.get('items');
    this.itemsCount = itemsValue === null ? this.itemsCountArray[0] : parseInt(itemsValue);

    this.searchText = queryParams.get('searchText') ?? '';
    this.location = queryParams.get('location') ?? this.locationsArray[0];

    const categoryValue: string | null = queryParams.get('category');
    this.category = categoryValue === null ? this.selectValueNone : parseInt(categoryValue);

    const engagementValue: string | null = queryParams.get('engagement');
    this.engagement = engagementValue === null ? this.selectValueNone : parseInt(engagementValue);

    // TODO: create array with values for sort
    this.sortBy = queryParams.get('sortBy') ?? 'Published';
    this.isAscending = queryParams.get('isAscending') === 'true' ? true : false;
  }
}
