import { Component, OnInit } from '@angular/core';
import { JobAdApplicationDetails } from '../../../models';
import { JobAdsApplicationsService } from '../../../services/job-ads-applications.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'jf-my-job-applications',
  standalone: false,
  templateUrl: './my-job-applications.component.html',
  styleUrl: './my-job-applications.component.css'
})
export class MyJobApplicationsComponent implements OnInit {

  applications$!: Observable<JobAdApplicationDetails[]>;

  constructor(private jobAdsApplicationsService: JobAdsApplicationsService) { }

  ngOnInit(): void {
    this.applications$ = this.jobAdsApplicationsService.getAllMyJobApplications();
  }

  viewJobApplicationDetails = (): void => {
    
  }
}
