import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevsuModalComponent } from './devsu-modal.component';

describe('DevsuModalComponent', () => {
  let component: DevsuModalComponent;
  let fixture: ComponentFixture<DevsuModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DevsuModalComponent]
    });
    fixture = TestBed.createComponent(DevsuModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
