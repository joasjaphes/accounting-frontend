import { Component, Inject, Injectable, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';
import { AccountService } from '../../../../services/account.service';
import { CommonService } from '../../../../services/common.service';
import { fadeIn } from '../../../../shared/animations/router-animation';
import { upsertAccount } from '../../../../store/actions/account.actions';
import { Account } from '../../../../store/models/account.model';
import { AppState } from '../../../../store/reducers';
import { AccountCategory } from '../../accounts-categories';

@Component({
  selector: 'accounting-add-edit-account',
  templateUrl: './add-edit-account.component.html',
  styleUrls: ['./add-edit-account.component.scss'],
  animations:[fadeIn],
  encapsulation: ViewEncapsulation.None
})
export class AddEditAccountComponent implements OnInit {

  accountForm: FormGroup;
  currentAccount: Account;
  loading = false;
  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private store: Store<AppState>,
    private commonService: CommonService,
    private accountService: AccountService,
    @Inject(MAT_DIALOG_DATA) public data:
      {
        title: string,
        accountKey: AccountCategory.ASSET | AccountCategory.EXPENSES | AccountCategory.INCOME | AccountCategory.LIABILITY | AccountCategory.SHARE_HOLDER_EQUITY,
        currentAccount: Account;
      },
  ) { }

  ngOnInit(): void {
    this.accountForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      balance: ['', Validators.required],
      status: ['']
    });
    if (this.data.currentAccount) {
      this.currentAccount = this.data.currentAccount;
      this.accountForm.patchValue({
        name: this.currentAccount.name,
        description: this.currentAccount.description,
        balance: this.currentAccount.balance,
        status: this.currentAccount.status
      });
    }
  }

  onClose() {
    this.dialog.closeAll();
  }

  async onSave() {
    this.loading = true;
    try {
      const formData = this.accountForm.value;
      console.log('form data', formData);
      const id = this.currentAccount?.id ?? this.commonService.makeId();
      const accountPayload: Account = {
        id,
        name: formData.name,
        description: formData.description,
        status: formData.status,
        category: this.data.accountKey,
        balance: formData.balance
      };
      await firstValueFrom(this.accountService.saveAccount(accountPayload));
      this.store.dispatch(upsertAccount({ account: accountPayload }));
    } catch (e) {
      console.log('Error saving account', e);
    }
    this.loading = false;
    this.onClose();
  }

}
