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
    this.addForms();
  }

  get f() {
    return this.workExpForm.controls;
  }

  get we() {
    return this.f['weArray'] as FormArray<FormGroup>;
  }

  addWorkExperienceForm(): FormGroup<any> {
    const formGroup: FormGroup<any> = this.formBuilder.group({
      id: [0, []],
      fromDate: [Date.now, [Validators.required]],
      toDate: [Date.now, []],
      jobTitle: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      organization: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      businessSector: [{} as BasicModel, [Validators.required]],
      location: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      additionalDetails: ['', [Validators.minLength(20), Validators.maxLength(3000)]]
    });

    this.we.push(formGroup);

    return formGroup;
  }

  removeWorkExperienceForm(): void {
    if (this.we.length === 1) {
      return;
    }
    this.we.removeAt(this.we.length - 1);
  }

  emitData(): void {
    this.emitWorkExperiencesData.emit(this.workExpForm.value.weArray as WorkExperience[]);
  }

  compareFn = (first: BasicModel, second: BasicModel): boolean => {
    return first && second ? first.id === second.id : first === second;
  }

  private initializeForm(): void {
    this.workExpForm = this.formBuilder.group({
      weArray: new FormArray<FormGroup>([])
    });
  }

  private addForms = (): void => {
    if (this.workExperienceInfoData.length > 0) {
      this.workExperienceInfoData.forEach((we: WorkExperience) => {
        const formGroup: FormGroup<any> = this.addWorkExperienceForm();
        formGroup.setValue(we);
      });
    } else {
      this.addWorkExperienceForm();
    }
  }
}
