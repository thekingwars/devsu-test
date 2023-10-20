import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../../@core/models/product.model';

@Component({
  selector: 'devsu-modal',
  templateUrl: './devsu-modal.component.html',
  styleUrls: ['./devsu-modal.component.scss'],
})
export class DevsuModalComponent {
  @Input() title: string = '';
  @Input() product!: Product;
  @Input() loading: boolean = false;

  @Output() onClickConfirm = new EventEmitter<string>();
  @Output() onClickCancel = new EventEmitter<void>();

  onClickCancelFunction() {
    this.onClickCancel.next();
  }

  onClickConfirmFunction(product: Product) {
    this.onClickConfirm.next(product.id);
  }
}
