import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListComponent } from './product-list.component';
import { HttpClientModule } from '@angular/common/http';
import { DevsuButtonComponent } from '../../../../shared/components/devsu-button/devsu-button.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { Product } from '../../../../@core/models/product.model';
import { DevsuProductService } from '../../Services/devsu-product.service';
import { of } from 'rxjs';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let router: Router;
  const mockData: Product = {
    id: 'asdasdee',
    name: 'asdasdasd',
    description: 'asdasdasdasdas',
    logo: 'asdasd',
    date_release: new Date(),
    date_revision: new Date(),
  };
  let devsuProductService: DevsuProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule],
      providers: [DevsuProductService],
      declarations: [ProductListComponent, DevsuButtonComponent],
    });
    fixture = TestBed.createComponent(ProductListComponent);
    router = TestBed.inject(Router);
    devsuProductService = TestBed.inject(DevsuProductService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Initialization', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('deleteProduct', () => {
    it('should deleteProduct called', () => {
      spyOn(component, 'deleteProduct');

      component.deleteProduct();

      expect(component.deleteProduct).toHaveBeenCalled();
    });

    it('should deleteProduct execute showModal', () => {
      expect(component.showModal()).toBeFalse();

      component.deleteProduct();

      expect(component.showModal()).toBeTrue();
    });
  });

  describe('cancelButtonModal', () => {
    it('should cancelButtonModal called', () => {
      spyOn(component, 'cancelButtonModal');

      component.cancelButtonModal();

      expect(component.cancelButtonModal).toHaveBeenCalled();
    });

    it('should cancelButtonModal execute showModal', () => {
      component.cancelButtonModal();

      expect(component.showModal()).toBeFalse();
    });
  });

  describe('closeContextMenu', () => {
    it('should closeContextMenu execute showContextMenu', () => {
      component.closeContextMenu();

      expect(component.showContextMenu()).toBeFalse();
    });
  });

  describe('navigateCreateProduct', () => {
    it('should navigate to createProduct', async () => {
      const navigateByUrlSpy = spyOn(router, 'navigateByUrl').and.stub();

      await component.navigateCreateProduct();

      expect(navigateByUrlSpy).toHaveBeenCalledWith(
        '/devsu-panel/create-product',
      );
    });
  });

  describe('showMenu', () => {
    it('should display the menu with the correct product and style', () => {
      const mockEvent = { clientX: 200, clientY: '300' };

      component.showMenu(mockEvent, mockData);

      expect(component.showContextMenu()).toBeTrue();
      expect(component.product()).toEqual(mockData);

      const expectedMenuStyle = {
        position: 'absolute',
        'left.px': `${mockEvent.clientX - 150}`,
        'top.px': mockEvent.clientY,
      };
      expect(component.menuStyle).toEqual(expectedMenuStyle);
    });
  });

  describe('searchProduct', () => {
    it('should search for the product by name', () => {
      const mockEvent = { target: { value: 'Producto de ejemplo' } };

      component.searchProduct(mockEvent);

      expect(component.searchProductByName()).toBe(mockEvent.target.value);
    });
  });

  describe('confirmButtonModal', () => {
    it('should remove the product and update the product list', () => {
      const mockProductID = mockData.id;
      const mockProducts: Product[] = [mockData];

      spyOn(component.loading, 'set').and.stub();
      spyOn(devsuProductService, 'deleteProduct').and.returnValue(
        of(mockProductID),
      );
      spyOn(window, 'alert').and.stub();
      spyOn(component, 'cancelButtonModal').and.stub();

      component.confirmButtonModal(mockProductID, mockProducts);

      expect(component.loading.set).toHaveBeenCalledWith(true);
      expect(devsuProductService.deleteProduct).toHaveBeenCalledWith(
        mockProductID,
      );
      expect(component.loading.set).toHaveBeenCalledWith(false);
      expect(mockProducts.length).toBe(0);
      expect(window.alert).toHaveBeenCalledWith('Product eleminado con exito');
      expect(component.cancelButtonModal).toHaveBeenCalled();
    });
  });
});
