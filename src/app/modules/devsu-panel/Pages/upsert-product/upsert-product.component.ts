import { Component, signal, OnDestroy } from '@angular/core';
import { DevsuProductService } from '../../Services/devsu-product.service';
import { filter, finalize, map, tap, withLatestFrom } from 'rxjs';
import { ErrorFormMessage } from '../../../../@core/utils/errorForm.util';
import { ActivatedRoute, Router } from '@angular/router';
import { addYears, format, parseISO } from 'date-fns';

@Component({
  selector: 'app-upsert-product',
  templateUrl: './upsert-product.component.html',
  styleUrls: ['./upsert-product.component.scss'],
})
export class UpsertProductComponent
  extends ErrorFormMessage
  implements OnDestroy
{
  loading = signal(false);

  formProduct = this.devsuProductService.formProduct();

  patchForm$ = this.devsuProductService.getProducts().pipe(
    withLatestFrom(this.activatedRoute.params),
    filter(([product, params]) => !!params?.['id']),
    tap(([products, params]) => {
      this.formProduct.get('id')?.disable();
      const product = products.find((product) => product.id === params['id']);
      this.formProduct.patchValue({
        ...product!,
        date_release: new Date(product!.date_release)
          .toISOString()
          .split('T')[0],
        date_revision: new Date(product!.date_revision)
          .toISOString()
          .split('T')[0],
      });
    }),
  );

  haveUrlParam$ = this.activatedRoute.params.pipe(
    map((param: any) => !!param?.id),
  );

  minDate = new Date().toISOString().split('T')[0];

  patchDateRevision$ = this.formProduct.get('date_release')?.valueChanges.pipe(
    tap((date) => {
      const dateRevision = this.addYear(parseISO(date));

      this.formProduct.get('date_revision')?.patchValue(dateRevision);
    }),
  );

  addYear(date: Date): string {
    const newDate = addYears(date, 1);

    return format(newDate, 'yyyy-MM-dd');
  }

  disableInput(e: any) {
    e.preventDefault();
  }

  resetForm() {
    this.formProduct.reset();
  }

  onsubmit(haveUrlParam: boolean) {
    this.loading.set(true);

    haveUrlParam ? this.updateProduct() : this.createProduct();
  }

  createProduct() {
    this.formProduct.get('date_revision')?.enable();

    this.devsuProductService
      .createProduct(this.formProduct.value)
      .pipe(
        finalize(() => this.loading.set(false)),
        tap(async (e) => {
          this.resetForm();
          this.formProduct.get('date_revision')?.disable();

          alert('Usuario creado con exito');

          await this.router.navigateByUrl('/devsu-panel/product-list');
        }),
      )
      .subscribe();
  }

  updateProduct() {
    this.formProduct.get('date_revision')?.enable();
    this.formProduct.get('id')?.enable();

    this.devsuProductService
      .updateProduct(this.formProduct.value)
      .pipe(
        finalize(() => this.loading.set(false)),
        tap(async (e) => {
          this.resetForm();
          this.formProduct.get('date_revision')?.disable();

          alert('Usuario actualizado con exito');

          await this.router.navigateByUrl('/devsu-panel/product-list');
        }),
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.devsuProductService.product$.next(null);
  }

  constructor(
    private devsuProductService: DevsuProductService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    super();
  }
}
