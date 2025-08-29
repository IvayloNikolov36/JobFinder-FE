import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { GreaterThanOrEqual } from '../../../core/functions';
import { distinctUntilChanged, Observable } from 'rxjs';
import { AdDetails, BasicModel } from '../../../core/models';
import { NomenclatureService } from '../../../core/services';

@Component({
  selector: 'jf-ad-form',
  templateUrl: './ad-form.component.html',
  standalone: false
})
export class AdFormComponent implements OnInit, OnChanges {

  @Input() adData: AdDetails | null = null;

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

  private initializeJobAdvertisementForm(): void {
    this.form = this.fb.group(
      {
        // TODO: refactor the model and remove id and lifecycleStatusId
        id: [],
        lifecycleStatusId: [],
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

  private subscribeToJobCategoryChanges = (): void => {
    this.jobCategoryControl.valueChanges
      .subscribe((categoryId: number) => {
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
}
