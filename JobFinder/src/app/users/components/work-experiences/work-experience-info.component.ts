import { Component, EventEmitter, Input, input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BasicModel } from '../../../models';
import { WorkExperienceInfo } from '../../../shared/models';

@Component({
  selector: 'jf-work-experience-info',
  templateUrl: './work-experience-info.component.html',
  standalone: false
})
export class WorkExperienceInfoComponent implements OnInit {

  businessSectors = input.required<BasicModel[]>();
  @Input() isEditMode: boolean = false;
  @Input() workExperienceInfoData: WorkExperienceInfo[] = [];
  @Output() emitWorkExperiencesData: EventEmitter<WorkExperienceInfo[]> = new EventEmitter<WorkExperienceInfo[]>();

  workExpForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initializeForm();
  }

  get we(): FormArray<FormGroup> {
    return this.workExpForm.controls['workExperienceArray'] as FormArray<FormGroup>;
  }

  addWorkExperienceForm(): void {
    this.we.push(this.createWorkExperienceFormGroup());
  }

  removeWorkExperienceForm(): void {
    if (this.we.length === 1) {
      return;
    }
    this.we.removeAt(this.we.length - 1);
  }

  emitData(): void {
    const formData = this.workExpForm.value.workExperienceArray as WorkExperienceInfo[];
    const workExperienceData = formData.map((we: WorkExperienceInfo) => {
      return { ...we, additionalDetails: we.additionalDetails === '' ? null : we.additionalDetails };
    });
    this.emitWorkExperiencesData.emit(workExperienceData);
  }

  compareFn = (first: BasicModel, second: BasicModel): boolean => {
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
      id: [0],
      fromDate: [null, Validators.required],
      toDate: [null],
      jobTitle: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      organization: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      businessSector: [null, Validators.required],
      location: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      additionalDetails: [null, [Validators.minLength(20), Validators.maxLength(3000)]]
    });
  }
}
