import { TestBed } from '@angular/core/testing';
import { DevsuProductService } from './devsu-product.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Product } from '../../../@core/models/product.model';
import { catchError, of, tap, throwError } from 'rxjs';

describe('DevsuProductService', () => {
  let service: DevsuProductService;
  let formGroup: FormBuilder;
  let httpClientSpy: {
    get: jasmine.Spy;
    post: jasmine.Spy;
    delete: jasmine.Spy;
  };

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', [
      'get',
      'post',
      'delete',
    ]);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    TestBed.configureTestingModule({});
    formGroup = TestBed.inject(FormBuilder);
    service = new DevsuProductService(httpClientSpy as any, formGroup);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('must return a formGroup', () => {
    const formGroup = service.formProduct();

    expect(formGroup).toEqual(jasmine.any(FormGroup));
  });

  it('the formGroup must contain the following values', () => {
    const expectFormGroup = formGroup.group({
      id: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(10),
      ]),
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100),
      ]),
      description: new FormControl(null, [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(200),
      ]),
      logo: new FormControl(null, [Validators.required]),
      date_release: new FormControl(null, [Validators.required]),
      date_revision: new FormControl(null, [Validators.required]),
    });

    expectFormGroup.get('date_revision')?.disable();

    const formGroupService = service.formProduct();

    expect(expectFormGroup.value).toEqual(formGroupService.value);
  });

  it('should return expected products (HttpClient called once)', () => {
    const expectedProducts: Product[] = [
      {
        id: 'asdasd',
        name: 'asdasdasd',
        description: 'asdasdasdasdas',
        logo: 'asdasd',
        date_release: new Date(),
        date_revision: new Date(),
      },
    ];

    httpClientSpy.get.and.returnValue(of(expectedProducts));

    service
      .getProducts()
      .pipe(
        catchError((err) => {
          return throwError(fail);
        }),
        tap((products: Product[]) => {
          expect(products).toEqual(expectedProducts, 'expected products');
        }),
      )
      .subscribe();

    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

  it('should be create product', (done: DoneFn) => {
    const mockProductCreate = {
      id: 'asdasd',
      name: 'asdasdasd',
      description: 'asdasdasdasdas',
      logo: 'asdasd',
      date_release: new Date(),
      date_revision: new Date(),
    };

    httpClientSpy.post.and.returnValue(of(mockProductCreate));

    service
      .createProduct(mockProductCreate)
      .pipe(
        catchError((err) => throwError(fail)),
        tap((product) => {
          expect(product).toEqual(mockProductCreate, 'expected product');
          done();
        }),
      )
      .subscribe();

    expect(httpClientSpy.post.calls.count()).toBe(1, 'one call');
  });

  it('should delete product', () => {
    const mockProductId = 'asdasdee1';

    httpClientSpy.delete.and.returnValue(of('Product successfully removed'));

    service
      .deleteProduct(mockProductId)
      .pipe(
        catchError((err) => throwError(fail)),
        tap((product) => {
          expect(product).toEqual('Product successfully removed');
        }),
      )
      .subscribe();
  });
});
