import { DecimalPipe, NgFor, NgIf } from '@angular/common';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator } from '@angular/material/paginator';

export interface TableConfiguration {
  columns: Column[];
  actions?: {
    edit?: boolean;
    delete?: boolean;
    view?: boolean;
  };
  emptyMessage?: string;
  useFullObject?: boolean;
}

export interface Column {
  name: string;
  label: string;
  type: ColumType;
  format?: string;
}

export type ColumType = 'text' | 'number' | 'date' | 'currency';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.css',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    ReactiveFormsModule,
    MatTableModule,
    MatIconModule,
    DecimalPipe,
    MatPaginator,
  ],
})
export class DataTableComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() tableData = [];
  @Input() addButtonText = 'Add';
  @Input() showAddButton = true;
  @Input() tableConfiguration: TableConfiguration = {
    columns: [],
    actions: {
      edit: false,
      view: false,
      delete: false,
    },
  };
  @Output() add = new EventEmitter();
  @Output() update = new EventEmitter();
  @Output() delete = new EventEmitter();
  @Output() view = new EventEmitter();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = [];
  dataSource: MatTableDataSource<[]> = new MatTableDataSource([]);

  constructor() {}

  ngOnInit(): void {
    console.log('DataTableComponent initialized');
    this.init();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('DataTableComponent changes', changes);
    this.init();
  }

  ngAfterViewInit() {}

  init() {
    this.dataSource = new MatTableDataSource(this.tableData);
    this.displayedColumns = this.tableConfiguration.columns.map(
      (column) => column.name
    );
    this.displayedColumns.unshift('serial#');
    this.displayedColumns.push('actions');
    this.dataSource.paginator = this.paginator;
  }

  onUpdate(item: any) {
    if (this.tableConfiguration.useFullObject) {
      this.update.emit(item);
    } else {
      this.update.emit(item.id);
    }
  }

  onDelete(item: any) {
    if (this.tableConfiguration.useFullObject) {
      this.delete.emit(item);
    } else {
      this.delete.emit(item.id);
    }
  }

  onView(item: any) {
    if (this.tableConfiguration.useFullObject) {
      this.view.emit(item);
    } else {
      this.view.emit(item.id);
    }
  }

  onAdd() {
    this.add.emit();
  }
}
