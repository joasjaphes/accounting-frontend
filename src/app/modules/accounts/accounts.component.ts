import { Component, OnInit } from '@angular/core';
import { accounts } from './accounts-categories';

@Component({
  selector: 'accounting-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {
  accounts = accounts;

  // constructor() { }

  ngOnInit(): void {
    console.log
  }

}
