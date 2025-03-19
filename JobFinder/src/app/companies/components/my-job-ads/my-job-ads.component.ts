import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AdApplicationInfo, CompanyAd } from '../../models';
import { CompanyJobAdApplicationsService, CompanyJobAdsService } from '../../services';
import { rxResource } from '@angular/core/rxjs-interop';
import { renderSalary } from '../../../shared/functions';

@Component({
  selector: 'jf-my-job-ads',
  templateUrl: './my-job-ads.component.html',
  standalone: false
})
export class MyJobAdsComponent implements OnInit {

  jobAds$!: Observable<CompanyAd[]>;
  currentJobAdApplicationsData$!: Observable<AdApplicationInfo[]>;

  filterType: typeof AdsFilterEnum = AdsFilterEnum;
  selectedFilterType: AdsFilterEnum = AdsFilterEnum.Active;

  constructor(
    private jobAdsService: CompanyJobAdsService,
    private jobAdApplicationsService: CompanyJobAdApplicationsService) { }

  readonly applicationsDataResource = rxResource({
    request: () => ({
      currentJobAdId: this.jobAdId
    }),
    loader: ({ request }) => {
      return this.jobAdApplicationsService
        .getJobAllApplicationsData(request.currentJobAdId());
    }
  });

  private readonly jobAdId: WritableSignal<number | undefined> = signal<number | undefined>(undefined);

  ngOnInit(): void {
    this.loadJobAds();
  }

  changeFilter = (data: any) => {
    this.selectedFilterType = data.value;
    this.loadJobAds();
  }

  viewAdDetails(id: number): void {

  }

  openExpansionPanel(jobAdId: number): void {
    this.jobAdId.set(jobAdId);
    this.reloadApplicationsData();
  }

  private reloadApplicationsData = (): void => {
    this.applicationsDataResource.reload();
  }

  private loadJobAds = (): void => {

    let observableData: Observable<CompanyAd[]>;

    switch (this.selectedFilterType) {
      case AdsFilterEnum.All:
        observableData = this.jobAdsService.getAllCompanyAds();
        break;
      case AdsFilterEnum.Active:
        observableData = this.jobAdsService.getCompanyAds(true);
        break;
      case AdsFilterEnum.Inactive:
        observableData = this.jobAdsService.getCompanyAds(false);
        break;
    }

    // TODO: create momoization

    this.jobAds$ = observableData
      .pipe(
        map((ads: CompanyAd[]) => {
          ads.map((a: CompanyAd) => a.salary = renderSalary(a.minSalary, a.maxSalary, a.currency));
          return ads;
        })
      );
  }
}

enum AdsFilterEnum {
  Active,
  Inactive,
  All
}
