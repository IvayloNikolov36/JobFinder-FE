import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CompanyJobAdsService } from '../../services';
import { AdDetails, JobAd } from '../../models';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { AdFormComponent } from '../ad-form/ad-form.component';
import { LifycycleStatusEnum } from '../../enums';
import { HttpErrorResponse } from '@angular/common/http';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'jf-ad-view-edit',
  templateUrl: './ad-view-edit.component.html',
  standalone: false
})
export class AdViewEditComponent implements OnInit {

  @Input() id!: number;
  @ViewChild(AdFormComponent) adFormComponent!: AdFormComponent;

  adData!: JobAd;
  adDetails: AdDetails | null = null;

  isEditMode: boolean = false;

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

  onEditMode = (): void => {
    this.isEditMode = true;
  }

  discardChanges = (): void => {
    this.isEditMode = false;
    this.adData = cloneDeep(this.adData);
  }

  update(): void {
    this.jobAdsService.updateJobAd(
      this.id,
      this.adFormComponent.formValueAsModel)
      .subscribe({
        next: () => {
          this.toastr.success('The advertisement is updated successfuly!', 'Success');
          this.router.navigate(['profile/my-ads']);
        },
        error: (error: HttpErrorResponse) => {
          this.toastr.error(error.error.errors);
        }
      });
  }

  activate(): void {
    this.jobAdsService.activate(this.id)
      .subscribe({
        next: () => {
          this.toastr.success('The advertisement is activated successfuly!', 'Success');
          this.router.navigate(['profile/my-ads']);
        },
        error: (error: HttpErrorResponse) => this.toastr.error(error.error.errors)
      });
  }

  retire(): void {
    this.jobAdsService.retire(this.id)
      .subscribe({
        next: () => {
          this.toastr.success('The advertisement is retired successfuly!', 'Success');
          this.adDetails!.lifecycleStatusId = LifycycleStatusEnum.Retired;
        },
        error: (error: HttpErrorResponse) => this.toastr.error(error.error.errors)
      });
  }

  createNewWithCopiedData(): void {
    this.router.navigate(['ads/create'], { state: this.adData });
  }

  private getAdDetailsData(): void {
    this.activatedRoute.data.subscribe(({ data }) => {
      this.adDetails = data;
      this.adData = new JobAd(
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
}
