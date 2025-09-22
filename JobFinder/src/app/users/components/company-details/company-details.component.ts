import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CompanyDetailsUser, CompanyJobAdsListing } from '../../models';
import { CompaniesService, SubscriptionsService } from '../../services';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { JobAd } from '../../../core/models';

@Component({
  selector: 'jf-company-details',
  templateUrl: './company-details.component.html',
  standalone: false
})
export class CompanyDetailsComponent implements OnInit {

  @Input() id!: number;
  companyDetails: CompanyDetailsUser | null = null;
  companyJobAds: JobAd[] = [];

  constructor(
    private router: Router,
    private subscriptionsService: SubscriptionsService,
    private companiesService: CompaniesService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    if (this.id) {
      this.loadDetails(this.id);
      this.loadCompanyActiveAds(this.id);
    }
  }

  subscribeForCompany = (): void => {
    this.subscriptionsService.subscribeForCompanyJobs(this.id)
      .subscribe({
        next: () => this.toastr.success('You are subscribed for job advertisements from this company.')
      });
  }

  unsubscribeFromCompany = (): void => {
    this.subscriptionsService.unsubscribeFromCompany(this.id)
      .subscribe();
  }

  viewAdDetails = (adId: number): void => {
    this.router.navigate(['job-ad', adId]);
  }

  private loadDetails = (id: number): void => {
    this.companiesService.getDetails(id)
      .subscribe({
        next: (data: CompanyDetailsUser) => {
          this.companyDetails = data;
        },
        error: (err: HttpErrorResponse) => this.toastr.error(err.error.errors.join(' '))
      });
  }

  private loadCompanyActiveAds = (id: number): void => {
    this.companiesService.getActiveAds(id)
      .subscribe({
        next: (data: CompanyJobAdsListing) => {
          this.companyJobAds = data.ads.map(ad => {
            return {
              company: data.companyDetails,
              ...ad
            } as JobAd
          });
          console.log(data);
          console.log(this.companyJobAds);
        }
      });
  }
}
