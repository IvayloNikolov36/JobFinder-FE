import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourseCertificateInfo } from '../../../shared/models';

@Component({
  selector: 'jf-courses-certificates',
  templateUrl: './courses-certificates.component.html',
  standalone: false
})
export class CoursesCertificatesComponent implements OnInit {

  @Input() isEditMode: boolean = false;
  @Input() coursesInfoData: CourseCertificateInfo[] = [];
  @Output() emitCoursesData: EventEmitter<CourseCertificateInfo[]> = new EventEmitter<CourseCertificateInfo[]>();

  coursesForm!: FormGroup;
  readonly urlPattern: RegExp = /^(http(s)?:\/\/)(.+)$/;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initializeCoursesForm();
  }

  get coursesFormArray(): FormArray<FormGroup> {
    return this.coursesForm.controls['coursesArray'] as FormArray<FormGroup>;
  }

  addNewCourseInfo(): void {
    this.coursesFormArray.push(this.createCourseFormGroup());
  }

  removeLastCoursesFormGroup(): void {
    if (this.coursesFormArray.length === 1) {
      return;
    }
    this.coursesFormArray.removeAt(this.coursesFormArray.length - 1);
  }

  emitData(): void {
    const data: CourseCertificateInfo[] = this.coursesForm.value.coursesArray;
    this.emitCoursesData.emit(data);
  }

  private initializeCoursesForm(): void {
    const coursesArray: FormArray<any> = this.formBuilder.array([]);

    this.coursesForm = this.formBuilder.group({
      coursesArray: coursesArray
    });

    if (this.coursesInfoData.length > 0) {
      this.coursesInfoData.forEach((cs: CourseCertificateInfo) => {
        const formGroup: FormGroup<any> = this.createCourseFormGroup();
        formGroup.setValue(cs);
        coursesArray.push(formGroup);
      });
    } else {
      coursesArray.push(this.createCourseFormGroup());
    }
  }

  private createCourseFormGroup(): FormGroup<any> {
    return this.formBuilder.nonNullable.group({
      id: [0],
      courseName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      certificateUrl: ['', [Validators.required, Validators.pattern(this.urlPattern)]]
    });
  }
}
