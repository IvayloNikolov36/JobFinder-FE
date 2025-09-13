import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IdentityResult, JobAdCreate } from '../../../core/models';
import { ToastrService } from 'ngx-toastr';
import { CompanyJobAdsService } from '../../services';
import { AdFormComponent } from '../ad-form/ad-form.component';

@Component({
  selector: 'jf-create-job-advertisement',
  templateUrl: './create-job-advertisement.component.html',
  standalone: false
})
export class CreateJobAdvertisementComponent {

  @ViewChild(AdFormComponent) adForm: AdFormComponent | null = null;

  adData: JobAdCreate | null = null;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private jobAdsService: CompanyJobAdsService) {
    
    const passedAdData = this.router.getCurrentNavigation()?.extras.state;
    this.adData = passedAdData as JobAdCreate;
  }

  saveAsDraft(): void {
    this.jobAdsService.createJobAd(this.adForm!.formValueAsModel)
      .subscribe({
        next: (data: IdentityResult<number>) => {
          this.router.navigate(['ads', data.id]);
          window.scroll(0, 0);
          this.toastr.success("The advertisement is created successfuly!", "Success");
        },
        error: (error) => {
          this.toastr.error(error.error.errors);
        }
      });
  }
}
