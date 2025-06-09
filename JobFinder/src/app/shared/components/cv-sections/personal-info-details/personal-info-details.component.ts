import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { PersonalInfo } from '../../../models';
import { getFullName } from '../../../functions';
import { CvSectionModeEnum } from '../../../enums';

@Component({
  selector: 'jf-personal-info-details',
  templateUrl: './personal-info-details.component.html',
  standalone: false
})
export class PersonalInfoDetailsComponent implements OnChanges {

  @Input() personalInfo: PersonalInfo = {} as PersonalInfo;
  @Input() pictureUrl: string = '';
  @Input() mode: CvSectionModeEnum = CvSectionModeEnum.View;
  @Output() onEdit: EventEmitter<void> = new EventEmitter<void>();

  fullName: string = '';
  blurDetails: boolean = false;

  sectionMode: typeof CvSectionModeEnum = CvSectionModeEnum;

  ngOnChanges(): void {
    this.blurDetails = this.mode === CvSectionModeEnum.AnonymousProfileCreate;

    if (this.personalInfo) {
      this.fullName = getFullName(this.personalInfo);
    }
  }

  onEditClicked = (): void => {
    this.onEdit.emit();
  }
}
