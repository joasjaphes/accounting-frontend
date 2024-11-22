import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Packaging } from '../../../store/packaging/packaging.model';
import * as packagingSelectors from '../../../store/packaging/packaging.selector';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../store';
import {
  DataTableComponent,
  TableConfiguration,
} from '../../../shared/components/data-table/data-table.component';
import { PageLayoutComponent } from '../../../shared/components/page-layout/page-layout.component';
import { AsyncPipe } from '@angular/common';
import { AddEditPackagingComponent } from './add-edit-packaging/add-edit-packaging.component';

@Component({
  selector: 'app-packaging',
  standalone: true,
  imports: [
    PageLayoutComponent,
    DataTableComponent,
    AsyncPipe,
    AddEditPackagingComponent,
  ],
  templateUrl: './packaging.component.html',
  styleUrl: './packaging.component.scss',
})
export class PackagingComponent implements OnInit {
  packaging$: Observable<Packaging[]>;
  viewDetails = false;
  viewType;
  formTitle = '';
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
      {
        name: 'pieces',
        label: 'Pieces',
        type: 'text',
      },
    ],
    actions: {
      edit: true,
    },
  };
  currentPackaging: Packaging;
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.packaging$ = this.store.pipe(select(packagingSelectors.selectAll));
  }

  onAdd() {
    this.viewDetails = true;
    this.viewType = 'add';
    this.formTitle = 'Add Packaging';
  }

  updatePackaging(packaging: Packaging) {
    this.currentPackaging = packaging;
    this.viewDetails = true;
    this.viewType = 'edit';
    this.formTitle = 'Edit Packaging';
  }

  closeForm() {
    this.viewDetails = false;
    this.viewType = '';
    this.formTitle = '';
  }
}
