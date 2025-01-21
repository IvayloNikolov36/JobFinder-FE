import { Component, EventEmitter, Input, input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LanguageInfoInput } from '../../models/cv';
import { BasicModel } from '../../../models';

@Component({
  selector: 'jf-languages-info',
  templateUrl: './languages-info.component.html',
  standalone: false
})
export class LanguagesInfoComponent implements OnInit {

  languageTypes = input.required<BasicModel[]>();
  languageLevels = input.required<BasicModel[]>();
  @Input() isEditMode: boolean = false;
  @Input() languagesInfoData: LanguageInfoInput[] = [];
  @Output() emitLanguagesInfo = new EventEmitter<LanguageInfoInput[]>();

  languagesForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
    this.addForms();
  }

  get lf() {
    return this.languagesForm.controls;
  }

  get l() {
    return this.lf['languagesInfoArray'] as FormArray<FormGroup>;
  }

  addNewLanguageInfoForm(): FormGroup<any> {
    const formGroup: FormGroup<any> = this.formBuilder.group({
      id: [0, []],
      languageType: [{} as BasicModel, [Validators.required]],
      comprehensionLevel: [{} as BasicModel, [Validators.required]],
      speakingLevel: [{} as BasicModel, [Validators.required]],
      writingLevel: [{} as BasicModel, [Validators.required]]
    });

    this.l.push(formGroup);

    return formGroup;
  }

  removeLastLanguageInfoForm(): void {
    if (this.l.length === 1) {
      return;
    }
    this.l.removeAt(this.l.length - 1);
  }

  emitData(): void {
    this.emitLanguagesInfo.emit(this.languagesForm.value.languagesInfoArray as LanguageInfoInput[]);
  }

  compareFn = (first: BasicModel, second: BasicModel): boolean => {
    return first && second ? first.id === second.id : first === second;
  }

  private initializeForm(): void {
    this.languagesForm = this.formBuilder.group({
      languagesInfoArray: new FormArray<FormGroup>([])
    });
  }

  private addForms = (): void => {
    if (this.languagesInfoData.length > 0) {
      this.languagesInfoData.forEach((languagesInfoData: LanguageInfoInput) => {
        const formGroup: FormGroup<any> = this.addNewLanguageInfoForm();
        formGroup.setValue(languagesInfoData);
      });
    } else {
      this.addNewLanguageInfoForm();
    }
  }
}
