import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NomenclatureService } from '../../../core/services';
import { BasicModel } from '../../../core/models';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AnonymousProfileAppearance } from '../../models';

@Component({
  selector: 'jf-anonymous-profile-appearance',
  templateUrl: './anonymous-profile-appearance.component.html',
  standalone: false
})
export class AnonymousProfileAppearanceComponent implements OnInit {

  @Output() onAppearanceDataEmit: EventEmitter<AnonymousProfileAppearance> = new EventEmitter<AnonymousProfileAppearance>;

  jobCategories$!: Observable<BasicModel[]>;
  jobEngagements$!: Observable<BasicModel[]>;
  softSkills$!: Observable<BasicModel[]>;
  techStacks$!: Observable<BasicModel[]>;
  itAreas$!: Observable<BasicModel[]>;
  remoteJobPreferences$!: Observable<BasicModel[]>;

  form!: FormGroup;

  constructor(
    private nomenclatureService: NomenclatureService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.loadNomenclatureData();
  }

  submitAnonymousProfileAppearanceData = (): void => {
    this.onAppearanceDataEmit.emit(this.form.value as AnonymousProfileAppearance);
  }

  private initializeForm(): void {
    this.form = this.formBuilder.group({
      jobCategoryId: [null, Validators.required],
      jobEngagements: [[], Validators.required],
      preferredPositions: [null],
      softSkills: [[], Validators.required],
      itAreas: [[], Validators.required], // TODO: requred only if IT sector is selected
      techStacks: [[], Validators.required],
      remoteJobPreferenceId: [null, Validators.required]
    });
  }

  private loadNomenclatureData(): void {
    this.jobCategories$ = this.nomenclatureService.getJobCategories();
    this.jobEngagements$ = this.nomenclatureService.getJobEngagements();
    this.softSkills$ = this.nomenclatureService.getSoftSkills();
    this.techStacks$ = this.nomenclatureService.getTechStacks();
    this.itAreas$ = this.nomenclatureService.getITAreas();
    this.remoteJobPreferences$ = this.nomenclatureService.getRemoteJobPreferences();
  }
}
