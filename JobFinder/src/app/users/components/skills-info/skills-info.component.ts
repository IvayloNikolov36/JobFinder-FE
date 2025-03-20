import { Component, EventEmitter, Input, input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BasicModel } from '../../../models';
import { SkillsInfo } from '../../../shared/models';

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
    const formData = this.skillsForm.value as SkillsInfo;

    const dataToEmit: SkillsInfo = {
      ...formData,
      computerSkills: formData.computerSkills === '' ? null : formData.computerSkills,
      otherSkills: formData.otherSkills === '' ? null : formData.otherSkills,
    };

    this.emitSkillsData.emit(dataToEmit);
  }

  compareFn = (first: BasicModel, second: BasicModel): boolean => {
    return first && second ? first.id === second.id : first === second;
  }

  private initializeForm(): void {

    this.skillsForm = this.formBuilder.group({
      id: [0, []],
      computerSkills: [null, [Validators.minLength(10), Validators.maxLength(1000)]],
      otherSkills: [null, [Validators.minLength(10), Validators.maxLength(500)]],
      hasManagedPeople: [false, []],
      drivingLicenseCategories: [[] as BasicModel[]]
    });

    if (this.skillsInfoData) {
      this.skillsForm.patchValue(this.skillsInfoData)
    }
  }
}
