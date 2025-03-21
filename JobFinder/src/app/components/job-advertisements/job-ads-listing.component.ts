import { Component, computed, OnInit, signal, Signal, WritableSignal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { JobAdvertisementsService, SubscriptionsService } from '../../services';
import { BasicModel, JobAd, JobAdsFilter } from '../../models';
import { NomenclatureService } from '../../core/services';
import { ToastrService } from 'ngx-toastr';
import { renderSalary } from '../../shared/functions';
import { JobsSubscriptionCriterias } from '../../shared/models';
import { FormBuilder, FormGroup } from '@angular/forms';

const ShowFiltersText: string = 'Show Filters';
const CloseFiltersText: string = 'Close Filters';
const InitialPage: number = 1;
const MinItemsOnPage: number = 10;

@Component({
  selector: 'jf-job-ads-listing',
  templateUrl: './job-ads-listing.component.html',
  standalone: false
})
export class JobAdsListing implements OnInit {

  form!: FormGroup;

  filterType: typeof SortByColumnEnum = SortByColumnEnum;
  sortType: typeof OrderEnum = OrderEnum;

  categories!: Signal<BasicModel[]>;
  engagements!: Signal<BasicModel[]>;
  locations!: Signal<BasicModel[]>;
  jobAds: JobAd[] = [];

  totalCount!: number;
  filtersAccordionTitle: string = ShowFiltersText;
  currentPage: number = InitialPage;

  readonly itemsCountArray: number[] = [MinItemsOnPage, 20, 25, 50];
  readonly allValue = { id: null, name: 'All' };
  readonly defaultSortBy: string = SortByColumnEnum[SortByColumnEnum.Published];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private jobAdsService: JobAdvertisementsService,
    private subscriptionsService: SubscriptionsService,
    private nomenclatureService: NomenclatureService,
    private toastr: ToastrService
  ) {
    this.getNomenclaturesData();
  }

  location: WritableSignal<number | null> = signal(null);
  category: WritableSignal<number | null> = signal(null);
  engagement: WritableSignal<number | null> = signal(null);

  showSubscribeButton: Signal<boolean> = computed(() => {
    return this.location() !== null || this.category() !== null;
  });

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      items: [this.itemsCountArray[0]],
      location: [null],
      category: [null],
      engagement: [null],
      sortBy: [this.defaultSortBy],
      isAscending: [false],
      searchText: [null]
    });

    this.getDataFromQueryParams();
    this.getJobAds(this.form);
  }

  onOpenExpansionPanel(): void {
    this.filtersAccordionTitle = CloseFiltersText;
  }

  onCloseExpansionPanel(): void {
    this.filtersAccordionTitle = ShowFiltersText;
  }

  changeSortBy(data: any): void {
    const sortBy = data.value === SortByColumnEnum.Published ? SortByColumnEnum[SortByColumnEnum.Published] : SortByColumnEnum[SortByColumnEnum.Salary];
    this.form.controls['sortBy'].setValue(sortBy);
  }

  onSearchClicked(form: FormGroup): void {
    this.currentPage = InitialPage;
    const filterModel: JobAdsFilter = { ...form.value, page: this.currentPage } as JobAdsFilter;
    this.updateQueryParams(filterModel);
    this.getJobAds(form);
  }

  subscribeForJobs(): void {
    const subscriptionCriterias: JobsSubscriptionCriterias = {
      jobCategoryId: this.category(),
      jobEngagementId: this.engagement(),
      locationId: this.location(),
      recurringTypeId: 1, // TODO: fix the model
      intership: false,
      specifiedSalary: false,
      searchTerm: this.form.controls['searchText'].value
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

  loadActivePageItems(activePageNumber: number): void {
    if (this.currentPage === activePageNumber) {
      return;
    }
    this.currentPage = activePageNumber;
    this.updateQueryParams({ page: this.currentPage });
    this.getJobAds(this.form);
  }

  private updateQueryParams(queryParamsObject: object): void {
    this.router.navigate([],
      {
        relativeTo: this.route,
        queryParams: queryParamsObject,
        queryParamsHandling: 'merge'
      });
  }

  private getJobAds(form: FormGroup): void {
    const filterModel: JobAdsFilter = { ...form.value, page: this.currentPage } as JobAdsFilter;

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
    const itemsCount: number = itemsValue === null ? MinItemsOnPage : parseInt(itemsValue);
    this.form.controls['items'].setValue(itemsCount);

    const searchText = queryParams.get('searchText') ?? null;
    this.form.controls['searchText'].setValue(searchText);

    const locationValue: string | null = queryParams.get('locationId');
    const location: number | null = locationValue !== null ? parseInt(locationValue) : null;
    this.form.controls['location'].setValue(location);

    const categoryValue: string | null = queryParams.get('categoryId');
    const category: number | null = categoryValue !== null ? parseInt(categoryValue) : null;
    this.form.controls['category'].setValue(category);

    const engagementValue: string | null = queryParams.get('engagementId');
    const engagement: number | null = engagementValue !== null ? parseInt(engagementValue) : null;
    this.form.controls['engagement'].setValue(engagement);

    const sortByValue: string = queryParams.get('sortBy') ?? this.defaultSortBy;
    this.form.controls['sortBy'].setValue(sortByValue);

    const isAscending = queryParams.get('isAscending') === 'true' ? true : false;
    this.form.controls['isAscending'].setValue(isAscending);
  }

  private getNomenclaturesData(): void {
    this.categories = toSignal(this.nomenclatureService.getJobCategories(), { initialValue: [] });
    this.engagements = toSignal(this.nomenclatureService.getJobEngagements(), { initialValue: [] });
    this.locations = toSignal(this.nomenclatureService.getCities(), { initialValue: [] });
  }
}

enum SortByColumnEnum {
  Published, Salary
}

enum OrderEnum {
  Asc, Desc
}