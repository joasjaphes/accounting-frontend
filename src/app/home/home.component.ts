import { Component, OnInit } from '@angular/core';
import { menus } from './menus';
import { Store } from '@ngrx/store';
import { AppState } from '../store';
import { loadAccounts } from '../store/accounts/accounts.actions';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { UserService } from '../services/user.service';
import { go } from '../store/router/router.actions';
import { JournalEntryActions } from '../store/journal-entry/journal-entry.actions';
import { ProductActions } from '../store/products/product.actions';
import { CustomerActions } from '../store/customers/customer.actions';
import { InvoiceActions } from '../store/invoicing/invoice.actions';
import { StoreSetupActions } from '../store/store-setup/store-setup.actions';
import { CurrencyActions } from '../store/currency/currency.actions';
import { TaxCodeActions } from '../store/tax-code/tax-code.actions';
import { PaymentTypeActions } from '../store/payment-type/payment-type.actions';
import { FinancialPeriodActions } from '../store/financial-period/financial-period.actions';
import { ProductCategoryActions } from '../store/product-categories/product-category.action';
import { PackagingActions } from '../store/packaging/packaging.action';
import { BinLocationActions } from '../store/bin-location/bin-location.action';
import { PriceCategoryActions } from '../store/price-category/price-category.action';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatExpansionModule,
    MatSidenavModule,
    RouterModule,
    NgIf,
    NgFor,
    MatIconModule,
    MatMenuModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  constructor(
    private store: Store<AppState>,
    private userService: UserService
  ) {}
  userName = '';
  menus = menus;
  openedMenu = '';
  ngOnInit(): void {
    const token = localStorage.getItem('accounting-token');
    if (!token) {
      this.store.dispatch(go({ path: ['', 'login'] }));
    } else {
      const user = JSON.parse(localStorage.getItem('accounting-user'));
      this.userName = `${user.firstName} ${user.surname}`;
      this.store.dispatch(loadAccounts());
      this.store.dispatch(JournalEntryActions.loadJournalEntries());
      this.store.dispatch(ProductActions.loadProducts());
      this.store.dispatch(CustomerActions.loadCustomers());
      this.store.dispatch(InvoiceActions.loadInvoices());
      this.store.dispatch(StoreSetupActions.loadStores());
      this.store.dispatch(CurrencyActions.loadCurrencies());
      this.store.dispatch(TaxCodeActions.loadTaxCodes());
      this.store.dispatch(PaymentTypeActions.loadPaymentTypes());
      this.store.dispatch(FinancialPeriodActions.loadFinancialPeriods());
      this.store.dispatch(ProductCategoryActions.loadProductCategories());
      this.store.dispatch(PackagingActions.loadPackaging());
      this.store.dispatch(BinLocationActions.loadBinLocations());
      this.store.dispatch(PriceCategoryActions.loadPriceCategories());
    }
  }

  logout() {
    this.userService.logout();
    this.store.dispatch(go({ path: ['', 'login'] }));
  }

  openCloseMenu(id) {
    if (this.openedMenu === id) {
      this.openedMenu = '';
    } else {
      this.openedMenu = id;
    }
  }
}
