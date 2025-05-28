import { Component, EventEmitter, Input, input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BasicModel } from '../../../core/models';
import { LanguageInfo } from '../../../shared/models';

@Component({
  selector: 'jf-languages-info',
  templateUrl: './languages-info.component.html',
  standalone: false
})
export class LanguagesInfoComponent implements OnInit {

  languageTypes = input.required<BasicModel[]>();
  languageLevels = input.required<BasicModel[]>();
  @Input() isEditMode: boolean = false;
  @Input() languagesInfoData: LanguageInfo[] = [];
  @Output() emitLanguagesInfo = new EventEmitter<LanguageInfo[]>();

  languagesForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initializeLanguagesInfoForm();
  }

  get languagesInfoFormArray(): FormArray<FormGroup> {
    return this.languagesForm.controls['languagesInfoArray'] as FormArray<FormGroup>;
  }

  addNewLanguageInfoForm(): void {
    this.languagesInfoFormArray.push(this.createLanguageInfoFormGroup());
  }

  removeLastLanguageInfoForm(): void {
    if (this.languagesInfoFormArray.length === 1) {
      return;
    }
    this.languagesInfoFormArray.removeAt(this.languagesInfoFormArray.length - 1);
  }

  emitData(): void {
    this.emitLanguagesInfo.emit(this.languagesForm.value.languagesInfoArray as LanguageInfo[]);
  }

  compareFn = (first: BasicModel, second: BasicModel): boolean => {
    return first && second ? first.id === second.id : first === second;
  }

  private initializeLanguagesInfoForm(): void {
    const languagesFormArray: FormArray = this.formBuilder.array([]);

    this.languagesForm = this.formBuilder.group({
      languagesInfoArray: languagesFormArray
    });

    if (this.languagesInfoData.length > 0) {
      this.languagesInfoData.forEach((languagesInfoData: LanguageInfo) => {
        const languageInfoFormGroup: FormGroup<any> = this.createLanguageInfoFormGroup();
        languageInfoFormGroup.setValue(languagesInfoData);
        languagesFormArray.push(languageInfoFormGroup);
      });
    } else {
      languagesFormArray.push(this.createLanguageInfoFormGroup());
    }
  }

  private createLanguageInfoFormGroup(): FormGroup<any> {
    return this.formBuilder.group({
      id: [0],
      languageType: [null, Validators.required],
      comprehensionLevel: [null, Validators.required],
      speakingLevel: [null, Validators.required],
      writingLevel: [null, Validators.required],
      includeInAnonymousProfile: [null]
    });
  }
}
