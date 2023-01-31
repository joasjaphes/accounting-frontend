import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JournalEntryRoutingModule } from './journal-entry-routing.module';
import { JournalEntryComponent } from './journal-entry.component';
import { SharedModule } from '../../shared/shared.module';
import { AddEntryComponent } from './add-entry/add-entry.component';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [
    JournalEntryComponent,
    AddEntryComponent
  ],
  imports: [
    CommonModule,
    JournalEntryRoutingModule,
    SharedModule,
    MaterialModule
  ]
})
export class JournalEntryModule { }
