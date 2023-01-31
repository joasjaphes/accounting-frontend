import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JournalEntryComponent } from './journal-entry.component';

const routes: Routes = [{ path: '', component: JournalEntryComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JournalEntryRoutingModule { }
