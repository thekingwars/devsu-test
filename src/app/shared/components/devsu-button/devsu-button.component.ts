import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'devsu-button',
  templateUrl: './devsu-button.component.html',
  styleUrls: ['./devsu-button.component.scss'],
})
export class DevsuButtonComponent {
  @Input() label!: string;
  @Input() type: 'button' | 'submit' = 'button';
  @Input() color: 'primary' | 'secondary' | 'error' | 'success' = 'primary';
  @Input() disabled: boolean = false;
  @Input() loader: boolean = false;

  @Output() onClick = new EventEmitter<void>();

  onClickFunction() {
    this.onClick.next();
  }
}
