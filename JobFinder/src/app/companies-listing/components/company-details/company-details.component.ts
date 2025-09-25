import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CompanyDetailsUser, CompanyJobAdsListing, JobAd } from '../../../users/models';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { CompaniesService, CompanySubscriptionsService } from '../../services';
import { AuthService } from '../../../core/services';
import { finalize } from 'rxjs';

@Component({
  selector: 'jf-company-details',
  templateUrl: './company-details.component.html',
  standalone: false
})
export class CompanyDetailsComponent implements OnInit {

  @Input() id!: number;
  companyDetails: CompanyDetailsUser | null = null;
  companyJobAds!: JobAd[];
  canSubscribe: boolean = false;
  loading: boolean = false;

  constructor(
    private router: Router,
    authService: AuthService,
    private subscriptionsService: CompanySubscriptionsService,
    private companiesService: CompaniesService,
    private toastr: ToastrService) {
    this.canSubscribe = authService.isJobSeeker();
  }

  ngOnInit(): void {
    if (this.id) {
      this.loadDetails(this.id);
    }
  }

  onOpenExpansionPanel = (): void => {
    if (!this.companyJobAds) {
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
    this.loading = true;

    this.companiesService.getActiveAds(id)
      .pipe(
        finalize(() => this.loading = false)
      )
      .subscribe({
        next: (data: CompanyJobAdsListing) => {
          this.companyJobAds = data.ads.map(ad => {
            return {
              company: data.companyDetails,
              ...ad
            } as JobAd
          });
        },
        error: (err: HttpErrorResponse) => this.toastr.error(err.error.errors.join(' '))
      });
  }
}
