import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'jf-edit-button',
  standalone: false,
  templateUrl: './edit-button.component.html',
  styleUrl: './edit-button.component.css'
})
export class EditButtonComponent {

  @Output() onClick: EventEmitter<void> = new EventEmitter<void>();

  onEditClicked = (): void => {
    this.onClick.emit();
  }
}
