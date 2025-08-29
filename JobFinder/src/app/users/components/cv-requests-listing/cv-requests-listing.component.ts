import { Component, OnInit } from '@angular/core';
import { AnonymousProfileService } from '../../services';
import { CvRequestListingModel } from '../../models/cv';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'jf-cv-requests-listing',
  templateUrl: './cv-requests-listing.component.html',
  standalone: false
})
export class CvRequestsListingComponent implements OnInit {

  cvRequestsData$!: Observable<CvRequestListingModel[]>;

  readonly displayedColumns: string[] = ['company', 'position', 'requestDate', 'acceptedDate', 'actions'];

  constructor(
    private anonymousProfileService: AnonymousProfileService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadCvRequestsData();
  }

  // TODO: update the button after successful permision
  giveAccessToCv(id: number, companyName: string): void {
    this.anonymousProfileService.acceptCvPreviewRequest(id)
      .subscribe({
        next: () => this.toastr.success(`You have just allowed ${companyName} to canvass your CV.`),
        error: (err: HttpErrorResponse) => this.toastr.error(err.error.errors.join(' '))
      })
  }

  private loadCvRequestsData() {
    this.cvRequestsData$ = this.anonymousProfileService.viewAllCvRequests();
  }
}
