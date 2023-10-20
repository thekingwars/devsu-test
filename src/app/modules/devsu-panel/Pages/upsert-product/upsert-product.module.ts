import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpsertProductComponent } from './upsert-product.component';
import { UpsertProductRoutingModule } from './upsert-product-routing.module';
import { DevsuButtonModule } from '../../../../shared/components/devsu-button/devsu-button.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [UpsertProductComponent],
  imports: [
    CommonModule,
    UpsertProductRoutingModule,
    DevsuButtonModule,
    ReactiveFormsModule,
  ],
})
export class UpsertProductModule {}
