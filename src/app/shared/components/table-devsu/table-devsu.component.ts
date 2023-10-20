import { Component, ContentChild, Input, TemplateRef } from '@angular/core';
import { Product } from '../../../@core/models/product.model';

@Component({
  selector: 'devsu-table',
  templateUrl: './table-devsu.component.html',
  styleUrls: ['./table-devsu.component.scss'],
})
export class TableDevsuComponent {
  @Input({ required: true }) values: any[] = [];
  @Input() rowsPerPageOptions: number[] = [];

  rows = 5;

  @ContentChild('tablaBody', { static: false })
  tablaBodyTemplate!: TemplateRef<any>;

  trackByFn(index: number, item: Product) {
    return item.id;
  }
}
