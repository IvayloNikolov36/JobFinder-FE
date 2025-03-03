import { Component, input, InputSignal } from '@angular/core';
import { AdApplicationInfo } from '../../models';
import { Router } from '@angular/router';

@Component({
  selector: 'jf-ad-applications-listing',
  standalone: false,
  templateUrl: './ad-applications-listing.component.html',
  styleUrl: './ad-applications-listing.component.css'
})
export class AdApplicationsListingComponent {

  applicationsData: InputSignal<AdApplicationInfo[] | undefined> = input.required<AdApplicationInfo[] | undefined>();

  constructor(private router: Router) { }

  openCvPreview = (cvId: string, jobAdId: number): void => {
    this.router.navigate([`my-ads/${jobAdId}/user-cv-preview/${cvId}`]);
  }
}
