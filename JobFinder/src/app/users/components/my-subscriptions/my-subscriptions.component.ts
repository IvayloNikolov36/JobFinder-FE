import { Component, inject, Signal } from '@angular/core';
import { CompanySubscription, JobSubscription } from '../../models';
import { ToastrService } from 'ngx-toastr';
import { SubscriptionsService } from '../../services';

@Component({
  selector: 'jf-my-subscriptions',
  templateUrl: './my-subscriptions.component.html',
  standalone: false
})
export class MySubscriptionsComponent {

  readonly companyTabLabel = 'Company';
  readonly jobsTabLabel = 'Jobs';

  private subscriptionsService: SubscriptionsService = inject(SubscriptionsService);
  private toastr: ToastrService = inject(ToastrService);

  jobSubs: Signal<JobSubscription[]> = this.subscriptionsService.jobSubs;
  companySubs: Signal<CompanySubscription[]> = this.subscriptionsService.companySubs;

  onNewJobSubscriptionCreated(jobsSubscription: JobSubscription): void {
    this.subscriptionsService.addJobSubscription(jobsSubscription);
  }

  unsubscribe(companyId: number, companyName: string): void {
    this.subscriptionsService.removeCompanySubscription(companyId);
    this.subscriptionsService.unsubscribeFromCompany(companyId)
      .subscribe({
        next: () => {
          this.toastr.success(`Successfully unsubscribed from company ${companyName}.`);
        }
      });
  }

  unsubscribeAll(): void {
    this.subscriptionsService.clearCompanySubscriptions();
    this.subscriptionsService.unsubscribeFromAllCompanies()
      .subscribe({
        next: () => {
          this.toastr.success(`Successfully unsubscribed from all companies.`);
        }
      });
  }

  unsubscribeJobs(jobSubscriptionId: number): void {
    this.subscriptionsService.removeJobSubscriptions(jobSubscriptionId);
    this.subscriptionsService.unsubscribeForJobsWithCriterias(jobSubscriptionId)
      .subscribe({
        next: () => {
          const jobSubscription: JobSubscription = this.subscriptionsService.getJobSubscription(jobSubscriptionId);
          this.toastr.success(
            `Successfully unsubscribed from jobs with category ${jobSubscription.jobCategory}and location ${jobSubscription.location}.`);
        }
      });
  }

  unsubscribeForAllJobs(): void {
    this.subscriptionsService.clearJobSubscriptions();
    this.subscriptionsService.unsubscribeForAllJobsWithCriterias()
      .subscribe({
        next: () => {
          this.toastr.success("Successfully unsubscribed from all jobs with criterias.");
        }
      });
  }
}
