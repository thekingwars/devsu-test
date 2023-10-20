import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevsuButtonComponent } from './devsu-button.component';

describe('DevsuButtonComponent', () => {
  let component: DevsuButtonComponent;
  let fixture: ComponentFixture<DevsuButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DevsuButtonComponent]
    });
    fixture = TestBed.createComponent(DevsuButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
