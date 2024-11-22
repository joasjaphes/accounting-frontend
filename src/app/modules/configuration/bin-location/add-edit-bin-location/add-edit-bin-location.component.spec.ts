import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditBinLocationComponent } from './add-edit-bin-location.component';

describe('AddEditBinLocationComponent', () => {
  let component: AddEditBinLocationComponent;
  let fixture: ComponentFixture<AddEditBinLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditBinLocationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddEditBinLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
