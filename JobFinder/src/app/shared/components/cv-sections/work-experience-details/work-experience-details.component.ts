import { Component, EventEmitter, Input, Output } from '@angular/core';
import { WorkExperienceInfo } from '../../../models';
import { CvSectionModeEnum } from '../../../enums';

@Component({
  selector: 'jf-work-experience-details',
  templateUrl: './work-experience-details.component.html',
  standalone: false
})
export class WorkExperienceDetailsComponent {

  @Input() workExperienceData: WorkExperienceInfo[] = [];
  @Input() mode: CvSectionModeEnum = CvSectionModeEnum.View;
  @Output() onEdit: EventEmitter<void> = new EventEmitter<void>();

  sectionMode: typeof CvSectionModeEnum = CvSectionModeEnum;

  editWorkExperienceData = (): void => {
    this.onEdit.emit();
  }

  blurSection = (id: number): void => {
    const workExpInfo: WorkExperienceInfo | undefined = this.workExperienceData.find(we => we.id === id);
    if (workExpInfo) {
      workExpInfo.includeInAnonymousProfile = workExpInfo.includeInAnonymousProfile === null
        ? false
        : !workExpInfo.includeInAnonymousProfile;
    }
  }
}
