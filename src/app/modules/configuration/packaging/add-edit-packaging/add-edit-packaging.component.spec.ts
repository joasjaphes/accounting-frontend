import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditPackagingComponent } from './add-edit-packaging.component';

describe('AddEditPackagingComponent', () => {
  let component: AddEditPackagingComponent;
  let fixture: ComponentFixture<AddEditPackagingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditPackagingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddEditPackagingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
