import { Component, input, InputSignal, output, OutputEmitterRef } from '@angular/core';
import { JobSubscription } from '../../models';

@Component({
  selector: 'jf-job-subscriptions-listing',
  templateUrl: './job-subscriptions-listing.component.html',
  standalone: false
})
export class JobSubscriptionsListingComponent {

  jobSubscriptions: InputSignal<JobSubscription[]> = input.required<JobSubscription[]>();
  onUnsubscribe: OutputEmitterRef<number> = output<number>();

  unsubscribeForJobs = (jobSubscriptionId: number): void => {
    this.onUnsubscribe.emit(jobSubscriptionId);
  }
}
