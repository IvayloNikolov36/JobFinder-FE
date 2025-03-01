import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EducationInfo } from '../../../models';

@Component({
  selector: 'jf-education-details',
  templateUrl: './education-details.component.html',
  standalone: false
})
export class EducationDetailsComponent {
  
  @Input() educationData: EducationInfo[] = [];
  @Input() viewOnly: boolean = true;
  @Output() onEdit: EventEmitter<void> = new EventEmitter<void>();

  editEducationData = (): void => {
    this.onEdit.emit();
  }
}
