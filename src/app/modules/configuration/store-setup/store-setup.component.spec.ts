import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreSetupComponent } from './store-setup.component';

describe('StoreSetupComponent', () => {
  let component: StoreSetupComponent;
  let fixture: ComponentFixture<StoreSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreSetupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StoreSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
