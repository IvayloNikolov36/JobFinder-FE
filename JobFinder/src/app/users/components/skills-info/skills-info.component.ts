import { Component, EventEmitter, Input, input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SkillsInfo } from '../../models/cv';
import { BasicModel } from '../../../models';

@Component({
  selector: 'jf-skills-info',
  templateUrl: './skills-info.component.html',
  standalone: false
})
export class SkillsInfoComponent implements OnInit {

  drivingCategories = input.required<BasicModel[]>();
  @Input() isEditMode = false;
  @Input() skillsInfoData: SkillsInfo | null = null;
  @Output() emitSkillsData = new EventEmitter<SkillsInfo>();

  skillsForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  get sf() {
    return this.skillsForm.controls;
  }

  emitData(): void {
    const dataToEmit: SkillsInfo = {
      ...this.skillsForm.value as SkillsInfo,
    } as SkillsInfo;

    this.emitSkillsData.emit(dataToEmit);
  }

  compareFn = (first: BasicModel, second: BasicModel): boolean => {
    return first && second ? first.id === second.id : first === second;
  }

  private initializeForm(): void {

    this.skillsForm = this.formBuilder.group({
      id: [0, []],
      computerSkills: ['', [Validators.minLength(10), Validators.maxLength(1000)]],
      otherSkills: ['', [Validators.minLength(10), Validators.maxLength(500)]],
      hasManagedPeople: [false, []],
      drivingLicenseCategories: [[] as BasicModel[]]
    });

    if (this.skillsInfoData) {
      this.skillsForm.patchValue(this.skillsInfoData)
    }
  }
}
