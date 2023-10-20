import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableDevsuComponent } from './table-devsu.component';

describe('TableDevsuComponent', () => {
  let component: TableDevsuComponent;
  let fixture: ComponentFixture<TableDevsuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableDevsuComponent]
    });
    fixture = TestBed.createComponent(TableDevsuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
