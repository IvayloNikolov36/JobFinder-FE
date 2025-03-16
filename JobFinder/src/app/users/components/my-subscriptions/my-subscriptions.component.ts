import { Component, OnInit } from '@angular/core';
import { CompanySubscription, JobSubscription } from '../../models';
import { ToastrService } from 'ngx-toastr';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { SubscriptionsService } from '../../services';
import { JobsSubscriptionCriterias } from '../../../shared/models';

@Component({
  selector: 'jf-my-subscriptions',
  templateUrl: './my-subscriptions.component.html',
  standalone: false
})
export class MySubscriptionsComponent implements OnInit {

  companysubscriptions!: CompanySubscription[];
  jobSubscriptions!: JobSubscription[];
  areJobSubscriptionsLoaded: boolean = false;

  readonly companyTabLabel = 'Company';
  readonly jobsTabLabel = 'Jobs';

  constructor(
    private subscriptionsService: SubscriptionsService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getMyCompanySubscriptions();
  }

  onNewJobSubscriptionCreated(jobsSubscription: JobSubscription): void {
    this.jobSubscriptions.push(jobsSubscription);
  }

  unsubscribe(companyId: number, companyName: string): void {
    this.subscriptionsService.unsubscribeFromCompany(companyId)
      .subscribe({
        next: () => {
          this.toastr.success(`Successfully unsubscribed from company ${companyName}.`);
          this.companysubscriptions = this.companysubscriptions.filter(cs => cs.companyId !== companyId);
        }
      });
  }

  unsubscribeAll(): void {
    this.subscriptionsService.unsubscribeFromAllCompanies()
      .subscribe({
        next: () => this.companysubscriptions = []
      });
  }

  unsubscribeJobs(jobSubscriptionId: number): void {
    this.subscriptionsService.unsubscribeForJobsWithCriterias(jobSubscriptionId)
      .subscribe({
        next: () => {
          const jobSubscription: JobSubscription = this.jobSubscriptions.filter(js => js.id === jobSubscriptionId)[0];
          this.toastr.success(`Successfully unsubscribed from jobs with category ${jobSubscription.jobCategory} and location ${jobSubscription.location}.`);
          this.jobSubscriptions = this.jobSubscriptions.filter(js => js.id !== jobSubscriptionId);
        }
      });
  }

  unsubscribeForAllJobs(): void {
    this.subscriptionsService.unsubscribeForAllJobsWithCriterias()
      .subscribe({
        next: () => {
          this.toastr.success("Successfully unsubscribed from all jobs with criterias.");
          this.jobSubscriptions = [];
        }
      });
  }

  onTabChange(tabChangeEvent: MatTabChangeEvent): void {
    const selectedTabLabel: string = tabChangeEvent.tab.textLabel;

    if (selectedTabLabel === this.jobsTabLabel && !this.areJobSubscriptionsLoaded) {
      this.getMyJobSubscriptions();
    }
  }

  private getMyJobSubscriptions(): void {
    this.subscriptionsService.getAllMyJobSubscriptions()
      .subscribe((data: JobSubscription[]) => {
        this.jobSubscriptions = data;
        this.areJobSubscriptionsLoaded = true;
      });
  }

  private getMyCompanySubscriptions(): void {
    this.subscriptionsService.getMyCompanySubscriptions()
      .subscribe((data: CompanySubscription[]) => {
        this.companysubscriptions = data;
      });
  }
}
