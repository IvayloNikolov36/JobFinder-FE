import { Component } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { distinctUntilChanged, Observable } from 'rxjs';
import { BasicModel } from '../../../core/models';
import { NomenclatureService } from '../../../core/services';
import { ToastrService } from 'ngx-toastr';
import { CompanyJobAdsService } from '../../services';
import { GreaterThanOrEqual } from '../../../core/functions';

@Component({
  selector: 'jf-create-job-advertisement',
  templateUrl: './create-job-advertisement.component.html',
  standalone: false
})
export class CreateJobAdvertisementComponent {

  form!: FormGroup;
  jobCategories$!: Observable<BasicModel[]>;
  jobEngagements$!: Observable<BasicModel[]>;
  locations$!: Observable<BasicModel[]>;
  currencies$!: Observable<BasicModel[]>;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private jobAdsService: CompanyJobAdsService,
    private nomenclatureService: NomenclatureService) { }

  ngOnInit() {
    this.loadNomenclatureData();
    this.initializeJobAdvertisementForm();
  }

  changeJobCategory(categoryId: number): void {
    this.form.controls['jobCategoryId'].setValue(categoryId);
  }

  changeJobEngagement(engagementId: number): void {
    this.form.controls['jobEngagementId'].setValue(engagementId);
  }

  changeLocation(locationId: number): void {
    this.form.controls['locationId'].setValue(locationId);
  }

  changeCurrency(currencyId: number): void {
    this.form.controls['currencyId'].setValue(currencyId);
  }

  publishAd(): void {
    this.jobAdsService.createJobAd(this.form.value)
      .subscribe({
        next: () => {
          this.toastr.success("The Job Advertisement is published successfully.", "Success");
          this.router.navigate(['/home']);
        },
        error: (error) => {
          this.toastr.error(error.error.errors);
        }
      });
  }

  private initializeJobAdvertisementForm(): void {
    this.form = this.fb.group(
      {
        position: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(90)]],
        description: ['', [Validators.required, Validators.minLength(20)]],
        minSalary: [null, [Validators.min(1)]],
        maxSalary: [null, [Validators.min(1)]],
        currencyId: [null],
        jobCategoryId: [null, [Validators.required]],
        jobEngagementId: [null, [Validators.required]],
        intership: [false],
        locationId: [null, [Validators.required]]
      },
      {
        validator: GreaterThanOrEqual('minSalary', 'maxSalary')
      } as AbstractControlOptions
    );

    this.form.controls['minSalary'].valueChanges
      .pipe(distinctUntilChanged())
      .subscribe((minSalaryValue: number | null) => {
        this.setCurrencyFormControl(minSalaryValue, this.form.controls['maxSalary'].value, [Validators.required]);
      });

    this.form.controls['maxSalary'].valueChanges
      .pipe(distinctUntilChanged())
      .subscribe((maxSalaryValue: number | null) => {
        this.setCurrencyFormControl(this.form.controls['minSalary'].value, maxSalaryValue, [Validators.required]);
      });
  }

  private setCurrencyFormControl = (
    minSalaryValue: number | null,
    maxSalaryValue: number | null,
    validators: ValidatorFn[]): void => {
    const currencyFormControl = this.form.controls['currencyId'];
    if (minSalaryValue === null && maxSalaryValue == null) {
      currencyFormControl.removeValidators(validators);
    } else {
      currencyFormControl.addValidators(validators);
    }

    if (!minSalaryValue && !maxSalaryValue && currencyFormControl.value) {
      currencyFormControl.setValue(null);
    }

    currencyFormControl.updateValueAndValidity();
  }

  private loadNomenclatureData(): void {
    this.jobCategories$ = this.nomenclatureService.getJobCategories();
    this.jobEngagements$ = this.nomenclatureService.getJobEngagements();
    this.locations$ = this.nomenclatureService.getCities();
    this.currencies$ = this.nomenclatureService.getCurrcencies();
  }
}
