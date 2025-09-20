import { Component, Input, OnInit } from '@angular/core';
import { JobAd } from '../../../core/models';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services';

@Component({
  selector: 'jf-job-ad',
  templateUrl: './job-ad.component.html',
  standalone: false
})
export class JobAdComponent implements OnInit {

  @Input() ad!: JobAd;
  @Input() isEven!: boolean;

  cardClass: object = {};

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.setCardClassStyleObject();
  }

  viewAdDetails(jobAdId: number): void {
    if (this.authService.isCompany()) {
      this.router.navigate(['/ad', jobAdId]);
    } else {
      this.router.navigate(['/job-ad', jobAdId]);
    }
  }

  setCardClassStyleObject(): void {
    this.cardClass = {
      'me-5': this.isEven,
      'ms-5': !this.isEven,
      'white-blue-gradient': this.isEven,
      'blue-white-gradient': !this.isEven
    }
  }
}
