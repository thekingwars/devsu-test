import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpsertProductComponent } from './upsert-product.component';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { DevsuButtonComponent } from '../../../../shared/components/devsu-button/devsu-button.component';
import { ReactiveFormsModule } from '@angular/forms';
import { parseISO } from 'date-fns';
import { Product } from '../../../../@core/models/product.model';
import { RouterTestingModule } from '@angular/router/testing';
import { DevsuProductService } from '../../Services/devsu-product.service';

class MockActivatedRoute {}

describe('UpsertProductComponent', () => {
  let component: UpsertProductComponent;
  let fixture: ComponentFixture<UpsertProductComponent>;
  const mockActivatedRoute = {
    params: of({ id: 1 }),
  };
  const mockData: Product = {
    id: 'asdasdee',
    name: 'asdasdasd',
    description: 'asdasdasdasdas',
    logo: 'asdasd',
    date_release: new Date(),
    date_revision: new Date(),
  };
  let router: Router;
  let devsuProductService: DevsuProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpsertProductComponent, DevsuButtonComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        DevsuProductService,
      ],
      imports: [HttpClientModule, ReactiveFormsModule, RouterTestingModule],
    });
    fixture = TestBed.createComponent(UpsertProductComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    devsuProductService = TestBed.inject(DevsuProductService);
    fixture.detectChanges();
  });

  describe('Initialization', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('addYear', () => {
    it('should return the date with one year added', () => {
      const inputDate = parseISO('2023-10-20');
      const expectedOutput = '2024-10-20';

      const result = component.addYear(inputDate);

      expect(result).toBe(expectedOutput);
    });
  });

  describe('Form updates', () => {
    it('should update the "date_revision" property of the form', () => {
      const fakeDate = '2023-10-20';

      component.formProduct.get('date_release')?.patchValue(fakeDate);
      component.formProduct.get('date_release')?.updateValueAndValidity();

      const dateRevision = component.formProduct.get('date_revision')?.value;

      expect(dateRevision).toBe('2024-10-20');
    });
  });

  describe('Form submission', () => {
    it('should call updateProduct() if haveUrlParam is true', () => {
      const haveUrlParam = true;

      spyOn(component, 'updateProduct');

      component.onsubmit(haveUrlParam);

      expect(component.updateProduct).toHaveBeenCalled();

      expect(component.loading()).toBeTrue();
    });

    it('should call createProduct() if haveUrlParam is false', () => {
      const haveUrlParam = false;

      spyOn(component, 'createProduct');

      component.onsubmit(haveUrlParam);

      expect(component.createProduct).toHaveBeenCalled();

      expect(component.loading()).toBeTrue();
    });
  });

  describe('upsertProduct', () => {
    it('should create a product and perform additional actions', async () => {
      const devsuProductServiceSpy = spyOn(
        devsuProductService,
        'createProduct',
      ).and.returnValue(of(mockData));

      component.formProduct = {
        get: jasmine.createSpy('get').and.returnValue({
          enable: jasmine.createSpy('enable'),
          disable: jasmine.createSpy('disable'),
        }),
        value: mockData,
      } as any;

      spyOn(component, 'resetForm');

      const navigateByUrlSpy = spyOn(router, 'navigateByUrl').and.stub();

      component.createProduct();

      expect(
        component.formProduct.get('date_revision')?.enable,
      ).toHaveBeenCalled();

      expect(devsuProductServiceSpy).toHaveBeenCalled();

      expect(
        component.formProduct.get('date_revision')?.disable,
      ).toHaveBeenCalled();

      expect(component.resetForm).toHaveBeenCalled();

      expect(navigateByUrlSpy).toHaveBeenCalledWith(
        '/devsu-panel/product-list',
      );
    });

    it('should update a product and perform additional actions', () => {
      const devsuProductServiceSpy = spyOn(
        devsuProductService,
        'updateProduct',
      ).and.returnValue(of(mockData));

      component.formProduct = {
        get: jasmine.createSpy('get').and.returnValue({
          enable: jasmine.createSpy('enable'),
          disable: jasmine.createSpy('disable'),
        }),
        value: mockData,
      } as any;

      spyOn(component, 'resetForm');

      const navigateByUrlSpy = spyOn(router, 'navigateByUrl').and.stub();

      component.updateProduct();

      expect(
        component.formProduct.get('date_revision')?.enable,
      ).toHaveBeenCalled();

      expect(component.formProduct.get('id')?.enable).toHaveBeenCalled();

      expect(devsuProductServiceSpy).toHaveBeenCalled();

      expect(
        component.formProduct.get('date_revision')?.disable,
      ).toHaveBeenCalled();

      expect(component.resetForm).toHaveBeenCalled();

      expect(navigateByUrlSpy).toHaveBeenCalledWith(
        '/devsu-panel/product-list',
      );
    });
  });
});
