import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { WorkExperienceInfo } from '../../../models';
import { CvSectionModeEnum } from '../../../enums';

@Component({
  selector: 'jf-work-experience-details',
  templateUrl: './work-experience-details.component.html',
  standalone: false
})
export class WorkExperienceDetailsComponent implements OnChanges {

  @Input() workExperienceData: WorkExperienceInfo[] = [];
  @Input() mode: CvSectionModeEnum = CvSectionModeEnum.View;
  @Output() onEdit: EventEmitter<void> = new EventEmitter<void>();

  sectionMode: typeof CvSectionModeEnum = CvSectionModeEnum;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['mode'] && this.workExperienceData) {
      this.setItemsBlur(this.workExperienceData);
    }
  }

  editWorkExperienceData = (): void => {
    this.onEdit.emit();
  }

  blurSection = (id: number): void => {
    const workExpInfo: WorkExperienceInfo | undefined = this.workExperienceData.find(we => we.id === id);
    if (workExpInfo) {
      workExpInfo.includeInAnonymousProfile = workExpInfo.includeInAnonymousProfile === null
        ? false
        : !workExpInfo.includeInAnonymousProfile;
      this.setItemsBlur([workExpInfo]);
    }
  }

  setItemsBlur = (items: WorkExperienceInfo[]): void => {
    items.forEach(item => {
      if (this.mode === this.sectionMode.AnonymousProfileCreate
        && item.includeInAnonymousProfile === false) {
        item.blurredStyle = {
          'cv-section-blur': true
        };
      } else {
        item.blurredStyle = {};
      }
    });
  }
}
