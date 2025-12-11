import { Component, EventEmitter, Input, Output } from '@angular/core';
import { JobSubscription } from '../../models';

@Component({
  selector: 'jf-job-subscriptions-listing',
  templateUrl: './job-subscriptions-listing.component.html',
  standalone: false
})
export class JobSubscriptionsListingComponent {

  @Input() jobSubscriptions: JobSubscription[] = []; // TODO: accept it as inputsignal
  @Output() onUnsubscribe: EventEmitter<number> = new EventEmitter<number>();

  unsubscribeForJobs = (jobSubscriptionId: number): void => {
    this.onUnsubscribe.emit(jobSubscriptionId);
  }
}
