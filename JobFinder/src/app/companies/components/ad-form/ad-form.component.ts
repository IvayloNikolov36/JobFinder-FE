import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { GreaterThanOrEqual } from '../../../core/functions';
import { distinctUntilChanged, Observable } from 'rxjs';
import { BasicModel, JobAdCreate } from '../../../core/models';
import { NomenclatureService } from '../../../core/services';

@Component({
  selector: 'jf-ad-form',
  templateUrl: './ad-form.component.html',
  standalone: false
})
export class AdFormComponent implements OnInit, OnChanges {

  @Input() adData: JobAdCreate | null = null;

  form!: FormGroup<JobAdForm>;
  jobCategories$!: Observable<BasicModel[]>;
  jobEngagements$!: Observable<BasicModel[]>;
  locations$!: Observable<BasicModel[]>;
  currencies$!: Observable<BasicModel[]>;
  workplaceTypes$!: Observable<BasicModel[]>;
  softSkills$!: Observable<BasicModel[]>;
  itAreas$: Observable<BasicModel[]> | undefined = undefined;
  techStacks$: Observable<BasicModel[]> | undefined = undefined;

  readonly itCategoryId: number = 3;

  constructor(private fb: FormBuilder,
    private nomenclatureService: NomenclatureService
  ) { }

  ngOnChanges(): void {
    if (this.adData && this.form) {
      this.form.setValue(this.adData);
    }
  }

  ngOnInit(): void {
    this.loadNomenclatureData();
    this.initializeJobAdvertisementForm();
    this.subscribeToJobCategoryChanges();
  }

  get formValueAsModel(): JobAdCreate {
    return this.form.value as JobAdCreate;
  }

  private get techStackControl(): any {
    return this.form.controls.techStacks;
  }

  private get itAreasControl(): any {
    return this.form.controls.itAreas;
  }

  private get minSalaryControl(): any {
    return this.form.controls.minSalary;
  }

  private get maxSalaryControl(): any {
    return this.form.controls.maxSalary;
  }

  private get currencyControl(): any {
    return this.form.controls.currencyId;
  }

  private get jobCategoryControl(): any {
    return this.form.controls.jobCategoryId;
  }

  private initializeJobAdvertisementForm(): void {
    this.form = this.fb.group<JobAdForm>(
      {
        position: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(6), Validators.maxLength(90)] }),
        description: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(20)] }),
        minSalary: new FormControl(null, { nonNullable: false, validators: [Validators.min(1)] }),
        maxSalary: new FormControl(null, { nonNullable: false, validators: [Validators.min(1)] }),
        currencyId: new FormControl(null, { nonNullable: false }),
        jobCategoryId: new FormControl(0, { nonNullable: true, validators: [Validators.required] }),
        jobEngagementId: new FormControl(0, { nonNullable: true, validators: [Validators.required] }),
        intership: new FormControl(false, { nonNullable: true }),
        locationId: new FormControl(0, { nonNullable: true, validators: [Validators.required] }),
        softSkills: new FormControl([], { nonNullable: true, validators: [Validators.required] }),
        techStacks: new FormControl([], { nonNullable: true }),
        itAreas: new FormControl([], { nonNullable: true }),
        workplaceTypeId: new FormControl(0, { nonNullable: true, validators: [Validators.required] })
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

  private manageITRelatedControlsValidators = (
    validators: Validators[],
    action: Action): void => {

    if (action === Action.add) {
      this.techStackControl.addValidators(validators);
      this.itAreasControl.addValidators(validators);
      return;
    }
    this.techStackControl.removeValidators(validators);
    this.techStackControl.updateValueAndValidity();
    this.itAreasControl.removeValidators(validators);
    this.itAreasControl.updateValueAndValidity();
  }

  private subscribeToJobCategoryChanges = (): void => {
    this.jobCategoryControl.valueChanges
      .subscribe((categoryId: number) => {
        if (categoryId === this.itCategoryId) {
          this.loadITNomenclatureData();
          this.manageITRelatedControlsValidators([Validators.required], Action.add);
        } else {
          this.techStackControl.setValue([]);
          this.itAreasControl.setValue([]);
          this.techStackControl.error = '';
          this.manageITRelatedControlsValidators([Validators.required], Action.remove);
        }
      });
  }
}

enum Action {
  add, remove
}

interface JobAdForm {
  position: FormControl<string>,
  description: FormControl<string>,
  minSalary: FormControl<number | null>,
  maxSalary: FormControl<number | null>,
  currencyId: FormControl<number | null>,
  jobCategoryId: FormControl<number>,
  jobEngagementId: FormControl<number>,
  intership: FormControl<boolean>,
  locationId: FormControl<number>,
  softSkills: FormControl<number[]>,
  techStacks: FormControl<number[]>,
  itAreas: FormControl<number[]>,
  workplaceTypeId: FormControl<number>
}
