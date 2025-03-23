import { Component, computed, linkedSignal, signal, Signal, WritableSignal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { JobAdvertisementsService, SubscriptionsService } from '../../services';
import { AdsFiltering, AdsFilterProps, BasicModel, JobAd } from '../../models';
import { NomenclatureService } from '../../core/services';
import { ToastrService } from 'ngx-toastr';
import { JobsSubscriptionCriterias } from '../../shared/models';
import { FormControl, Validators } from '@angular/forms';

const ShowFiltersText: string = 'Show Filters';
const CloseFiltersText: string = 'Close Filters';

@Component({
  selector: 'jf-job-ads-listing',
  templateUrl: './job-ads-listing.component.html',
  standalone: false
})
export class JobAdsListing {

  categories: Signal<BasicModel[]> = signal([]);
  engagements: Signal<BasicModel[]> = signal([]);
  locations: Signal<BasicModel[]> = signal([]);
  recurringTypes: Signal<BasicModel[]> = signal([]);

  recurringTypeId = new FormControl<number | null>(null, Validators.required);

  filtersAccordionTitle: string = ShowFiltersText;

  currentPage!: Signal<number>;
  jobAds!: Signal<JobAd[] | undefined>;
  totalCount!: Signal<number>;
  itemsOnPage!: Signal<number>;
  showReccuringType: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private adsService: JobAdvertisementsService,
    private subscriptionsService: SubscriptionsService,
    private nomenclatureService: NomenclatureService,
    private toastr: ToastrService
  ) {
    this.getDataFromQueryParams();
    this.getNomenclaturesData();

    this.currentPage = this.adsService.currentPage;
    this.jobAds = this.adsService.jobAds;
    this.totalCount = this.adsService.totalCount;
    this.itemsOnPage = this.adsService.itemsOnPage;
    const filterChange$ = toObservable(this.adsService.filterModel);

    filterChange$.subscribe((data: AdsFilterProps) => {
      this.updateQueryParams({ page: this.currentPage(), ...data });
    });
  }

  filter: Signal<AdsFilterProps> = computed(() => this.adsService.filterModel());

  showSubscribeButton: WritableSignal<boolean> = linkedSignal(() => {
    const filter: AdsFilterProps = this.filter();

    const showButton: boolean = filter.locationId !== null
      || filter.categoryId !== null
      || filter.engagementId !== null
      || (filter.searchText !== null && filter.searchText.trim().length > 0);

    return showButton;
  });

  subscribeForJobs(): void {
    if (!this.recurringTypeId.valid) {
      this.showReccuringType = true;
      return;
    }

    const filter: AdsFilterProps = this.adsService.filterModel();

    const subscriptionCriterias: JobsSubscriptionCriterias = {
      recurringTypeId: this.recurringTypeId.value!,
      jobCategoryId: filter.categoryId,
      jobEngagementId: filter.engagementId,
      locationId: filter.locationId,
      intership: false,
      specifiedSalary: false,
      searchTerm: filter.searchText
    };

    this.subscriptionsService
      .subscribeForJobsWithCriterias(subscriptionCriterias)
      .subscribe({
        next: () => this.toastr.success("Succsessfully subscribed for jobs with selected criterias."),
        error: (err: any) => {
          this.toastr.error(err.error.errors[0]);
        },
        complete: () => {
          this.recurringTypeId.setValue(null);
          this.showSubscribeButton.set(false);
          this.showReccuringType = false;
        }
      });
  }

  onOpenExpansionPanel(): void {
    this.filtersAccordionTitle = CloseFiltersText;
  }

  onCloseExpansionPanel(): void {
    this.filtersAccordionTitle = ShowFiltersText;
  }

  onPageChange(selectedPage: number): void {
    if (this.adsService.currentPage() === selectedPage) {
      return;
    }
    this.adsService.currentPage.set(selectedPage);
    this.updateQueryParams({ page: selectedPage });
  }

  private getDataFromQueryParams = (): void => {
    const queryParams: ParamMap = this.route.snapshot.queryParamMap;

    const pageValue: string | null = queryParams.get('page');
    const page: number = pageValue === null ? this.adsService.initialPage : parseInt(pageValue);
    this.adsService.currentPage.set(page);

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

    const model = new AdsFilterProps(itemsCount, searchText, location, category, engagement, sortBy, isAscending);
    this.adsService.filterModel.set(model);
    this.updateQueryParams(new AdsFiltering(page, model))
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
    this.recurringTypes = toSignal(this.nomenclatureService.getRecurringTypes(), { initialValue: [] });
  }
}
