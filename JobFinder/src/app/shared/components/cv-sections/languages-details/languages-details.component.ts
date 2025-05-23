import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LanguageInfo } from '../../../models';
import { CvSectionModeEnum } from '../../../enums';

@Component({
  selector: 'jf-languages-details',
  templateUrl: './languages-details.component.html',
  standalone: false
})
export class LanguagesDetailsComponent {

  @Input() languagesData: LanguageInfo[] = [];
  @Input() mode: CvSectionModeEnum = CvSectionModeEnum.View;
  @Output() onEdit: EventEmitter<void> = new EventEmitter<void>();

  sectionMode: typeof CvSectionModeEnum = CvSectionModeEnum;

  onEditClicked = (): void => {
    this.onEdit.emit();
  }

  blurSection = (id: number): void => {
    const langugageInfo: LanguageInfo | undefined = this.languagesData.find(l => l.id === id);
    if (langugageInfo) {
      langugageInfo.includeInAnonymousProfile = langugageInfo.includeInAnonymousProfile === null
        ? false
        : !langugageInfo.includeInAnonymousProfile;
    }
  }
}
