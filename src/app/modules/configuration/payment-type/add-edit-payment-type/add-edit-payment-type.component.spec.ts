import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditPaymentTypeComponent } from './add-edit-payment-type.component';

describe('AddEditPaymentTypeComponent', () => {
  let component: AddEditPaymentTypeComponent;
  let fixture: ComponentFixture<AddEditPaymentTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditPaymentTypeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddEditPaymentTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
