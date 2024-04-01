import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormField } from '@angular/material/form-field';

@Component({
  selector: 'app-add-edit-journal',
  standalone: true,
  imports: [CommonModule,MatFormField],
  templateUrl: './add-edit-journal.component.html',
  styleUrl: './add-edit-journal.component.css',
})
export class AddEditJournalComponent {}
