import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EducationInfo } from '../../../models';
import { CvSectionModeEnum } from '../../../enums';

@Component({
  selector: 'jf-education-details',
  templateUrl: './education-details.component.html',
  standalone: false
})
export class EducationDetailsComponent {

  @Input() educationData: EducationInfo[] = [];
  @Input() mode: CvSectionModeEnum = CvSectionModeEnum.View;
  @Output() onEdit: EventEmitter<void> = new EventEmitter<void>();

  sectionMode: typeof CvSectionModeEnum = CvSectionModeEnum;

  editEducationData = (): void => {
    this.onEdit.emit();
  }

  blurSection = (id: number): void => {
    const education: EducationInfo | undefined = this.educationData.find(e => e.id === id);
    if (education) {
      education.includeInAnonymousProfile = education.includeInAnonymousProfile === null
        ? false
        : !education.includeInAnonymousProfile;
    }
  }
}
