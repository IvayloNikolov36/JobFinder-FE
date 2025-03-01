import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CurriculumVitaesService } from '../services';
import { CvPreviewData } from '../../models';

@Component({
  selector: 'jf-user-cv-preview',
  standalone: false,
  templateUrl: './user-cv-preview.component.html',
  styleUrl: './user-cv-preview.component.css'
})
export class UserCvPreviewComponent implements OnInit {

  userCvId!: string;
  cv!: CvPreviewData;

  constructor(
    private route: ActivatedRoute,
    private cvsService: CurriculumVitaesService
  ) {
    this.userCvId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.cvsService.getUserCvData(this.userCvId).subscribe((data: CvPreviewData) => {
      this.cv = data;
    });
  }
}
