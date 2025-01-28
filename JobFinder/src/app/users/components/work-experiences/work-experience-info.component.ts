import { Component, EventEmitter, Input, input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WorkExperience } from '../../models/cv';
import { BasicModel } from '../../../models';

@Component({
  selector: 'jf-work-experience-info',
  templateUrl: './work-experience-info.component.html',
  standalone: false
})
export class WorkExperienceInfoComponent implements OnInit {

  businessSectors = input.required<BasicModel[]>();
  @Input() isEditMode: boolean = false;
  @Input() workExperienceInfoData: WorkExperience[] = [];
  @Output() emitWorkExperiencesData: EventEmitter<WorkExperience[]> = new EventEmitter<WorkExperience[]>();

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
    this.emitWorkExperiencesData.emit(this.workExpForm.value.workExperienceArray as WorkExperience[]);
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
      this.workExperienceInfoData.forEach((we: WorkExperience) => {
        const workExperienceFormGroup: FormGroup<any> = this.createWorkExperienceFormGroup();
        workExperienceFormGroup.controls['additionalDetails'].valueChanges
          .subscribe((value: string) => {
            if (value === '') {
              workExperienceFormGroup.controls['additionalDetails'].setValue(null);
            }
          });
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
