import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditTaxCodeComponent } from './add-edit-tax-code.component';

describe('AddEditTaxCodeComponent', () => {
  let component: AddEditTaxCodeComponent;
  let fixture: ComponentFixture<AddEditTaxCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditTaxCodeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddEditTaxCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
