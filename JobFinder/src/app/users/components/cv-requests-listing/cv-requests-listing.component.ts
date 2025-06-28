import { Component, OnInit } from '@angular/core';
import { AnonymousProfileService } from '../../services';
import { CvRequestListingModel } from '../../models/cv';
import { Observable } from 'rxjs';

@Component({
  selector: 'jf-cv-requests-listing',
  templateUrl: './cv-requests-listing.component.html',
  standalone: false
})
export class CvRequestsListingComponent implements OnInit {

  cvRequestsData$!: Observable<CvRequestListingModel[]>;

  readonly displayedColumns: string[] = ['company', 'position', 'requestDate', 'acceptedDate', 'actions'];

  constructor(
    private anonymousProfileService: AnonymousProfileService) { }

  ngOnInit(): void {
    this.loadCvRequestsData();
  }

  giveAccessToCv(): void {
    
  }

  private loadCvRequestsData() {
    this.cvRequestsData$ = this.anonymousProfileService.viewAllCvRequests();
  }
}
