import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticationDetailsComponent } from './authentication-details.component';

describe('AuthenticationDetailsComponent', () => {
  let component: AuthenticationDetailsComponent;
  let fixture: ComponentFixture<AuthenticationDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthenticationDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthenticationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
