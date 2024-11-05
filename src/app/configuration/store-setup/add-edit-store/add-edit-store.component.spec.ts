import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditStoreComponent } from './add-edit-store.component';

describe('AddEditStoreComponent', () => {
  let component: AddEditStoreComponent;
  let fixture: ComponentFixture<AddEditStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditStoreComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddEditStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
