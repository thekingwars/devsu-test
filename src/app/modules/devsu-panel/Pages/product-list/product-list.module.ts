import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductListRoutingModule } from './product-list-routing.module';
import { ProductListComponent } from './product-list.component';
import { TableDevsuModule } from '../../../../shared/components/table-devsu/table-devsu.module';
import { DevsuButtonModule } from '../../../../shared/components/devsu-button/devsu-button.module';
import { DevsuModalModule } from '../../../../shared/components/devsu-modal/devsu-modal.module';

@NgModule({
  declarations: [ProductListComponent],
  imports: [
    CommonModule,
    ProductListRoutingModule,
    TableDevsuModule,
    DevsuButtonModule,
    DevsuModalModule,
  ],
})
export class ProductListModule {}
