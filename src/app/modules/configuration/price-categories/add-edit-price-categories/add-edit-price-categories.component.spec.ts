import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditPriceCategoriesComponent } from './add-edit-price-categories.component';

describe('AddEditProductCategoriesComponent', () => {
  let component: AddEditPriceCategoriesComponent;
  let fixture: ComponentFixture<AddEditPriceCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditPriceCategoriesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddEditPriceCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
