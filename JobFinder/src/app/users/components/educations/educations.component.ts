import { Component, EventEmitter, input, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Education } from '../../models/cv';
import { BasicModel } from '../../../models';

@Component({
  selector: 'jf-educations',
  templateUrl: './educations.component.html',
  standalone: false
})
export class EducationsComponent implements OnInit {

  educationLevels = input.required<BasicModel[]>();
  @Input() isEditMode: boolean = false;
  @Input() educationsData: Education[] = [];
  @Output() emitEducationData = new EventEmitter<Education[]>();

  educationsForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initializeEducationsForm();
  }

  get educationsFormArray(): FormArray<FormGroup> {
    return this.educationsForm.controls['educationsArray'] as FormArray<FormGroup>;
  }

  addNewEducationForm(): void {
    this.educationsFormArray.push(this.createEducationFormGroup());
  }

  removeLastEducationForm(): void {
    if (this.educationsFormArray.length === 1) {
      return;
    }
    this.educationsFormArray.removeAt(this.educationsFormArray.length - 1);
  }

  emitData(): void {
    this.emitEducationData.emit(this.educationsForm.value.educationsArray as Education[]);
  }

  compareFn = (first: BasicModel, second: BasicModel): boolean => {
    return first && second ? first.id === second.id : first === second;
  }

  private initializeEducationsForm(): void {
    const educationsFormArray: FormArray<any> = this.formBuilder.array([]);

    this.educationsForm = this.formBuilder.group({
      educationsArray: educationsFormArray
    });

    if (this.educationsData.length > 0) {
      this.educationsData.forEach((educationData: Education) => {
        const educationInfoFormGroup: FormGroup<any> = this.createEducationFormGroup();
        educationInfoFormGroup.setValue(educationData);
        educationsFormArray.push(educationInfoFormGroup);
      });
    } else {
      educationsFormArray.push(this.createEducationFormGroup());
    }
  }

  private createEducationFormGroup(): FormGroup<any> {
    return this.formBuilder.group({
      id: [0],
      fromDate: [null, Validators.required],
      toDate: [null],
      location: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      educationLevel: [null, Validators.required],
      major: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      mainSubjects: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
      organization: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]]
    });
  }
}
