import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JobDetails } from '../../../core/models/job-details';
import { CvListing } from '../../../users/models/cv';
import { JobAdApplication } from '../../models';
import { CurriculumVitaesService, UserApplicationsService } from '../../../users/services';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'jf-job-advertisement-details',
  templateUrl: './job-advertisement-details.component.html',
  standalone: false
})
export class JobAdvertisementDetailsComponent implements OnInit {

  jobAdId!: number;
  jobDetails!: JobDetails;
  showApplyForm: boolean = false;
  myCVs$!: Observable<CvListing[]>;
  selectedCv: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private cvsService: CurriculumVitaesService,
    private jobAdsApplicationsService: UserApplicationsService,
    private toastr: ToastrService) {
    this.jobAdId = parseInt(this.route.snapshot.params['id']);
  }

  ngOnInit(): void {
    this.getJobDetails();
  }

  onApply = (): void => {
    this.showApplyForm = !this.showApplyForm;

    if (this.showApplyForm && this.myCVs$ === undefined) {
      this.getUserCVs();
    }
  }

  send = (): void => {
    const jobApplication = { jobAdId: this.jobAdId, curriculumVitaeId: this.selectedCv } as JobAdApplication;
    this.jobAdsApplicationsService.applyForJob(jobApplication)
      .subscribe({
        next: () => {
          this.toastr.success("Successfully applied for this job.");
        },
        error: (err: any) => {
          this.toastr.error(err.error.errors[0]);
        }
      });
  }

  private getUserCVs = (): void => {
    this.myCVs$ = this.cvsService.getAllMine();
  }

  private getJobDetails = (): void => {
    
  }
}
