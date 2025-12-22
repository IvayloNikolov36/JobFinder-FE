import { Component, computed, EventEmitter, OnInit, Output, Signal, signal } from '@angular/core';
import { form } from '@angular/forms/signals';
import { NomenclatureService } from '../../../core/services';
import { BasicModel } from '../../../core/models';
import { Observable } from 'rxjs';
import { AnonymousProfileAppearance, initalData, ITCategoryId, ProfileAppearanceModel, profileAppearanceSchema } from '../../models';

@Component({
  selector: 'jf-anonymous-profile-appearance',
  templateUrl: './anonymous-profile-appearance.component.html',
  standalone: false
})
export class AnonymousProfileAppearanceComponent implements OnInit {

  @Output() onAppearanceDataEmit: EventEmitter<AnonymousProfileAppearance> = new EventEmitter<AnonymousProfileAppearance>;

  readonly profileAppearanceModel = signal<ProfileAppearanceModel>(initalData);
  readonly profileAppearanceForm = form(this.profileAppearanceModel, profileAppearanceSchema);
  readonly showITcontrols: Signal<boolean> = computed(() =>
    this.profileAppearanceForm.jobCategoryId().value() === ITCategoryId);

  jobCategories$!: Observable<BasicModel<number>[]>;
  jobEngagements$!: Observable<BasicModel<number>[]>;
  softSkills$!: Observable<BasicModel<number>[]>;
  techStacks$!: Observable<BasicModel<number>[]>;
  itAreas$!: Observable<BasicModel<number>[]>;
  workplaceTypes$!: Observable<BasicModel<number>[]>;
  cities$!: Observable<BasicModel<number>[]>;

  constructor(private nomenclatureService: NomenclatureService) { }

  ngOnInit(): void {
    this.loadNomenclatureData();
    this.profileAppearanceForm.jobCategoryId()
  }

  submitAnonymousProfileAppearanceData = (): void => {
    const formData: ProfileAppearanceModel = this.profileAppearanceForm().value();

    // TODO: think about cleverer approach

    const dataToEmit = { ...formData } as AnonymousProfileAppearance;
    if (dataToEmit.preferredPositions?.length === 0) {
      dataToEmit.preferredPositions = null;
    }
    if (dataToEmit.jobCategoryId !== ITCategoryId) {
      dataToEmit.itAreas = [];
      dataToEmit.techStacks = [];
    }

    this.onAppearanceDataEmit.emit(dataToEmit);
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
}