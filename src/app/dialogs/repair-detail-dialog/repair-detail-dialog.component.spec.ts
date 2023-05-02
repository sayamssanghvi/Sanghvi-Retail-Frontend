import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepairDetailDialogComponent } from './repair-detail-dialog.component';

describe('RepairDetailDialogComponent', () => {
  let component: RepairDetailDialogComponent;
  let fixture: ComponentFixture<RepairDetailDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepairDetailDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepairDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
