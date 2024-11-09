import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditCurrencyComponent } from './add-edit-currency.component';

describe('AddEditCurrencyComponent', () => {
  let component: AddEditCurrencyComponent;
  let fixture: ComponentFixture<AddEditCurrencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditCurrencyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddEditCurrencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
