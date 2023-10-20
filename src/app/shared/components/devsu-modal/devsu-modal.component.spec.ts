import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevsuModalComponent } from './devsu-modal.component';
import { Product } from '../../../@core/models/product.model';
import { DevsuButtonComponent } from '../devsu-button/devsu-button.component';

describe('DevsuModalComponent', () => {
  let component: DevsuModalComponent;
  let fixture: ComponentFixture<DevsuModalComponent>;
  const mockData: Product = {
    id: 'asdasdee',
    name: 'asdasdasd',
    description: 'asdasdasdasdas',
    logo: 'asdasd',
    date_release: new Date(),
    date_revision: new Date(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DevsuModalComponent, DevsuButtonComponent],
    });
    fixture = TestBed.createComponent(DevsuModalComponent);
    component = fixture.componentInstance;
    component.product = mockData;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should onClickConfirm emit', () => {
  //   let eventResult: any;
  //
  //   component.onClickConfirm.next(mockData.id);
  //
  //   console.log('ehehehe');
  //   component.onClickConfirm.subscribe((event: any) => {
  //     eventResult = event;
  //   });
  //
  //   expect(eventResult).toBeUndefined();
  // });
  //
  // it('should onClickCancel emit', () => {
  //   let eventResult: any;
  //
  //   component.onClickCancel.subscribe((event: any) => {
  //     eventResult = event;
  //   });
  //
  //   expect(eventResult).toBeUndefined();
  // });

  it('should onClickCancelFunction have been called', () => {
    spyOn(component, 'onClickCancelFunction');

    component.onClickCancelFunction();

    expect(component.onClickCancelFunction).toHaveBeenCalled();
  });

  it('should onClickConfirmFunction have been called', () => {
    spyOn(component, 'onClickConfirmFunction');

    component.onClickConfirmFunction(mockData);

    expect(component.onClickConfirmFunction).toHaveBeenCalledWith(mockData);
  });
});
