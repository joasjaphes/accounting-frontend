import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditFinancialPeriodComponent } from './add-edit-financial-period.component';

describe('AddEditFinancialPeriodComponent', () => {
  let component: AddEditFinancialPeriodComponent;
  let fixture: ComponentFixture<AddEditFinancialPeriodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditFinancialPeriodComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddEditFinancialPeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
