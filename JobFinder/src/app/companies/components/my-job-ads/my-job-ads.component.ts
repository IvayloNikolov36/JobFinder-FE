import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CompanyAd } from '../../models';
import { CompanyJobAdsService } from '../../services';
import { renderSalary } from '../../../shared/functions';

@Component({
  selector: 'jf-my-job-ads',
  templateUrl: './my-job-ads.component.html',
  standalone: false
})
export class MyJobAdsComponent implements OnInit {

  jobAds$!: Observable<CompanyAd[]>;
  filterType: typeof AdsFilterEnum = AdsFilterEnum;
  selectedFilterType: AdsFilterEnum = AdsFilterEnum.Active;

  constructor(private jobAdsService: CompanyJobAdsService) { }

  ngOnInit(): void {
    this.loadJobAds();
  }

  changeFilter = (data: any) => {
    this.selectedFilterType = data.value;
    this.loadJobAds();
  }

  viewAdDetails(id: number): void {

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
