import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubscriptionsService } from '../../../services';
import { ToastrService } from 'ngx-toastr';
import { CompanyDetailsUser } from '../../models';
import { CompaniesService } from '../../services';

@Component({
  selector: 'jf-company-details',
  templateUrl: './company-details.component.html',
  standalone: false
})
export class CompanyDetailsComponent implements OnInit {

  companyId!: number;
  companyDetails!: CompanyDetailsUser;

  constructor(
    private route: ActivatedRoute,
    private subscriptionsService: SubscriptionsService,
    private companiesService: CompaniesService,
    private toastr: ToastrService) {

    this.companyId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.companiesService.getDetails(this.companyId)
      .subscribe((data: CompanyDetailsUser) => this.companyDetails = data);
  }

  subscribeForCompany = (): void => {
    this.subscriptionsService.subscribeForCompanyJobs(this.companyId)
      .subscribe({
        next: () => this.toastr.success('You are subscribed for job advertisements from this company.')
      });
  }

  unsubscribeFromCompany = (): void => {
    this.subscriptionsService.unsubscribeFromCompany(this.companyId)
      .subscribe();
  }
}
