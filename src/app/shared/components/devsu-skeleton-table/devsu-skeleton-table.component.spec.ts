import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevsuSkeletonTableComponent } from './devsu-skeleton-table.component';

describe('DevsuSkeletonTableComponent', () => {
  let component: DevsuSkeletonTableComponent;
  let fixture: ComponentFixture<DevsuSkeletonTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DevsuSkeletonTableComponent]
    });
    fixture = TestBed.createComponent(DevsuSkeletonTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
