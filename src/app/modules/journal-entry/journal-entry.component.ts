import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEntryComponent } from './add-entry/add-entry.component';

@Component({
  selector: 'accounting-journal-entry',
  templateUrl: './journal-entry.component.html',
  styleUrls: ['./journal-entry.component.scss']
})
export class JournalEntryComponent implements OnInit {

  constructor(private dialog:MatDialog) { }

  ngOnInit(): void {
  }

  onAdd() {
    this.dialog.open(AddEntryComponent,{
      width:'80%',
      height:'80%',
      disableClose:true
    })
  }

}
