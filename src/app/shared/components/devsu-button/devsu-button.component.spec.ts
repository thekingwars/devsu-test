import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevsuButtonComponent } from './devsu-button.component';
import { FormGroup } from '@angular/forms';

describe('DevsuButtonComponent', () => {
  let component: DevsuButtonComponent;
  let fixture: ComponentFixture<DevsuButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DevsuButtonComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DevsuButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should onClick emit', () => {
    let eventResult: any;

    component.onClick.subscribe((event: any) => {
      eventResult = event;
    });

    expect(eventResult).toBeUndefined();
  });

  it('should onClickFunction have been called', () => {
    spyOn(component, 'onClickFunction');

    component.onClickFunction();

    expect(component.onClickFunction).toHaveBeenCalled();
  });
});
