import { AsyncPipe, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  DataTableComponent,
  TableConfiguration,
} from '../../../shared/components/data-table/data-table.component';
import { PageLayoutComponent } from '../../../shared/components/page-layout/page-layout.component';
import { AddEditCurrencyComponent } from '../currency-setup/add-edit-currency/add-edit-currency.component';
import { StoreSetup } from '../../../store/store-setup/store-setup.model';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../../store';
import * as storeSelector from '../../../store/store-setup/store-setup.selectors';
import { AddEditStoreComponent } from './add-edit-store/add-edit-store.component';

@Component({
  selector: 'app-store-setup',
  standalone: true,
  imports: [
    PageLayoutComponent,
    DataTableComponent,
    AddEditStoreComponent,
    AsyncPipe,
    NgIf,
  ],
  templateUrl: './store-setup.component.html',
  styleUrl: './store-setup.component.scss',
})
export class StoreSetupComponent implements OnInit {
  stores$: Observable<StoreSetup[]>;
  loading$: Observable<boolean>;
  tableConfiguration: TableConfiguration = {
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
  currentStore: StoreSetup;
  constructor(private store: Store<AppState>) {}
  ngOnInit(): void {
    this.stores$ = this.store.pipe(select(storeSelector.selectAll));
    this.loading$ = this.store.pipe(select(storeSelector.selectLoading));
  }

  addStore() {
    this.viewType = 'add';
    this.formTitle = 'Add new store';
    this.viewDetails = true;
  }

  updateStore(event) {
    this.currentStore = event;
    this.viewType = 'update';
    this.formTitle = 'Update store';
    this.viewDetails = true;
  }

  closeForm() {
    this.viewDetails = false;
    this.formTitle = '';
    this.viewType = '';
  }
}
