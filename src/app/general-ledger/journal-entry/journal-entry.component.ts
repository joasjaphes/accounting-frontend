import { Component, OnInit } from '@angular/core';
import { PageLayoutComponent } from '../../shared/components/page-layout/page-layout.component';
import {
  DataTableComponent,
  TableConfiguration,
} from '../../shared/components/data-table/data-table.component';
import { AddEditJournalComponent } from './add-edit-journal/add-edit-journal.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-journal-entry',
  standalone: true,
  imports: [PageLayoutComponent, DataTableComponent, AddEditJournalComponent,NgIf],
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

  constructor() {}

  ngOnInit(): void {}

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
