import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpsertProductComponent } from './upsert-product.component';

const routes: Routes = [
  {
    path: '',
    component: UpsertProductComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpsertProductRoutingModule {}
