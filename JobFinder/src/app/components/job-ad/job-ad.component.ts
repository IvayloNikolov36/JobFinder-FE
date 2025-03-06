import { Component, Input } from '@angular/core';
import { JobAd } from '../../models';
import { Router } from '@angular/router';

@Component({
  selector: 'jf-job-ad',
  templateUrl: './job-ad.component.html',
  standalone: false
})
export class JobAdComponent {

  @Input() ad!: JobAd;
  @Input() isEven!: boolean;

  constructor(private router: Router) { }

  viewAdDetails(jobAdId: number): void {
    this.router.navigate(['/job-details', jobAdId]);
  }
}
