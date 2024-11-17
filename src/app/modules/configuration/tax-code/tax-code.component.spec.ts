import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxCodeComponent } from './tax-code.component';

describe('TaxCodeComponent', () => {
  let component: TaxCodeComponent;
  let fixture: ComponentFixture<TaxCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaxCodeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaxCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
