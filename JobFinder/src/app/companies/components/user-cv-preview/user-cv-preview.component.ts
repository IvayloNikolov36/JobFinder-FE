import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompanyJobAdApplicationsService, CurriculumVitaesService } from '../../services';
import { ApplicationPreviewInfo, CvPreviewData } from '../../models';

const PreviewedAfterMiliSeconds: number = 3000;

@Component({
  selector: 'jf-user-cv-preview',
  templateUrl: './user-cv-preview.component.html',
  standalone: false
})
export class UserCvPreviewComponent implements OnInit, OnDestroy {

  userCvId!: string;
  jobAdId!: number;
  cv!: CvPreviewData;
  timerId: any;

  constructor(
    private route: ActivatedRoute,
    private cvsService: CurriculumVitaesService,
    private applicationsService: CompanyJobAdApplicationsService
  ) {
    this.userCvId = this.route.snapshot.params['cvId'];
    this.jobAdId = +this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.cvsService.getUserCvData(this.userCvId, this.jobAdId)
      .subscribe((data: CvPreviewData) => {
        this.cv = data;
        this.setPreviewed();
      });
  }

  ngOnDestroy(): void {
    clearTimeout(this.timerId);
  }

  private setPreviewed(): void {
    this.timerId = setTimeout(() => {
      this.cvPreviewed();
    }, PreviewedAfterMiliSeconds);
  }

  private cvPreviewed(): void {
    this.applicationsService.setPreviewInfo(this.userCvId, this.jobAdId)
      .subscribe({
        next: (previewInfo: ApplicationPreviewInfo) => {
          // TODO: set in store or in some kind of collection in the service
          console.log(previewInfo);
        }
      });
  }
}
