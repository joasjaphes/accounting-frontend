import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddEditJournalComponent } from './add-edit-journal.component';

describe('AddEditJournalComponent', () => {
  let component: AddEditJournalComponent;
  let fixture: ComponentFixture<AddEditJournalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditJournalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddEditJournalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
