import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LanguageInfo } from '../../../models';

@Component({
  selector: 'jf-languages-details',
  templateUrl: './languages-details.component.html',
  standalone: false
})
export class LanguagesDetailsComponent {

  @Input() languagesData: LanguageInfo[] = [];
  @Input() viewOnly: boolean = true;
  @Output() onEdit: EventEmitter<void> = new EventEmitter<void>();

  onEditClicked = (): void => {
    this.onEdit.emit();
  }
}
