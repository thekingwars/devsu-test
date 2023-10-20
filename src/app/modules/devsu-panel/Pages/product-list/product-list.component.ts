import { Component, signal, WritableSignal } from '@angular/core';
import { DevsuProductService } from '../../Services/devsu-product.service';
import { Router } from '@angular/router';
import { BehaviorSubject, combineLatest, finalize, map, tap } from 'rxjs';
import { Product } from '../../../../@core/models/product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent {
  products$ = this.devsuProductService
    .getProducts()
    .pipe(tap(() => this.loading.set(false)));

  searchProductByName: WritableSignal<string> = signal('');

  loading = signal(true);

  showContextMenu = signal(false);

  showModal = signal(false);

  product: WritableSignal<Product | null> = signal(null);

  menuStyle = {
    position: 'none',
    'left.px': '0px',
    'top.px': '0px',
  };

  deleteProduct() {
    this.showModal.set(true);
  }

  cancelButtonModal() {
    this.showModal.set(false);
  }

  confirmButtonModal(productID: string, products: Product[]) {
    this.loading.set(true);

    this.devsuProductService
      .deleteProduct(productID)
      .pipe(
        finalize(() => {
          this.loading.set(false);

          const productIndex = products.findIndex(
            (product) => product.id === productID,
          );

          products.splice(productIndex, 1);

          alert('Product eleminado con exito');

          this.cancelButtonModal();
        }),
      )
      .subscribe();
  }

  async editProduct() {
    this.devsuProductService.product$.next(this.product()!);

    await this.router.navigateByUrl(
      `/devsu-panel/update-product/${this.product()!.id}`,
    );
  }

  searchProduct(event: any) {
    this.searchProductByName.set(event.target.value);
  }

  showMenu(e: any, product: Product) {
    this.showContextMenu.set(true);

    this.product.set(product);

    this.menuStyle = {
      position: 'absolute',
      'left.px': `${e.clientX - 150}`,
      'top.px': e.clientY,
    };
  }

  closeContextMenu() {
    this.showContextMenu.set(false);
  }

  async navigateCreateProduct() {
    await this.router.navigateByUrl('/devsu-panel/create-product');
  }

  constructor(
    private devsuProductService: DevsuProductService,
    private router: Router,
  ) {}
}
