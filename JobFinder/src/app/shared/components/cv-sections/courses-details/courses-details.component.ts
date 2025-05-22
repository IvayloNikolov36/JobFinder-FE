import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CourseCertificateInfo } from '../../../models';
import { CvSectionModeEnum } from '../../../enums';

@Component({
  selector: 'jf-courses-details',
  templateUrl: './courses-details.component.html',
  standalone: false
})
export class CoursesDetailsComponent {

  @Input() coursesData: CourseCertificateInfo[] = [];
  @Input() mode: CvSectionModeEnum = CvSectionModeEnum.View;
  @Output() onEdit: EventEmitter<void> = new EventEmitter<void>();

  sectionMode: typeof CvSectionModeEnum = CvSectionModeEnum;

  onEditClicked = (): void => {
    this.onEdit.emit();
  }

  blurSection = (id: number): void => {
    const courseInfo: CourseCertificateInfo | undefined = this.coursesData.find(c => c.id === id);
    if (courseInfo) {
      courseInfo.includeInAnonymousProfile = courseInfo.includeInAnonymousProfile === undefined
        ? false
        : !courseInfo.includeInAnonymousProfile;
    }
  }
}
