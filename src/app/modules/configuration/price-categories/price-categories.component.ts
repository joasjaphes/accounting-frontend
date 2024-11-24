import { Component, OnInit } from '@angular/core';
import * as priceCategorySelector from '../../../store/price-category/price-category.selector';
import { Observable } from 'rxjs';
import { PriceCategory } from '../../../store/price-category/price-category.model';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../store';
import { PageLayoutComponent } from '../../../shared/components/page-layout/page-layout.component';
import { AsyncPipe } from '@angular/common';
import {
  DataTableComponent,
  TableConfiguration,
} from '../../../shared/components/data-table/data-table.component';
import { AddEditPriceCategoriesComponent } from './add-edit-price-categories/add-edit-price-categories.component';

@Component({
  selector: 'app-price-categories',
  standalone: true,
  imports: [PageLayoutComponent, AsyncPipe, DataTableComponent,AddEditPriceCategoriesComponent],
  templateUrl: './price-categories.component.html',
  styleUrl: './price-categories.component.scss',
})
export class PriceCategoriesComponent implements OnInit {
  priceCategories$: Observable<PriceCategory[]>;
  currentPriceCategory: PriceCategory;
  viewDetails = false;
  viewType = '';
  formTitle = '';
  tableConfigurations: TableConfiguration = {
    columns: [
      { name: 'name', label: 'Name', type: 'text' },
      { name: 'description', label: 'Description', type: 'text' },
    ],
    actions: {
      edit: true,
    },
  };

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.priceCategories$ = this.store.pipe(
      select(priceCategorySelector.selectAll)
    );
  }

  onAdd() {
    this.viewType = 'add';
    this.formTitle = 'Add new price category';
    this.viewDetails = true;
  }

  onEdit(priceCategory: PriceCategory) {
    this.currentPriceCategory = priceCategory;
    this.viewType = 'edit';
    this.formTitle = 'Edit price category';
    this.viewDetails = true;
  }

  closeForm() {
    this.viewDetails = false;
    this.viewType = '';
    this.currentPriceCategory = null;
  }
}
