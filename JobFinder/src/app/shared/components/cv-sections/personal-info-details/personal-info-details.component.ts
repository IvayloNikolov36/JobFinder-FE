import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { PersonalDetails } from '../../../models';
import { getFullName } from '../../../functions';
import { CvSectionModeEnum } from '../../../enums';

@Component({
  selector: 'jf-personal-info-details',
  templateUrl: './personal-info-details.component.html',
  standalone: false
})
export class PersonalInfoDetailsComponent implements OnChanges {

  @Input() personalDetailsData: PersonalDetails = {} as PersonalDetails;
  @Input() pictureUrl: string = '';
  @Input() mode: CvSectionModeEnum = CvSectionModeEnum.View;
  @Output() onEdit: EventEmitter<void> = new EventEmitter<void>();

  fullName: string = '';
  blurDetails: boolean = false;

  sectionMode: typeof CvSectionModeEnum = CvSectionModeEnum;

  ngOnChanges(): void {
    this.blurDetails = this.mode === CvSectionModeEnum.AnonymousProfile;
    if (this.personalDetailsData) {
      this.fullName = getFullName(this.personalDetailsData);
    }
  }

  onEditClicked = (): void => {
    this.onEdit.emit();
  }
}
