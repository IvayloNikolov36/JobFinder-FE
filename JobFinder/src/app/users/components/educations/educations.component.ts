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
    this.initializeForm();
    this.addEducationsForms();
  }

  get edf() {
    return this.educationsForm.controls;
  }

  get ed() {
    return this.edf['educationsArray'] as FormArray<FormGroup>;
  }

  addNewEducationForm(): FormGroup<any> {

    const formGroup: FormGroup<any> = this.formBuilder.group({
      id: [0, []],
      fromDate: [Date.now, [Validators.required]],
      toDate: [Date.now, []],
      location: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      educationLevel: [{} as BasicModel, [Validators.required]],
      major: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      mainSubjects: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
      organization: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]]
    });

    this.ed.push(formGroup);

    return formGroup;
  }

  removeLastEducationForm(): void {
    if (this.ed.length === 1) {
      return;
    }
    this.ed.removeAt(this.ed.length - 1);
  }

  emitData(): void {
    this.emitEducationData.emit(this.educationsForm.value.educationsArray as Education[]);
  }

  compareFn = (first: BasicModel, second: BasicModel): boolean => {
    return first && second ? first.id === second.id : first === second;
  }

  private initializeForm(): void {
    this.educationsForm = this.formBuilder.group({
      educationsArray: new FormArray<FormGroup>([])
    });
  }

  private addEducationsForms = (): void => {
    if (this.educationsData.length > 0) {
      this.educationsData.forEach((educationData: Education) => {
        const formGroup: FormGroup<any> = this.addNewEducationForm();
        formGroup.setValue(educationData);
      });
    } else {
      this.addNewEducationForm();
    }
  }
}
