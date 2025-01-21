import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourseCertificate } from '../../models/cv';

@Component({
  selector: 'jf-courses-certificates',
  templateUrl: './courses-certificates.component.html',
  standalone: false
})
export class CoursesCertificatesComponent implements OnInit {

  @Input() isEditMode: boolean = false;
  @Input() coursesInfoData: CourseCertificate[] = [];
  @Output() emitCoursesData: EventEmitter<CourseCertificate[]> = new EventEmitter<CourseCertificate[]>();

  coursesForm!: FormGroup;
  readonly urlPattern: RegExp = /^(http(s)?:\/\/)(.+)$/;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initializeCoursesForm();
    this.addForms();
  }

  get cf() {
    return this.coursesForm.controls;
  }

  get c() {
    return this.cf['coursesArray'] as FormArray<FormGroup>;
  }

  addNewCoursesFrom(): FormGroup<any> {
    const formGroup: FormGroup<any> = this.formBuilder.group({
      id: [0, []],
      courseName: ['', [Validators.minLength(5), Validators.maxLength(100)]],
      certificateUrl: ['', [Validators.pattern(this.urlPattern)]]
    });

    this.c.push(formGroup);

    return formGroup;
  }

  removeLastCoursesForm(): void {
    if (this.c.length === 1) {
      return;
    }
    this.c.removeAt(this.c.length - 1);
  }

  emitData(): void {
    const data: CourseCertificate[] = this.coursesForm.value.coursesArray;
    this.emitCoursesData.emit(data);
  }

  private initializeCoursesForm(): void {
    this.coursesForm = this.formBuilder.group({
      coursesArray: new FormArray<FormGroup>([])
    });
  }

  private addForms = (): void => {
    if (this.coursesInfoData.length > 0) {
      this.coursesInfoData.forEach((cs: CourseCertificate) => {
        const formGroup: FormGroup<any> = this.addNewCoursesFrom();
        formGroup.setValue(cs);
      });
    } else {
      this.addNewCoursesFrom();
    }
  }
}
