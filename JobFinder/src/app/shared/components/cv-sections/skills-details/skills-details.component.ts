import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SkillsInfo } from '../../../models';

@Component({
  selector: 'jf-skills-details',
  templateUrl: './skills-details.component.html',
  standalone: false
})
export class SkillsDetailsComponent {

  @Input() skillsData: SkillsInfo = {} as SkillsInfo;
  @Input() viewOnly: boolean = true;
  @Output() onEdit: EventEmitter<void> = new EventEmitter<void>();

  onEditClicked = (): void => {
    this.onEdit.emit();
  }
}
