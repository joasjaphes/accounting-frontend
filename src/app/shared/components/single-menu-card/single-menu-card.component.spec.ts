import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleMenuCardComponent } from './single-menu-card.component';

describe('SingleMenuCardComponent', () => {
  let component: SingleMenuCardComponent;
  let fixture: ComponentFixture<SingleMenuCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleMenuCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleMenuCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
