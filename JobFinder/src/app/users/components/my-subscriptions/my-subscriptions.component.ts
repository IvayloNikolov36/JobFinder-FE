import { Component, computed, inject, signal } from '@angular/core';
import { JobSubscription } from '../../models';
import { ToastrService } from 'ngx-toastr';
import { SubscriptionsService } from '../../services';
import { toSignal } from '@angular/core/rxjs-interop';

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

  // TODO: move to service

  private companysubscriptionsRaw = toSignal(this.subscriptionsService.getMyCompanySubscriptions(), { initialValue: [] });
  companySubscriptions = computed(() => signal(this.companysubscriptionsRaw()));
  companySubs = computed(() => this.companySubscriptions()());

  private jobSubscriptionsRaw = toSignal(this.subscriptionsService.getAllMyJobSubscriptions(), { initialValue: [] });
  private jobSubscriptions = computed(() => signal(this.jobSubscriptionsRaw()));
  jobSubs = computed(() => this.jobSubscriptions()());

  removeCompanySubscription = (companyId: number): void => {
    this.companySubscriptions().update((current) => [...current.filter(cs => cs.companyId !== companyId)]);
  }

  clearCompanySubscriptions = (): void => {
    this.companySubscriptions().set([]);
  }

  addJobSubscription = (jobsSubscription: JobSubscription): void => {
    this.jobSubscriptions().update((current) => [...current, jobsSubscription]);
  }

  removeJobSubscriptions = (jobSubscriptionId: number): void => {
    this.jobSubscriptions().update((current) => [...current.filter(js => js.id !== jobSubscriptionId)]);
  }

  clearJobSubscriptions = (): void => {
    this.jobSubscriptions().set([]);
  }

  //---

  onNewJobSubscriptionCreated(jobsSubscription: JobSubscription): void {
    this.addJobSubscription(jobsSubscription);
  }

  unsubscribe(companyId: number, companyName: string): void {
    this.removeCompanySubscription(companyId);
    // TODO: ???
    this.subscriptionsService.unsubscribeFromCompany(companyId)
      .subscribe({
        next: () => {
          this.toastr.success(`Successfully unsubscribed from company ${companyName}.`);
        }
      });
  }

  unsubscribeAll(): void {
    this.clearCompanySubscriptions();
    // TODO: ???
    this.subscriptionsService.unsubscribeFromAllCompanies()
      .subscribe({
        next: () => {
          this.toastr.success(`Successfully unsubscribed from all companies.`);
        }
      });
  }

  unsubscribeJobs(jobSubscriptionId: number): void {
    this.removeJobSubscriptions(jobSubscriptionId);
    // TODO: ???
    this.subscriptionsService.unsubscribeForJobsWithCriterias(jobSubscriptionId)
      .subscribe({
        next: () => {
          const jobSubscription: JobSubscription = this.jobSubs().filter(js => js.id === jobSubscriptionId)[0];
          this.toastr.success(`Successfully unsubscribed from jobs with category ${jobSubscription.jobCategory} and location ${jobSubscription.location}.`);
        }
      });
  }

  unsubscribeForAllJobs(): void {
    this.clearJobSubscriptions();
    // TODO: ???
    this.subscriptionsService.unsubscribeForAllJobsWithCriterias()
      .subscribe({
        next: () => {
          this.toastr.success("Successfully unsubscribed from all jobs with criterias.");
        }
      });
  }
}
