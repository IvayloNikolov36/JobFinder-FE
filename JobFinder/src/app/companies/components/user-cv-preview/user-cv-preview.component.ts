import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CurriculumVitaesService } from '../services';
import { CvPreviewData } from '../../models';
import { JobAdsApplicationsService } from '../../../services/job-ads-applications.service';

@Component({
  selector: 'jf-user-cv-preview',
  standalone: false,
  templateUrl: './user-cv-preview.component.html',
  styleUrl: './user-cv-preview.component.css'
})
export class UserCvPreviewComponent implements OnInit {

  userCvId!: string;
  jobAdId!: number;
  cv!: CvPreviewData;

  constructor(
    private route: ActivatedRoute,
    private cvsService: CurriculumVitaesService,
    private jobAddApplicationsService: JobAdsApplicationsService
  ) {
    this.userCvId = this.route.snapshot.params['cvId'];
    this.jobAdId = +this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.cvsService.getUserCvData(this.userCvId, this.jobAdId)
      .subscribe((data: CvPreviewData) => {
        this.cv = data;
        this.setPreviewed(); // for testing purposes
      });

      
  }

  // TODO: create logic after specific time to invoke setPreviewed

  setPreviewed(): void {
    this.jobAddApplicationsService.setPreviewInfo(this.userCvId, this.jobAdId)
      .subscribe();
  }
}
