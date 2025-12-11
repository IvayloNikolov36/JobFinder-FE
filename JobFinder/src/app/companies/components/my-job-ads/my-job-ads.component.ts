import { Component, computed, signal, Signal, WritableSignal } from '@angular/core';
import { map } from 'rxjs';
import { CompanyAd } from '../../models';
import { CompanyJobAdsService } from '../../services';
import { renderSalary } from '../../../shared/functions';
import { AdsFilterEnum, LifycycleStatusEnum } from '../../enums';
import { Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'jf-my-job-ads',
  templateUrl: './my-job-ads.component.html',
  standalone: false
})
export class MyJobAdsComponent {

  filterType: typeof AdsFilterEnum = AdsFilterEnum;
  selectedFilterType: WritableSignal<AdsFilterEnum> = signal(AdsFilterEnum.All);
  allAds: Signal<CompanyAd[]>;
  ads: Signal<CompanyAd[]> = computed(() => {
    switch (this.selectedFilterType()) {
      case AdsFilterEnum.All:
        return this.allAds();
      case AdsFilterEnum.Active:
        return this.allAds()
          .filter(ja => ja.lifecycleStatusId === LifycycleStatusEnum.Active);
      case AdsFilterEnum.Draft:
        return this.allAds()
          .filter(ja => ja.lifecycleStatusId === LifycycleStatusEnum.Draft);
      case AdsFilterEnum.Retired:
        return this.allAds()
          .filter(ja => ja.lifecycleStatusId === LifycycleStatusEnum.Retired);
    }
  });

  constructor(
    private jobAdsService: CompanyJobAdsService,
    private router: Router) {

    this.allAds = toSignal(this.jobAdsService.getAllCompanyAds()
      .pipe(
        map((ads: CompanyAd[]) => {
          ads.map((a: CompanyAd) => a.salary = renderSalary(a.minSalary, a.maxSalary, a.currency));
          return ads;
        })
      ), { initialValue: [] });
  }

  changeFilter = (data: any) => {
    this.selectedFilterType.set(data.value);
  }

  viewAdDetails(id: number): void {
    this.router.navigate(['ads', id]);
  }
}
