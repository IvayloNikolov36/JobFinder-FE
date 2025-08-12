import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CompanyDetailsUser } from '../../models';
import { CompaniesService, SubscriptionsService } from '../../services';

@Component({
  selector: 'jf-company-details',
  templateUrl: './company-details.component.html',
  standalone: false
})
export class CompanyDetailsComponent implements OnInit {

  @Input() id!: number;
  companyDetails!: CompanyDetailsUser | null;

  constructor(
    private subscriptionsService: SubscriptionsService,
    private companiesService: CompaniesService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    if (this.id) {
      this.loadDetails(this.id);
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

  private loadDetails = (id: number): void => {
    this.companiesService.getDetails(this.id)
      .subscribe((data: CompanyDetailsUser) => this.companyDetails = data);
  }
}
