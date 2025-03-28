import { Component, Input } from '@angular/core';
import { JobAd } from '../../../core/models';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services';

@Component({
  selector: 'jf-job-ad',
  templateUrl: './job-ad.component.html',
  standalone: false
})
export class JobAdComponent {

  @Input() ad!: JobAd;
  @Input() isEven!: boolean;

  constructor(
    private router: Router,
    private authService: AuthService) { }

  viewAdDetails(jobAdId: number): void {
    if (this.authService.isCompany()) {
      this.router.navigate(['/ad', jobAdId]);
    } else {
      this.router.navigate(['/job-ad', jobAdId]);
    }
  }
}
