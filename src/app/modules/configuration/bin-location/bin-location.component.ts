import { Component, OnInit } from '@angular/core';
import { PageLayoutComponent } from '../../../shared/components/page-layout/page-layout.component';
import * as binLocationSelectors from '../../../store/bin-location/bin-location.selector';
import { Observable } from 'rxjs';
import { BinLocation } from '../../../store/bin-location/bin-location.model';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../store';
import { DataTableComponent, TableConfiguration } from '../../../shared/components/data-table/data-table.component';
import { AsyncPipe } from '@angular/common';
import { AddEditBinLocationComponent } from './add-edit-bin-location/add-edit-bin-location.component';

@Component({
  selector: 'app-bin-location',
  standalone: true,
  imports: [PageLayoutComponent,DataTableComponent,AsyncPipe,AddEditBinLocationComponent],
  templateUrl: './bin-location.component.html',
  styleUrl: './bin-location.component.scss',
})
export class BinLocationComponent implements OnInit {
  binLocations$: Observable<BinLocation[]>;
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
  currentBinLocation: BinLocation;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.binLocations$ = this.store.pipe(
      select(binLocationSelectors.selectAll)
    );
  }

  onAdd() {
    this.viewDetails = true;
    this.viewType = 'add';
    this.formTitle = 'Add Bin Location';
  }

  updateBinLocation(binLocation: BinLocation) {
    this.currentBinLocation = binLocation;
    this.viewDetails = true;
    this.viewType = 'edit';
    this.formTitle = 'Edit Bin Location';
  }

  closeForm() {
    this.viewDetails = false;
    this.currentBinLocation = null;
    this.viewType = null;
    this.formTitle = '';
  }
}
