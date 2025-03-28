import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'jf-edit-button',
  templateUrl: './edit-button.component.html',
  standalone: false
})
export class EditButtonComponent {

  @Output() onClick: EventEmitter<void> = new EventEmitter<void>();

  onEditClicked = (): void => {
    this.onClick.emit();
  }
}
