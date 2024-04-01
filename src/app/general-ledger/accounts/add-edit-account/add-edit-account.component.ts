import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store';
import { upsertAccount } from '../../../store/accounts/accounts.actions';
import { CommonService } from '../../../services/common.service';
import { AccountService } from '../../../services/accounts.service';
import { Account } from '../../../store/accounts/account.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { SaveButtonComponent } from '../../../shared/components/save-button/save-button.component';
import { MatInputModule } from '@angular/material/input';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-add-edit-account',
  standalone:true,
  imports:[MatFormFieldModule,MatSelectModule,SaveButtonComponent, ReactiveFormsModule, MatInputModule,NgIf,NgFor],
  templateUrl: './add-edit-account.component.html',
  styleUrl: './add-edit-account.component.css',
})
export class AddEditAccountComponent implements OnInit {
  accountForm: FormGroup;
  categories = [
    {
      name: 'Asset',
      value: 'ASSET',
    },
    {
      name: 'Liability',
      value: 'LIABILITY',
    },
    {
      name: 'Equity',
      value: 'EQUITY',
    },
    {
      name: 'Revenue',
      value: 'REVENUE',
    },
    {
      name: 'Expense',
      value: 'EXPENSE',
    },
  ];
  @Output() closeForm = new EventEmitter();
  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private commonService: CommonService,
    private accountService: AccountService
  ) {}
  ngOnInit(): void {
    console.log('AddEditAccountComponent initialized');
    this.initForm();
  }

  initForm() {
    this.accountForm = this.formBuilder.group({
      name: '',
      description: '',
      category: '',
    });
  }

  async onSave() {
    try {
      const account = this.accountForm.value;
      const id = this.commonService.makeId();
      const accountPayload: Account = {
        id,
        ...account,
      };
      await this.accountService.saveAccount(accountPayload);
      this.store.dispatch(upsertAccount({ account: accountPayload }));
      this.onCloseForm();
    } catch (e) {
      console.error('Failed to save account', e);
    }
  }

  onCloseForm() {
    this.closeForm.emit();
  }
}
