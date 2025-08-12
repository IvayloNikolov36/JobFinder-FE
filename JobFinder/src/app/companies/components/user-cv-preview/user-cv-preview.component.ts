import { Component, Input, OnDestroy, OnInit } from '@angular/core';
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

  @Input() cvRequestId: string | null = null;
  @Input() cvId!: string;
  @Input('id') jobAdId!: number;

  userCvData$!: Observable<CvPreviewData>;
  cv!: CvPreviewData;
  timerId: any;
  setPreviewed: boolean = false;

  constructor(
    private cvsService: CurriculumVitaesService,
    private applicationsService: CompanyJobAdApplicationsService
  ) { }

  ngOnInit(): void {
    this.loadCvData();
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
      .setPreviewInfo(this.cvId, this.jobAdId)
      .subscribe();
  }

  private loadCvData = (): void => {
    if (this.cvRequestId) {
      this.userCvData$ = this.cvsService.getRequestedCvData(+this.cvRequestId);
    } else {
      this.userCvData$ = this.cvsService.getUserCvData(this.cvId, this.jobAdId);
      this.setPreviewed = true;
    }

    this.userCvData$.subscribe((data: CvPreviewData) => {
      this.cv = data;
      if (this.setPreviewed) {
        this.setCvIsPreviewed();
      }
    });
  }
}
