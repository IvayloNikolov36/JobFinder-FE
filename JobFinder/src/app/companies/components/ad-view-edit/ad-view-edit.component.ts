import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CompanyJobAdsService } from '../../services';
import { AdDetails, JobAd, JobAdCreate, JobAdEditModel } from '../../../core/models';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AdFormComponent } from '../ad-form/ad-form.component';
import { LifycycleStatusEnum } from '../../enums';

@Component({
  selector: 'jf-ad-view-edit',
  templateUrl: './ad-view-edit.component.html',
  standalone: false
})
export class AdViewEditComponent implements OnInit {

  @Input() id!: number;
  @ViewChild(AdFormComponent) adFormComponent!: AdFormComponent;

  adData: JobAdCreate | null = null;
  adDetails: AdDetails | null = null;

  readonly status: typeof LifycycleStatusEnum = LifycycleStatusEnum;

  constructor(
    private router: Router,
    private jobAdsService: CompanyJobAdsService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getJobAdData();
  }

  update(): void {
    this.jobAdsService.updateJobAd(this.id, this.constructJobAdEditModel(this.adFormComponent.formValueAsModel))
      .subscribe({
        next: () => {
          this.toastr.success('The advertisement is updated successfuly!', 'Success');
          this.router.navigate(['/home']);
        },
        error: (error) => {
          this.toastr.error(error.error.errors);
        }
      });
  }

  activate(): void {
    this.jobAdsService.updateJobAd(this.id, this.constructJobAdEditModel(this.adFormComponent.formValueAsModel, true))
      .subscribe({
        next: () => {
          this.toastr.success('The advertisement is activated successfuly!', 'Success');
          this.router.navigate(['/home']);
        },
        error: (error) => {
          this.toastr.error(error.error.errors);
        }
      });
  }

  retire(): void {
    this.jobAdsService.retire(this.id)
      .subscribe({
        next: () => {
          this.toastr.success('The advertisement is retired successfuly!', 'Success');
          this.adDetails!.lifecycleStatusId = LifycycleStatusEnum.Retired;
        },
        error: (error) => {
          this.toastr.error(error.error.errors);
        }
      });
  }

  private getJobAdData = (): void => {
    this.jobAdsService.get(this.id)
      .subscribe((data: AdDetails) => {
        this.adDetails = data;
        this.adData = new JobAdCreate(
          data.position,
          data.description,
          data.minSalary,
          data.maxSalary,
          data.currencyId,
          data.jobCategoryId,
          data.jobEngagementId,
          data.intership,
          data.locationId,
          data.softSkills,
          data.techStacks,
          data.itAreas,
          data.workplaceTypeId);
      });
  }

  private constructJobAdEditModel = (data: JobAdCreate, activate: boolean = false): JobAdEditModel => {
    return { ...data, activate } as JobAdEditModel;
  }
}
