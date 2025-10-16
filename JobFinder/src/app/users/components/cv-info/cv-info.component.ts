import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CvInfo } from '../../models/cv';

@Component({
  selector: 'jf-cv-info',
  templateUrl: './cv-info.component.html',
  standalone: false
})
export class CvInfoComponent implements OnInit {

  @Output() emitCvInfoData: EventEmitter<CvInfo> = new EventEmitter<CvInfo>();

  cvInfoForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  emitData(): void {
    this.emitCvInfoData.emit(this.cvInfoForm.value as CvInfo);
  }

  private initializeForm(): void {
    this.cvInfoForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]]
    });
  }
}
