import { Component, OnInit } from '@angular/core';
import { JobAdApplicationDetails } from '../../../models';
import { UserApplicationsService } from '../../../services';
import { Observable } from 'rxjs';

@Component({
  selector: 'jf-my-job-applications',
  standalone: false,
  templateUrl: './my-job-applications.component.html',
  styleUrl: './my-job-applications.component.css'
})
export class MyJobApplicationsComponent implements OnInit {

  applications$!: Observable<JobAdApplicationDetails[]>;

  constructor(private jobAdsApplicationsService: UserApplicationsService) { }

  ngOnInit(): void {
    this.applications$ = this.jobAdsApplicationsService.getAllMyJobApplications();
  }

  viewJobApplicationDetails = (): void => {
    
  }
}
