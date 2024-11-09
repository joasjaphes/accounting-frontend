import { Component, OnInit } from '@angular/core';
import { PageLayoutComponent } from '../../../shared/components/page-layout/page-layout.component';
import {
  DataTableComponent,
  TableConfiguration,
} from '../../../shared/components/data-table/data-table.component';
import { AddEditProductComponent } from '../add-edit-product/add-edit-product.component';
import { Observable, first } from 'rxjs';
import { Product } from '../../../store/products/product.model';
import { AsyncPipe } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../store';
import * as productSelector from '../../../store/products/product.selectors';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    PageLayoutComponent,
    DataTableComponent,
    AddEditProductComponent,
    AsyncPipe,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  viewDetails = false;
  viewType;
  formTitle = '';
  products$: Observable<Product[]>;

  tableConfiguration: TableConfiguration = {
    columns: [
      {
        name: 'name',
        label: 'Product name',
        type: 'text',
      },
      {
        name: 'description',
        label: 'Product description',
        type: 'text',
      },
      {
        name: 'price',
        label: 'Unit Price',
        type: 'number',
      },
    ],
  };

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.products$ = this.store.pipe(
      select(productSelector.selectDetailed)
    );
  }
  addProduct() {
    this.viewType = 'add';
    this.formTitle = 'Add new product';
    this.viewDetails = true;
  }

  closeForm() {
    this.viewDetails = false;
    this.formTitle = '';
    this.viewType = '';
  }
}
