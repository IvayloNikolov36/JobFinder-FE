import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AdApplicationInfo, CompanyAd } from '../../models';
import { CompanyJobAdApplicationsService, CompanyJobAdsService } from '../services';

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
    private jobAdApplicationsService: CompanyJobAdApplicationsService) { }

  ngOnInit(): void {
    this.jobAds$ = this.jobAdsService.getCompanyAds();
  }

  viewAdDetails(id: number): void {

  }

  openExpansionPanel(jobAdId: number): void {
    this.loadAdApplicationsInfo(jobAdId);
  }

  private loadAdApplicationsInfo(jobAdId: number): void {
    this.currentJobAdApplicationsData$ = this.jobAdApplicationsService.getJobAllApplicationsData(jobAdId);
  }
}
