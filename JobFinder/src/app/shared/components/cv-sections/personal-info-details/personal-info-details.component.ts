import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { PersonalDetails } from '../../../models';

@Component({
  selector: 'jf-personal-info-details',
  templateUrl: './personal-info-details.component.html',
  standalone: false
})
export class PersonalInfoDetailsComponent implements OnChanges {

  @Input() personalDetailsData: PersonalDetails = {} as PersonalDetails;
  @Input() pictureUrl: string = '';
  @Input() viewOnly: boolean = true;
  @Output() onEdit: EventEmitter<void> = new EventEmitter<void>();
  
  fullName: string = '';

  ngOnChanges(): void {
    if (this.personalDetailsData) {
      this.fullName = this.getFullName(this.personalDetailsData);
    } 
  }

  onEditClicked = (): void => {
    this.onEdit.emit();
  }

  private getFullName = (details: PersonalDetails): string => {
    return `${details.firstName} ${details.middleName} ${details.lastName}`;
  }
}
