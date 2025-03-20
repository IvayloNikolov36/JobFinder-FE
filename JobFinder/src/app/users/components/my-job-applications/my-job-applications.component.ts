import { Component, OnInit } from '@angular/core';
import { JobAdApplicationDetails } from '../../../models';
import { UserApplicationsService } from '../../../services';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'jf-my-job-applications',
  templateUrl: './my-job-applications.component.html',
  standalone: false
})
export class MyJobApplicationsComponent implements OnInit {

  applications$!: Observable<JobAdApplicationDetails[]>;

  constructor(
    private router: Router,
    private jobAdsApplicationsService: UserApplicationsService) { }

  ngOnInit(): void {
    this.applications$ = this.jobAdsApplicationsService.getAllMyJobApplications();
  }

  viewJobApplicationDetails = (jobAdId: number): void => {
    this.router.navigate(['/job-ad', jobAdId]);
  }
}
