import { Component, Signal } from '@angular/core';
import { AnonymousProfileService } from '../../services';
import { CvRequestListingModel } from '../../models/cv';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { cloneDeep } from 'lodash';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'jf-cv-requests-listing',
  templateUrl: './cv-requests-listing.component.html',
  standalone: false
})
export class CvRequestsListingComponent {

  cvRequestsData!: Signal<CvRequestListingModel[]>;

  readonly displayedColumns: string[] = ['companyLogo', 'company', 'position', 'requestDate', 'acceptedDate', 'actions'];

  constructor(
    private anonymousProfileService: AnonymousProfileService,
    private toastr: ToastrService) {

    this.cvRequestsData = toSignal(this.anonymousProfileService.viewAllCvRequests(), { initialValue: [] });
  }

  allowCvPreview(id: number, companyName: string): void {
    this.anonymousProfileService.acceptCvPreviewRequest(id)
      .subscribe({
        next: () => {
          const requestCv: CvRequestListingModel = this.cvRequestsData()
            .find(rd => rd.id === id)!;
          requestCv.acceptedDate = new Date();
          this.cvRequestsData = cloneDeep(this.cvRequestsData);
          this.toastr.success(`You have just allowed ${companyName} to canvass your CV.`)
        },
        error: (err: HttpErrorResponse) => this.toastr.error(err.error.errors.join(' '))
      });
  }
}
