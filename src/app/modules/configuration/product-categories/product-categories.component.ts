import { Component, OnInit } from '@angular/core';
import * as productCategorySelectors from '../../../store/product-categories/product-category.selector';
import { ProductCategory } from '../../../store/product-categories/product-category.model';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../store';
import {
  DataTableComponent,
  TableConfiguration,
} from '../../../shared/components/data-table/data-table.component';
import { PageLayoutComponent } from '../../../shared/components/page-layout/page-layout.component';
import { AsyncPipe } from '@angular/common';
import { AddEditProductCategoryComponent } from './add-edit-product-category/add-edit-product-category.component';
import { Account } from '../../../store/accounts/account.model';
import { TaxCode } from '../../../store/tax-code/tax-code.model';
import * as accountSelector from '../../../store/accounts/accounts.selectors';
import * as taxSelector from '../../../store/tax-code/tax-code.selectors';
@Component({
  selector: 'app-product-categories',
  standalone: true,
  imports: [
    PageLayoutComponent,
    DataTableComponent,
    AsyncPipe,
    AddEditProductCategoryComponent,
  ],
  templateUrl: './product-categories.component.html',
  styleUrl: './product-categories.component.scss',
})
export class ProductCategoriesComponent implements OnInit {
  productCategories$: Observable<ProductCategory[]>;
  accounts$: Observable<Account[]>;
  taxes$: Observable<TaxCode[]>;
  loading$: Observable<boolean>;
  tableConfigurations: TableConfiguration = {
    columns: [
      {
        name: 'name',
        label: 'Name',
        type: 'text',
      },
      {
        name: 'description',
        label: 'Description',
        type: 'text',
      },
    ],
    actions: {
      edit: true,
    },
  };
  viewDetails = false;
  viewType;
  formTitle = '';
  currentProductCategory: ProductCategory;
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.productCategories$ = this.store.pipe(
      select(productCategorySelectors.selectAll)
    );
    this.accounts$ = this.store.pipe(select(accountSelector.selectAllAccounts));
    this.taxes$ = this.store.pipe(select(taxSelector.selectAll));
  }

  onAddProductCategory() {
    this.viewDetails = true;
    this.viewType = 'add';
    this.formTitle = 'Add Product Category';
  }

  onUpdateProductCategory(event) {
    this.currentProductCategory = event;
    this.viewDetails = true;
    this.viewType = 'add';
    this.formTitle = 'Edit Product Category';
  }

  closeForm() {
    this.viewDetails = false;
    this.viewType = '';
    this.formTitle = '';
    this.currentProductCategory = null;
  }
}
