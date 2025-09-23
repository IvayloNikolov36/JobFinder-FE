import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CompanyJobAdsService } from '../../services';
import { AdDetails, JobAdCreate, JobAdEditModel } from '../../models';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { AdFormComponent } from '../ad-form/ad-form.component';
import { LifycycleStatusEnum } from '../../enums';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'jf-ad-view-edit',
  templateUrl: './ad-view-edit.component.html',
  standalone: false
})
export class AdViewEditComponent implements OnInit {

  @Input() id!: number;
  @ViewChild(AdFormComponent) adFormComponent!: AdFormComponent;

  adData!: JobAdCreate;
  adDetails: AdDetails | null = null;

  readonly status: typeof LifycycleStatusEnum = LifycycleStatusEnum;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private jobAdsService: CompanyJobAdsService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getAdDetailsData();
  }

  update(): void {
    this.jobAdsService.updateJobAd(
      this.id,
      this.constructJobAdEditModel(this.adFormComponent.formValueAsModel))
      .subscribe({
        next: () => {
          this.toastr.success('The advertisement is updated successfuly!', 'Success');
          this.router.navigate(['/home']);
        },
        error: (error: HttpErrorResponse) => {
          this.toastr.error(error.error.errors);
        }
      });
  }

  activate(): void {
    this.jobAdsService.updateJobAd(
      this.id,
      this.constructJobAdEditModel(this.adFormComponent.formValueAsModel, true))
      .subscribe({
        next: () => {
          this.toastr.success('The advertisement is activated successfuly!', 'Success');
          this.router.navigate(['/home']);
        },
        error: (error: HttpErrorResponse) => {
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
        error: (error: HttpErrorResponse) => {
          this.toastr.error(error.error.errors);
        }
      });
  }

  createNewWithCopiedData(): void {
    this.router.navigate(['ads/create'], { state: this.adData });
  }

  private getAdDetailsData(): void {
    this.activatedRoute.data.subscribe(({ data }) => {
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

  private constructJobAdEditModel = (
    data: JobAdCreate,
    activate: boolean = false
  ): JobAdEditModel => {
    return { ...data, activate } as JobAdEditModel;
  }
}
