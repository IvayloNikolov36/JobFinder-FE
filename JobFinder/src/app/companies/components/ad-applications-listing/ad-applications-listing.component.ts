import { Component, input, InputSignal } from '@angular/core';
import { JobApplicationInfo } from '../../models';
import { Router } from '@angular/router';

@Component({
  selector: 'jf-ad-applications-listing',
  templateUrl: './ad-applications-listing.component.html',
  standalone: false
})
export class AdApplicationsListingComponent {

  applicationsData: InputSignal<JobApplicationInfo[] | undefined> = input.required<JobApplicationInfo[] | undefined>();

  constructor(private router: Router) { }

  openCvPreview = (cvId: string, jobAdId: number): void => {
    this.router.navigate([`my-ads/${jobAdId}/cv/${cvId}/preview`]);
  }
}
