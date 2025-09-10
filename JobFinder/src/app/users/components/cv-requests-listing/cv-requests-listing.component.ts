import { Component, OnInit } from '@angular/core';
import { AnonymousProfileService } from '../../services';
import { CvRequestListingModel } from '../../models/cv';
import { finalize } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'jf-cv-requests-listing',
  templateUrl: './cv-requests-listing.component.html',
  standalone: false
})
export class CvRequestsListingComponent implements OnInit {

  cvRequestsData: CvRequestListingModel[] = [];

  readonly displayedColumns: string[] = ['companyLogo', 'company', 'position', 'requestDate', 'acceptedDate', 'actions'];
  loading: boolean = false;

  constructor(
    private anonymousProfileService: AnonymousProfileService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadCvRequestsData();
  }

  allowCvPreview(id: number, companyName: string): void {
    this.anonymousProfileService.acceptCvPreviewRequest(id)
      .subscribe({
        next: () => {
          const requestCv: CvRequestListingModel = this.cvRequestsData.find(rd => rd.id === id)!;
          requestCv.acceptedDate = new Date();
          this.cvRequestsData = cloneDeep(this.cvRequestsData);
          this.toastr.success(`You have just allowed ${companyName} to canvass your CV.`)
        },
        error: (err: HttpErrorResponse) => this.toastr.error(err.error.errors.join(' '))
      });
  }

  private loadCvRequestsData(): void {
    this.loading = true;
    this.anonymousProfileService
      .viewAllCvRequests()
      .pipe(
        finalize(() => this.loading = false)
      )
      .subscribe({
        next: (data: CvRequestListingModel[]) => this.cvRequestsData = data
      });
  }
}
