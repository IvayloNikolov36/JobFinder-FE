import { Component, EventEmitter, Input, input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BasicModel } from '../../../core/models';
import { WorkExperienceInfo } from '../../../shared/models';

@Component({
  selector: 'jf-work-experience-info',
  templateUrl: './work-experience-info.component.html',
  standalone: false
})
export class WorkExperienceInfoComponent implements OnInit {

  businessSectors = input.required<BasicModel<number>[]>();
  @Input() isEditMode: boolean = false;
  @Input() workExperienceInfoData: WorkExperienceInfo[] = [];
  @Output() emitWorkExperiencesData: EventEmitter<WorkExperienceInfo[]> = new EventEmitter<WorkExperienceInfo[]>();

  workExpForm!: FormGroup;

  openedPanel: number | undefined = 0;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initializeForm();
  }

  get we(): FormArray<FormGroup> {
    return this.workExpForm.controls['workExperienceArray'] as FormArray<FormGroup>;
  }

  openExpansionPanel(index: number): void {
    this.openedPanel = index;
  }

  addWorkExperienceForm(): void {
    this.we.push(this.createWorkExperienceFormGroup());
    this.openedPanel = this.we.length - 1;
  }

  removeWorkExperienceForm(formIndex: number): void {
    if (this.we.length === 1) {
      return;
    }
    this.we.removeAt(formIndex);
  }

  emitData(): void {
    const formData = this.workExpForm.value.workExperienceArray as WorkExperienceInfo[];
    const workExperienceData = formData.map((we: WorkExperienceInfo) => {
      return { ...we, additionalDetails: we.additionalDetails === '' ? null : we.additionalDetails };
    });
    this.emitWorkExperiencesData.emit(workExperienceData);
  }

  compareFn = (first: BasicModel<number>, second: BasicModel<number>): boolean => {
    return first && second ? first.id === second.id : first === second;
  }

  private initializeForm(): void {
    const workExperienceFormArray: FormArray<any> = this.formBuilder.array([]);

    this.workExpForm = this.formBuilder.group({
      workExperienceArray: workExperienceFormArray
    });

    if (this.workExperienceInfoData.length > 0) {
      this.workExperienceInfoData.forEach((we: WorkExperienceInfo) => {
        const workExperienceFormGroup: FormGroup<any> = this.createWorkExperienceFormGroup();
        workExperienceFormGroup.setValue(we);
        workExperienceFormArray.push(workExperienceFormGroup);
      });
    } else {
      workExperienceFormArray.push(this.createWorkExperienceFormGroup());
    }
  }

  private createWorkExperienceFormGroup(): FormGroup<any> {
    return this.formBuilder.group({
      fromDate: [null, Validators.required],
      toDate: [null],
      jobTitle: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      organization: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      businessSector: [null, Validators.required],
      location: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      additionalDetails: [null, [Validators.minLength(20), Validators.maxLength(3000)]],
      id: [0],
      includeInAnonymousProfile: [null],
      blurredStyle: [{}]
    });
  }
}
