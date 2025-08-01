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

  jobAds!: CompanyAd[];
  allJobAds: CompanyAd[] | null = null;
  filterType: typeof AdsFilterEnum = AdsFilterEnum;
  selectedFilterType: AdsFilterEnum = AdsFilterEnum.All;

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

  private getAllCompanyAds = (): Observable<CompanyAd[]> => {
    return this.jobAdsService.getAllCompanyAds()
      .pipe(
        map((ads: CompanyAd[]) => {
          ads.map((a: CompanyAd) => a.salary = renderSalary(a.minSalary, a.maxSalary, a.currency));
          return ads;
        })
      );
  }

  private loadJobAds = (): void => {
    if (this.allJobAds === null) {
      this.getAllCompanyAds().subscribe((ads: CompanyAd[]) => {
        this.allJobAds = ads;
        this.setJobAdsData(ads);
      });
    } else {
      this.setJobAdsData(this.allJobAds);
    }
  }

  private setJobAdsData = (allAds: CompanyAd[]): void => {
    switch (this.selectedFilterType) {
      case AdsFilterEnum.All:
        this.jobAds = allAds;
        break;
      case AdsFilterEnum.Active:
        this.jobAds = allAds.filter(ja => ja.isActive);
        break;
      case AdsFilterEnum.Inactive:
        this.jobAds = allAds.filter(ja => !ja.isActive);
        break;
    }
  }
}

enum AdsFilterEnum {
  Active,
  Inactive,
  All
}
