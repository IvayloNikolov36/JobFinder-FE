import { Component, OnInit } from '@angular/core';
import { CvPreviewRequestsService } from '../../services';
import { Observable } from 'rxjs';
import { CvPreviewRequestDataModel } from '../../models';

@Component({
  selector: 'jf-cv-preview-requests-listing',
  templateUrl: './cv-preview-requests-listing.component.html',
  standalone: false
})
export class CvPreviewRequestsListingComponent implements OnInit {

  cvRequestsData$!: Observable<CvPreviewRequestDataModel[]>;

  readonly displayedColumns: string[] = ['anonymousProfile', 'position', 'requestDate', 'acceptedDate', 'actions'];

  constructor(private cvPreviewRequestsService: CvPreviewRequestsService) { }

  ngOnInit(): void {
    this.loadData();
  }

  private loadData = (): void => {
    this.cvRequestsData$ = this.cvPreviewRequestsService.getAllCvRequestsData();
  }
}
