import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CourseCertificateInfo } from '../../../models';

@Component({
  selector: 'jf-courses-details',
  templateUrl: './courses-details.component.html',
  standalone: false
})
export class CoursesDetailsComponent {

  @Input() coursesData: CourseCertificateInfo[] = [];
  @Input() viewOnly: boolean = true;
  @Output() onEdit: EventEmitter<void> = new EventEmitter<void>();

  onEditClicked = (): void => {
    this.onEdit.emit();
  }
}
