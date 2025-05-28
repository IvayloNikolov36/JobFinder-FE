import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SkillsInfo } from '../../../models';
import { CvSectionModeEnum } from '../../../enums';

@Component({
  selector: 'jf-skills-details',
  templateUrl: './skills-details.component.html',
  standalone: false
})
export class SkillsDetailsComponent {

  @Input() skillsData: SkillsInfo = {} as SkillsInfo;
  @Input() mode: CvSectionModeEnum = CvSectionModeEnum.View;
  @Output() onEdit: EventEmitter<void> = new EventEmitter<void>();

  sectionMode: typeof CvSectionModeEnum = CvSectionModeEnum;

  onEditClicked = (): void => {
    this.onEdit.emit();
  }
}
