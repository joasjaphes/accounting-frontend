import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatDatepicker,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import {
  MatFormField,
  MatLabel,
  MatSuffix,
} from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { Observable } from 'rxjs';
import { Customer } from '../../../store/customers/customer.model';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../store';
import * as customersSelector from '../../../store/customers/customer.selectors';
import { MatSelect, MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-add-edit-invoice',
  standalone: true,
  imports: [
    MatFormField,
    ReactiveFormsModule,
    MatLabel,
    MatDatepicker,
    MatDatepickerModule,
    FormsModule,
    MatInput,
    MatSuffix,
    MatSelectModule,

  ],
  templateUrl: './add-edit-invoice.component.html',
  styleUrl: './add-edit-invoice.component.scss',
})
export class AddEditInvoiceComponent implements OnInit {
  invoiceDate;
  maxDate = new Date();
  customers$: Observable<Customer[]>;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.customers$ = this.store.pipe(select(customersSelector.selectAll));
  }
}
