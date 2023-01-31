import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ROUTE_ANIMATIONS_ELEMENTS } from '../../animations/router-animation';
import { ActionButton } from './action-button';
import { TableConfiguration } from './tableconfiguration';
@Component({
  selector: 'accounting-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource = new MatTableDataSource([]);
  @Input() data = [];
  @Input() tableConfiguration: TableConfiguration = {
    tableColumns: [],
    actionIcons: {
      edit: false,
      isDelete: false,
      more: false,
    },
  };
  @Input() actionButtons: ActionButton[];
  @Output() rowPreview = new EventEmitter<any>();
  @Output() actionButton = new EventEmitter<{ value: string; item: any }>();
  @Output() rowDelete = new EventEmitter<any>();
  @Output() rowUpdate = new EventEmitter<any>();
  displayedColumns: string[];
  routeElements = ROUTE_ANIMATIONS_ELEMENTS;

  constructor() {
    // this.dataSource = new MatTableDataSource([]);
  }

  ngOnInit(): void {
    this.initData();
    // this.displayedColumns = ['position', ...this.tableConfiguration.tableColumns.map(column => column.name)];
  }

  ngOnChanges() {
    this.initData();
  }

  ngAfterViewInit(): void {
    this.initData();
  }

  initData() {
    this.displayedColumns = [
      'position',
      ...this.tableConfiguration.tableColumns.map((column) => column.name),
    ];
    const { edit, isDelete, more } = this.tableConfiguration.actionIcons ?? {
      edit: false,
      isDelete: false,
      more: false,
    };
    if (edit || isDelete || more) {
      this.displayedColumns.push('actions');
    }
    console.log('displayed columns', this.displayedColumns);
    this.dataSource = new MatTableDataSource(this.data);
    console.log('data', this.data);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  onPreview(element) {
    this.rowPreview.emit(element);
  }
  onActionButton(event: { value: string; item: any }) {
    this.actionButton.emit(event);
  }
  onDelete(element) {
    this.rowDelete.emit(element);
  }
  onRowUpdate(element) {
    this.rowUpdate.emit(element);
  }
}
