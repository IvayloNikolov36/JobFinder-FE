import { Component, computed, OnInit, signal, Signal, WritableSignal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { JobAdvertisementsService, SubscriptionsService } from '../../services';
import { AdsFilterProps, BasicModel, JobAd } from '../../models';
import { NomenclatureService } from '../../core/services';
import { ToastrService } from 'ngx-toastr';
import { JobsSubscriptionCriterias } from '../../shared/models';

const ShowFiltersText: string = 'Show Filters';
const CloseFiltersText: string = 'Close Filters';

@Component({
  selector: 'jf-job-ads-listing',
  templateUrl: './job-ads-listing.component.html',
  standalone: false
})
export class JobAdsListing implements OnInit {

  categories: Signal<BasicModel[]> = signal([]);
  engagements: Signal<BasicModel[]> = signal([]);
  locations: Signal<BasicModel[]> = signal([]);

  filtersAccordionTitle: string = ShowFiltersText;

  currentPage!: Signal<number>;
  jobAds!: Signal<JobAd[] | undefined>;
  totalCount!: Signal<number>;
  itemsOnPage!: Signal<number>;

  // For subscribtions
  location: WritableSignal<number | null> = signal(null);
  category: WritableSignal<number | null> = signal(null);
  engagement: WritableSignal<number | null> = signal(null);
  showSubscribeButton: Signal<boolean> = computed(() => {
    return this.location() !== null || this.category() !== null;
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private adsService: JobAdvertisementsService,
    private subscriptionsService: SubscriptionsService,
    private nomenclatureService: NomenclatureService,
    private toastr: ToastrService
  ) {

    this.getNomenclaturesData();

    this.currentPage = this.adsService.currentPage;
    this.jobAds = this.adsService.jobAds;
    this.totalCount = this.adsService.totalCount;
    this.itemsOnPage = this.adsService.itemsOnPage;
  }

  ngOnInit(): void {
    this.getDataFromQueryParams();
  }

  onOpenExpansionPanel(): void {
    this.filtersAccordionTitle = CloseFiltersText;
  }

  onCloseExpansionPanel(): void {
    this.filtersAccordionTitle = ShowFiltersText;
  }

  subscribeForJobs(): void {
    const subscriptionCriterias: JobsSubscriptionCriterias = {
      jobCategoryId: this.category(),
      jobEngagementId: this.engagement(),
      locationId: this.location(),
      recurringTypeId: 1, // TODO: fix the model
      intership: false,
      specifiedSalary: false,
      searchTerm: this.adsService.filterModel().searchText
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

  onPageChange(selectedPage: number): void {
    if (this.adsService.currentPage() === selectedPage) {
      return;
    }
    this.adsService.currentPage.set(selectedPage);
    this.updateQueryParams({ page: this.adsService.currentPage() });
  }

  private getDataFromQueryParams = (): void => {
    const queryParams: ParamMap = this.route.snapshot.queryParamMap;

    const pageValue: string | null = queryParams.get('page');
    this.adsService.currentPage.set(pageValue === null ? this.adsService.initialPage : parseInt(pageValue));

    const itemsValue: string | null = queryParams.get('items');
    const itemsCount: number = itemsValue === null ? this.adsService.minItemsOnPage : parseInt(itemsValue);
    
    const searchText = queryParams.get('searchText') ?? null;
    
    const locationValue: string | null = queryParams.get('locationId');
    const location: number | null = locationValue !== null ? parseInt(locationValue) : null;
    
    const categoryValue: string | null = queryParams.get('categoryId');
    const category: number | null = categoryValue !== null ? parseInt(categoryValue) : null;
    
    const engagementValue: string | null = queryParams.get('engagementId');
    const engagement: number | null = engagementValue !== null ? parseInt(engagementValue) : null;
    
    const sortBy: string = queryParams.get('sortBy') ?? this.adsService.defaultSortBy;

    const isAscending = queryParams.get('isAscending') === 'true' ? true : false;
    
    this.adsService.filterModel.set(new AdsFilterProps(itemsCount, searchText, location, category, engagement, sortBy, isAscending ));
  }

  private updateQueryParams(queryParamsObject: object): void {
    this.router.navigate([],
      {
        relativeTo: this.route,
        queryParams: queryParamsObject,
        queryParamsHandling: 'merge'
      });
  }

  private getNomenclaturesData(): void {
    this.categories = toSignal(this.nomenclatureService.getJobCategories(), { initialValue: [] });
    this.engagements = toSignal(this.nomenclatureService.getJobEngagements(), { initialValue: [] });
    this.locations = toSignal(this.nomenclatureService.getCities(), { initialValue: [] });
  }
}
