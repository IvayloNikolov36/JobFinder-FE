import { Component } from '@angular/core';
import {
  AbstractControlOptions,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators
} from '@angular/forms';
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
  workplaceTypes$!: Observable<BasicModel[]>;
  softSkills$!: Observable<BasicModel[]>;
  itAreas$: Observable<BasicModel[]> | undefined = undefined;
  techStacks$: Observable<BasicModel[]> | undefined = undefined;

  readonly itCategoryId: number = 3;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private jobAdsService: CompanyJobAdsService,
    private nomenclatureService: NomenclatureService) { }

  ngOnInit() {
    this.loadNomenclatureData();
    this.initializeJobAdvertisementForm();
    this.subscribeToJobCategoryChanges();
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

  private get techStackControl(): any {
    return this.form.controls['techStacks'];
  }

  private get itAreasControl(): any {
    return this.form.controls['itAreas'];
  }

  private get minSalaryControl(): any {
    return this.form.controls['minSalary'];
  }

  private get maxSalaryControl(): any {
    return this.form.controls['maxSalary'];
  }

  private get currencyControl(): any {
    return this.form.controls['currencyId'];
  }

  private get jobCategoryControl(): any {
    return this.form.controls['jobCategoryId'];
  }

  private subscribeToJobCategoryChanges = (): void => {
    this.jobCategoryControl.valueChanges
      .subscribe((categoryId: number) => {
        debugger;
        if (categoryId === this.itCategoryId) {
          this.loadITNomenclatureData();
          this.manageITRelatedControlsValidators([Validators.required], 'add');
        } else {
          this.techStackControl.setValue([]);
          this.itAreasControl.setValue([]);
          this.techStackControl.error = '';
          this.manageITRelatedControlsValidators([Validators.required], 'remove');
        }
      });
  }

  private manageITRelatedControlsValidators = (
    validators: Validators[],
    action: 'add' | 'remove'): void => {

    if (action === 'add') {
      this.techStackControl.addValidators(validators);
      this.itAreasControl.addValidators(validators);
      return;
    }
    this.techStackControl.removeValidators(validators);
    this.techStackControl.updateValueAndValidity();
    this.itAreasControl.removeValidators(validators);
    this.itAreasControl.updateValueAndValidity();
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
        locationId: [null, [Validators.required]],
        softSkills: [[], Validators.required],
        techStacks: [[]],
        itAreas: [[]],
        workplaceTypeId: [null, Validators.required]
      },
      {
        validator: GreaterThanOrEqual('minSalary', 'maxSalary')
      } as AbstractControlOptions
    );

    this.minSalaryControl.valueChanges
      .pipe(distinctUntilChanged())
      .subscribe((minSalaryValue: number | null) => {
        this.setCurrencyFormControl(minSalaryValue, this.maxSalaryControl.value, [Validators.required]);
      });

    this.maxSalaryControl.valueChanges
      .pipe(distinctUntilChanged())
      .subscribe((maxSalaryValue: number | null) => {
        this.setCurrencyFormControl(this.minSalaryControl.value, maxSalaryValue, [Validators.required]);
      });
  }

  private setCurrencyFormControl = (
    minSalaryValue: number | null,
    maxSalaryValue: number | null,
    validators: ValidatorFn[]): void => {

    if (minSalaryValue === null && maxSalaryValue == null) {
      this.currencyControl.removeValidators(validators);
    } else {
      this.currencyControl.addValidators(validators);
    }

    if (!minSalaryValue && !maxSalaryValue && this.currencyControl.value) {
      this.currencyControl.setValue(null);
    }

    this.currencyControl.updateValueAndValidity();
  }

  private loadNomenclatureData(): void {
    this.jobCategories$ = this.nomenclatureService.getJobCategories();
    this.jobEngagements$ = this.nomenclatureService.getJobEngagements();
    this.locations$ = this.nomenclatureService.getCities();
    this.currencies$ = this.nomenclatureService.getCurrcencies();
    this.workplaceTypes$ = this.nomenclatureService.getWorkplaceTypes();
    this.softSkills$ = this.nomenclatureService.getSoftSkills();
  }

  private loadITNomenclatureData(): void {
    if (this.itAreas$ === undefined) {
      this.itAreas$ = this.nomenclatureService.getITAreas();
    }

    if (this.techStacks$ === undefined) {
      this.techStacks$ = this.nomenclatureService.getTechStacks();
    }
  }
}
