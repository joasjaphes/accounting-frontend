import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareHolderEquityComponent } from './share-holder-equity.component';

describe('ShareHolderEquityComponent', () => {
  let component: ShareHolderEquityComponent;
  let fixture: ComponentFixture<ShareHolderEquityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShareHolderEquityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareHolderEquityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
