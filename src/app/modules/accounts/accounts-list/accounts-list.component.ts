import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../shared/animations/router-animation';
import { ActionButton } from '../../../shared/components/data-table/action-button';
import { TableConfiguration } from '../../../shared/components/data-table/tableconfiguration';
import { Account } from '../../../store/models/account.model';

@Component({
  selector: 'accounting-accounts-list',
  templateUrl: './accounts-list.component.html',
  styleUrls: ['./accounts-list.component.scss'],
})
export class AccountsListComponent implements OnInit {
  @Input() data = [];
  @Input() tableConfigurations: TableConfiguration = {
    tableColumns: [
      { name: 'name', label: 'Account Name' },
      { name: 'balance', label: 'Account Balance' },
    ],
    actionIcons: {
      edit: true,
      more: true,
    },
  };
  @Input() actionButtons: ActionButton[] = [
    {
      id: 'preview',
      label: 'Preview',
      value: 'preview',
      icon: 'visibility',
    },
    {
      id: 'manage',
      label: 'Manage',
      value: 'manage',
      icon: 'settings',
    },
  ];
  @Output() preview = new EventEmitter<Account>();
  @Output() delete = new EventEmitter<Account>();
  @Output() actionButton = new EventEmitter<{ value: string; item: Account }>();
  @Output() update = new EventEmitter<Account>();
  routeElements = ROUTE_ANIMATIONS_ELEMENTS;

  constructor() {}

  ngOnInit(): void {}

  onPreview(event: Account) {
    this.preview.emit(event);
  }
  onDelete(event: Account) {
    this.delete.emit(event);
  }
  onActionButton(event: { value: string; item: Account }) {
    this.actionButton.emit(event);
  }
  onUpdate(event: Account) {
    this.update.emit(event);
  }
}
