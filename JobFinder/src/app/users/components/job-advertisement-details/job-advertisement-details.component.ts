import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { JobDetails } from '../../../shared/models/job-details';
import { CvListing } from '../../../users/models/cv';
import { JobAdApplication } from '../../models';
import { CurriculumVitaesService, UserApplicationsService } from '../../../users/services';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../../core/services';

@Component({
  selector: 'jf-job-advertisement-details',
  templateUrl: './job-advertisement-details.component.html',
  standalone: false
})
export class JobAdvertisementDetailsComponent implements OnInit {

  @Input() id!: number;

  jobDetails!: JobDetails;
  showApplyForm: boolean = false;
  myCVs$!: Observable<CvListing[]>;
  selectedCv: string | null = null;
  canApply!: boolean;

  constructor(
    private authService: AuthService,
    private cvsService: CurriculumVitaesService,
    private jobAdsApplicationsService: UserApplicationsService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.canApply = this.authService.isJobSeeker();
    this.getJobDetails();
  }

  onApply = (): void => {
    this.showApplyForm = !this.showApplyForm;

    if (this.showApplyForm && this.myCVs$ === undefined) {
      this.getUserCVs();
    }
  }

  send = (): void => {
    const jobApplication = { jobAdId: this.id, cvId: this.selectedCv } as JobAdApplication;
    this.jobAdsApplicationsService.applyForJob(jobApplication)
      .subscribe({
        next: () => {
          this.toastr.success("Successfully applied for this job.");
        },
        error: (err: HttpErrorResponse) => this.toastr.error(err.error.errors.join(' '))
      });
  }

  private getUserCVs = (): void => {
    this.myCVs$ = this.cvsService.getAllMine();
  }

  private getJobDetails = (): void => {
    // TODO: implement the function   
  }
}
