import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompanyJobAdApplicationsService, CurriculumVitaesService } from '../../services';
import { CvPreviewData } from '../../models';
import { Observable } from 'rxjs';

const PreviewedAfterMiliSeconds: number = 3000;

@Component({
  selector: 'jf-user-cv-preview',
  templateUrl: './user-cv-preview.component.html',
  standalone: false
})
export class UserCvPreviewComponent implements OnInit, OnDestroy {

  userCvData$!: Observable<CvPreviewData>;
  cv!: CvPreviewData;
  timerId: any;
  setPreviewed: boolean = false;
  userCvId: string | null = null;
  jobAdId: number | null = null;

  constructor(
    cvsService: CurriculumVitaesService,
    route: ActivatedRoute,
    private applicationsService: CompanyJobAdApplicationsService
  ) {
    const requestCvId: string = route.snapshot.params['cvRequestId'];
    if (requestCvId) {
      this.userCvData$ = cvsService.getRequestedCvData(+requestCvId);
    } else {
      this.userCvId = route.snapshot.params['cvId'];
      this.jobAdId = +route.snapshot.params['id'];
      this.userCvData$ = cvsService.getUserCvData(this.userCvId!, this.jobAdId);
      this.setPreviewed = true;
    }
  }

  ngOnInit(): void {
    this.userCvData$.subscribe((data: CvPreviewData) => {
      this.cv = data;
      if (this.setPreviewed) {
        this.setCvIsPreviewed();
      }
    });
  }

  ngOnDestroy(): void {
    clearTimeout(this.timerId);
  }

  private setCvIsPreviewed(): void {
    this.timerId = setTimeout(() => {
      this.cvPreviewed();
    }, PreviewedAfterMiliSeconds);
  }

  private cvPreviewed(): void {
    this.applicationsService
      .setPreviewInfo(this.userCvId!, this.jobAdId!)
      .subscribe();
  }
}
