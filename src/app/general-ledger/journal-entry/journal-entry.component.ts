import { Component, OnInit } from '@angular/core';
import { PageLayoutComponent } from '../../shared/components/page-layout/page-layout.component';
import {
  DataTableComponent,
  TableConfiguration,
} from '../../shared/components/data-table/data-table.component';
import { AddEditJournalComponent } from './add-edit-journal/add-edit-journal.component';
import { AsyncPipe, NgIf } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../store';
import { Observable } from 'rxjs';
import { JournalEntry } from '../../store/journal-entry/journal-entry.model';
import * as journalSelector from '../../store/journal-entry/journal-entry.selectors';

@Component({
  selector: 'app-journal-entry',
  standalone: true,
  imports: [
    PageLayoutComponent,
    DataTableComponent,
    AddEditJournalComponent,
    NgIf,
    AsyncPipe,
  ],
  templateUrl: './journal-entry.component.html',
  styleUrl: './journal-entry.component.css',
})
export class JournalEntryComponent implements OnInit {
  viewDetails = false;
  formTitle = '';
  formDescription = '';
  viewType = '';
  tableConfiguration: TableConfiguration = {
    columns: [
      {
        name: 'date',
        label: 'Date',
        type: 'date',
      },
      {
        name: 'description',
        label: 'Description',
        type: 'text',
      },
    ],
  };

  journals = [];
  journalEntries$: Observable<JournalEntry[]>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.journalEntries$ = this.store.pipe(select(journalSelector.selectAll));
  }

  onAdd() {
    this.viewType = 'add';
    this.formTitle = `New journal entry`;
    this.viewDetails = true;
  }
  closeForm() {
    this.viewDetails = false;
    this.viewType = '';
    this.formTitle = '';
  }
}
