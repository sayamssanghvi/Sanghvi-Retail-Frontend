import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RotiroasterRegistrationComponent } from './rotiroaster-registration.component';

describe('RotiroasterRegistrationComponent', () => {
  let component: RotiroasterRegistrationComponent;
  let fixture: ComponentFixture<RotiroasterRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RotiroasterRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RotiroasterRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
