import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { AdApplicationInfo, CompanyAd } from '../../models';
import { CompanyJobAdApplicationsService, CompanyJobAdsService } from '../services';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'jf-my-job-ads',
  standalone: false,
  templateUrl: './my-job-ads.component.html',
  styleUrl: './my-job-ads.component.css'
})
export class MyJobAdsComponent implements OnInit {

  jobAds$!: Observable<CompanyAd[]>;
  currentJobAdApplicationsData$!: Observable<AdApplicationInfo[]>;

  constructor(
    private jobAdsService: CompanyJobAdsService,
    private jobAdApplicationsService: CompanyJobAdApplicationsService) {

  }

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
    this.jobAds$ = this.jobAdsService.getCompanyAds();
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
}
