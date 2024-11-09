import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialPeriodComponent } from './financial-period.component';

describe('FinancialPeriodComponent', () => {
  let component: FinancialPeriodComponent;
  let fixture: ComponentFixture<FinancialPeriodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinancialPeriodComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FinancialPeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
