import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { GreaterThanOrEqual } from '../../../core/functions';
import { distinctUntilChanged, forkJoin, Observable } from 'rxjs';
import { BasicModel } from '../../../core/models';
import { NomenclatureService } from '../../../core/services';
import { JobAd, JobAdForm } from '../../models';

@Component({
  selector: 'jf-ad-form',
  templateUrl: './ad-form.component.html',
  standalone: false
})
export class AdFormComponent implements OnInit, OnChanges {

  @Input() adData: JobAd | null = null;
  @Input() disabled: boolean = false;

  form!: FormGroup<JobAdForm>;

  jobCategories!: BasicModel<number>[];
  jobEngagements!: BasicModel<number>[];
  locations!: BasicModel<number>[];
  currencies!: BasicModel<number>[];
  workplaceTypes!: BasicModel<number>[];
  softSkills!: BasicModel<number>[];
  itAreas: BasicModel<number>[] | undefined;
  techStacks: BasicModel<number>[] | undefined;

  readonly itCategoryId: number = 3;

  constructor(private fb: FormBuilder,
    private nomenclatureService: NomenclatureService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['adData']) {
      this.form?.setValue(this.adData!);
    }

    if (changes['disabled']) {
      if (this.disabled) {
        this.form?.disable();
      } else {
        this.form?.enable();
      }
    }
  }

  ngOnInit(): void {
    this.initializeJobAdvertisementForm();
    this.subscribeToJobCategoryChanges();
    this.getNomenclatureData();
  }

  get formValueAsModel(): JobAd {
    return this.form.value as JobAd;
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

    this.subscribeToMinSalaryValueChanges();

    this.subscribeToMaxSalaryValueChanges();
  }

  private subscribeToMinSalaryValueChanges(): void {
    this.minSalaryControl.valueChanges
      .pipe(distinctUntilChanged())
      .subscribe((minSalaryValue: number | null) => {
        this.setCurrencyFormControl(minSalaryValue, this.maxSalaryControl.value, [Validators.required]);
      });
  }

  private subscribeToMaxSalaryValueChanges(): void {
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

  private nomenclatureDataObservable(includeItNomenclatureData: boolean = false)
    : Observable<BasicModel<number>[][]> {

    const nomenclatureObservables = [
      this.nomenclatureService.getJobCategories(),
      this.nomenclatureService.getJobEngagements(),
      this.nomenclatureService.getCities(),
      this.nomenclatureService.getCurrcencies(),
      this.nomenclatureService.getWorkplaceTypes(),
      this.nomenclatureService.getSoftSkills()
    ];

    if (includeItNomenclatureData) {
      nomenclatureObservables.concat(
        [
          this.nomenclatureService.getITAreas(),
          this.nomenclatureService.getTechStacks()
        ]
      );
    }

    return forkJoin(nomenclatureObservables);
  }

  private loadITNomenclatureData(): void {
    if (this.itAreas === undefined) {
      this.nomenclatureService.getITAreas()
        .subscribe((data: BasicModel<number>[]) => this.itAreas = data);
    }
    if (this.techStacks === undefined) {
      this.nomenclatureService.getTechStacks()
        .subscribe((data: BasicModel<number>[]) => this.techStacks = data);
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

  private shouldLoadItNomenclatureData(): boolean {
    return this.adData?.jobCategoryId === this.itCategoryId;
  }

  private getNomenclatureData(): void {
    this.nomenclatureDataObservable(this.shouldLoadItNomenclatureData())
      .subscribe({
        next: (data: BasicModel<number>[][]) => {
          this.setNomenclatureData(data);
          if (this.adData) {
            this.form.setValue(this.adData);
            if (this.disabled) {
              this.form.disable();
            }
          }
        }
      });
  }

  private setNomenclatureData(data: BasicModel<number>[][]): void {
    this.jobCategories = data[0];
    this.jobEngagements = data[1];
    this.locations = data[2];
    this.currencies = data[3];
    this.workplaceTypes = data[4];
    this.softSkills = data[5];
    this.itAreas = data[6];
    this.techStacks = data[7];
  }
}

enum Action {
  add, remove
}
