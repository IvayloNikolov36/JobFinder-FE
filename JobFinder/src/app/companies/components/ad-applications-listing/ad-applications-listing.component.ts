import { Component, effect, input, InputSignal } from '@angular/core';
import { AdApplicationInfo } from '../../models';

@Component({
  selector: 'jf-ad-applications-listing',
  standalone: false,
  templateUrl: './ad-applications-listing.component.html',
  styleUrl: './ad-applications-listing.component.css'
})
export class AdApplicationsListingComponent {

  applicationsData: InputSignal<AdApplicationInfo[] | undefined> = input.required<AdApplicationInfo[] | undefined>();

  constructor() {
    effect(() => {
      console.log(this.applicationsData());
    });
  }

}
