import { Component, EventEmitter, OnInit, Output, signal, WritableSignal } from '@angular/core';
import { NomenclatureService } from '../../../core/services';
import { BasicModel } from '../../../core/models';
import { Observable } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { AnonymousProfileAppearance } from '../../models';

@Component({
  selector: 'jf-anonymous-profile-appearance',
  templateUrl: './anonymous-profile-appearance.component.html',
  standalone: false
})
export class AnonymousProfileAppearanceComponent implements OnInit {

  @Output() onAppearanceDataEmit: EventEmitter<AnonymousProfileAppearance> = new EventEmitter<AnonymousProfileAppearance>;

  jobCategories$!: Observable<BasicModel<number>[]>;
  jobEngagements$!: Observable<BasicModel<number>[]>;
  softSkills$!: Observable<BasicModel<number>[]>;
  techStacks$!: Observable<BasicModel<number>[]>;
  itAreas$!: Observable<BasicModel<number>[]>;
  workplaceTypes$!: Observable<BasicModel<number>[]>;
  cities$!: Observable<BasicModel<number>[]>;
  showITcontrols: WritableSignal<boolean> = signal<boolean>(false);

  form!: FormGroup<AnonymousProfileAppearanceForm>;

  readonly itCategoryId: number = 3;

  constructor(
    private nomenclatureService: NomenclatureService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.loadNomenclatureData();
    this.subscribeToJobCategoryFormChanges();
  }

  submitAnonymousProfileAppearanceData = (): void => {
    this.onAppearanceDataEmit.emit(this.form.value as AnonymousProfileAppearance);
  }

  private get techStackControl() {
    return this.form.controls.techStacks;
  }

  private get itAreasControl() {
    return this.form.controls.itAreas;
  }

  private initializeForm(): void {
    this.form = this.formBuilder.group<AnonymousProfileAppearanceForm>({
      jobCategoryId: new FormControl(0, { nonNullable: true, validators: Validators.required }),
      jobEngagements: new FormControl([], { nonNullable: true, validators: Validators.required }),
      preferredPositions: new FormControl(null, { nonNullable: false }),
      softSkills: new FormControl([], { nonNullable: true, validators: Validators.required }),
      itAreas: new FormControl([], { nonNullable: true }),
      techStacks: new FormControl([], { nonNullable: true }),
      workplaceTypes: new FormControl([], { nonNullable: true, validators: Validators.required }),
      cities: new FormControl([], { nonNullable: true, validators: Validators.required })
    });
  }

  private loadNomenclatureData(): void {
    this.jobCategories$ = this.nomenclatureService.getJobCategories();
    this.jobEngagements$ = this.nomenclatureService.getJobEngagements();
    this.softSkills$ = this.nomenclatureService.getSoftSkills();
    this.techStacks$ = this.nomenclatureService.getTechStacks();
    this.itAreas$ = this.nomenclatureService.getITAreas();
    this.workplaceTypes$ = this.nomenclatureService.getWorkplaceTypes();
    this.cities$ = this.nomenclatureService.getCities();
  }

  private subscribeToJobCategoryFormChanges = (): void => {

    this.form.controls['jobCategoryId'].valueChanges
      .subscribe((categoryId: number) => {
        const validator: ValidatorFn = Validators.required;

        if (categoryId === this.itCategoryId) {
          this.techStackControl.addValidators(validator);
          this.itAreasControl.addValidators(validator);
          this.showITcontrols.set(true);
        } else {
          this.techStackControl.removeValidators(validator);
          this.itAreasControl.removeValidators(validator);
          this.showITcontrols.set(false);
          this.techStackControl.setValue([]);
          this.itAreasControl.setValue([]);
        }
      });
  }
}

interface AnonymousProfileAppearanceForm {
  jobCategoryId: FormControl<number>;
  jobEngagements: FormControl<number[]>;
  preferredPositions: FormControl<string | null>;
  softSkills: FormControl<number[]>;
  itAreas: FormControl<number[]>;
  techStacks: FormControl<number[]>;
  workplaceTypes: FormControl<number[]>;
  cities: FormControl<number[]>;
}
