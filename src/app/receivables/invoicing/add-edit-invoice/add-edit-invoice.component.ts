import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
import { Observable, first, firstValueFrom, pipe } from 'rxjs';
import { Customer } from '../../../store/customers/customer.model';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../store';
import * as customersSelector from '../../../store/customers/customer.selectors';
import * as productsSelector from '../../../store/products/product.selectors';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { SearchAreaComponent } from '../../../shared/components/search-area/search-area.component';
import { AsyncPipe, DecimalPipe } from '@angular/common';
import { Product } from '../../../store/products/product.model';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { NewCustomerComponent } from './new-customer/new-customer.component';
import { fadeIn } from '../../../shared/animations';
import { SaveButtonComponent } from '../../../shared/components/save-button/save-button.component';
import { Invoice, InvoiceItem } from '../../../store/invoicing/invoice.model';
import { CommonService } from '../../../services/common.service';
import moment from 'moment';
import { InvoiceService } from '../../../services/invoice.service';
import { InvoiceActions } from '../../../store/invoicing/invoice.actions';

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
    SearchAreaComponent,
    AsyncPipe,
    MatButton,
    MatIcon,
    DecimalPipe,
    SaveButtonComponent,
  ],
  templateUrl: './add-edit-invoice.component.html',
  styleUrl: './add-edit-invoice.component.scss',
  animations: [fadeIn],
})
export class AddEditInvoiceComponent implements OnInit {
  @Output() close = new EventEmitter();
  invoiceDate;
  maxDate = new Date();
  customers$: Observable<Customer[]>;
  products$: Observable<Product[]>;
  customerSearchString = '';
  productSearchString = '';
  customerId: string;
  customer: Customer;
  selectedProducts: Product[] = [];
  productQuantity: { [id: string]: number } = {};
  productPrice: { [id: string]: number } = {};
  productSubtotal: { [id: string]: number } = {};
  selectedProductIds = [];
  invoiceDescription: string;
  saving = false;

  constructor(
    private store: Store<AppState>,
    private dialog: MatDialog,
    private commonService: CommonService,
    private invoiceService: InvoiceService
  ) {}

  ngOnInit() {
    this.customers$ = this.store.pipe(select(customersSelector.selectAll));
    this.products$ = this.store.pipe(select(productsSelector.selectAll));
  }

  async onNewCustomer() {
    const dialogRef = this.dialog.open(NewCustomerComponent, {
      width: '60%',
      // height: '60%',
      disableClose: true,
    });
    const selectedCustomer = await firstValueFrom<Customer>(
      dialogRef.afterClosed()
    );
    this.customerId = selectedCustomer.id;
    this.customer = selectedCustomer;
  }

  async onCustomerSelected() {
    this.customer = await firstValueFrom(
      this.store.pipe(
        select(customersSelector.selectById(this.customerId)),
        first((i) => !!i)
      )
    );
  }

  async onProductSelected() {
    this.selectedProducts = await firstValueFrom(
      this.store.pipe(
        select(productsSelector.selectByIds(this.selectedProductIds)),
        first((i) => !!i)
      )
    );
    for (const product of this.selectedProducts) {
      if (!this.productQuantity[product.id]) {
        this.productQuantity[product.id] = 1;
      }
      if (!this.productPrice[product.id]) {
        this.productPrice[product.id] = product.price;
      }
      this.calculateSubtotal(product.id);
    }
  }

  calculateSubtotal(id) {
    this.productSubtotal[id] =
      parseFloat('' + this.productQuantity[id]) *
      parseFloat('' + this.productPrice[id]);
  }

  getInvoiceTotal() {
    let total = 0;
    for (const product of this.selectedProductIds) {
      total += this.productSubtotal[product];
    }
    return total;
  }

  onClose() {
    this.close.emit();
  }

  async onSave() {
    this.saving = true;
    try {
      const id = this.commonService.makeId();
      let items: InvoiceItem[] = [];
      for (const product of this.selectedProducts) {
        const invoiceItem: InvoiceItem = {
          id: this.commonService.makeId(),
          productId: product.id,
          amount: this.productSubtotal[product.id],
          discount: 0,
          VATAmount: 0,
          subtotal: this.productSubtotal[product.id],
        };
        items.push(invoiceItem);
      }
      let invoice: Invoice = {
        id,
        invoiceNumber: null,
        description: this.invoiceDescription,
        date: moment(new Date()).format('YYYY-MM_DD'),
        customerId: this.customerId,
        customerName: this.customer.name,
        subtotal: this.getInvoiceTotal(),
        amount: this.getInvoiceTotal(),
        VATAmount: 0,
        currency: 'TZS',
        discount: 0,
        paymentStatus: 'UNPAID',
        items,
      };
      await this.invoiceService.saveInvoice(invoice);
      this.store.dispatch(InvoiceActions.loadInvoices());
      this.onClose();
    } catch (e) {
      console.error('Failed to save invoice', e);
    }
    this.saving = false;
  }
}
