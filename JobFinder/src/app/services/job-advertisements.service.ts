import { HttpClient } from '@angular/common/http';
import { computed, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { map, Observable } from 'rxjs';
import { JobAd } from '../models/job-ad';
import { JobDetails } from '../models/job-details';
import { getAd, getAds } from '../core/controllers';
import { AdsFiltering, AdsFilterProps } from '../models';
import { SortByColumnEnum } from '../enums';
import { rxResource } from '@angular/core/rxjs-interop';
import { renderSalary } from '../shared/functions';

@Injectable({
  providedIn: 'root'
})
export class JobAdvertisementsService {

  readonly minItemsOnPage: number = 10;
  readonly initialPage: number = 1;
  readonly defaultSortBy: string = SortByColumnEnum[SortByColumnEnum.Published];

  private readonly itemsCountArray: number[] = [this.minItemsOnPage, 20, 25, 50];

  private readonly initialFilterModel: AdsFilterProps = {
    items: this.minItemsOnPage,
    searchText: null,
    locationId: null,
    categoryId: null,
    engagementId: null,
    sortBy: this.defaultSortBy,
    isAscending: false
  } as AdsFilterProps;

  constructor(private http: HttpClient) {

  }

  readonly filterModel: WritableSignal<AdsFilterProps> = signal<AdsFilterProps>(this.initialFilterModel);
  readonly currentPage: WritableSignal<number> = signal<number>(this.initialPage);
  readonly jobAds: Signal<JobAd[] | undefined> = computed(() => this.jobAdsDataResource.value()?.ads);
  readonly totalCount: Signal<number> = computed(() => this.jobAdsDataResource.value()?.totalCount);
  readonly itemsOnPage: Signal<number> = computed(() => this.filterModel().items);

  getAllActive(filter: AdsFiltering): Observable<JobAd[]> {
    return this.http.post<JobAd[]>(getAds(), filter);
  }

  details(id: number): Observable<JobDetails> {
    return this.http.get<JobDetails>(getAd(id));
  }

  getItemsCountArray = (): number[] => this.itemsCountArray;

  private readonly jobAdsDataResource = rxResource({
    request: () => ({
      filter: this.filterModel(),
      page: this.currentPage()
    }),
    loader: ({ request }) => {
      return this.getAllActive(new AdsFiltering(request.page, request.filter))
        .pipe(
          map((data: any) => {      
            const totalCount = data.totalCount;
            let ads = data.data as JobAd[];
            ads = ads.map((a: JobAd) => {
              a.salary = renderSalary(a.minSalary, a.maxSalary, a.currency);
              return a;
            });
            return { totalCount, ads };
          })
        );
    }
  });
}
