import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'devsu-panel',
    children: [
      {
        path: 'product-list',
        loadChildren: () =>
          import(
            './modules/devsu-panel/Pages/product-list/product-list.module'
          ).then((m) => m.ProductListModule),
      },
      {
        path: 'create-product',
        loadChildren: () =>
          import(
            './modules/devsu-panel/Pages/upsert-product/upsert-product.module'
          ).then((m) => m.UpsertProductModule),
      },
      {
        path: 'update-product/:id',
        loadChildren: () =>
          import(
            './modules/devsu-panel/Pages/upsert-product/upsert-product.module'
          ).then((m) => m.UpsertProductModule),
      },
      {
        path: '**',
        loadChildren: () =>
          import('./modules/not-found/Pages/not-found/not-found.module').then(
            (m) => m.NotFoundModule,
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'devsu-panel/product-list',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
