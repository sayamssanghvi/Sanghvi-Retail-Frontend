import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviousSalesComponent } from './previous-sales.component';

describe('PreviousSalesComponent', () => {
  let component: PreviousSalesComponent;
  let fixture: ComponentFixture<PreviousSalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviousSalesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviousSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
