import { Component, EventEmitter, Input, Output } from '@angular/core';
import { WorkExperienceInfo } from '../../../models';

@Component({
  selector: 'jf-work-experience-details',
  templateUrl: './work-experience-details.component.html',
  standalone: false
})
export class WorkExperienceDetailsComponent {

  @Input() workExperienceData: WorkExperienceInfo[] = [];
  @Input() viewOnly: boolean = true;
  @Output() onEdit: EventEmitter<void> = new EventEmitter<void>();

  editWorkExperienceData = (): void => {
    this.onEdit.emit();
  }
}
