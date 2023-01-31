import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { CommonService } from '../../../services/common.service';
import { upsertTransaction } from '../../../store/actions/transaction.actions';
import {
  Transaction,
  TransactionStatus,
} from '../../../store/models/transaction.model';
import { AppState } from '../../../store/reducers';
import * as moment from 'moment';
import { TransactionService } from '../../../services/transaction.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'accounting-add-edit-transaction',
  templateUrl: './add-edit-transaction.component.html',
  styleUrls: ['./add-edit-transaction.component.scss'],
})
export class AddEditTransactionComponent implements OnInit {
  transactionForm: FormGroup;
  currentTransaction: Transaction;
  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { currentTransaction: Transaction },
    private dialog: MatDialog,
    private commonService: CommonService,
    private store: Store<AppState>,
    private transactionService: TransactionService
  ) {}

  ngOnInit(): void {
    this.transactionForm = this.formBuilder.group({
      date: ['', Validators.required],
      description: ['', Validators.required],
    });
    if (this.data && this.data?.currentTransaction) {
      this.currentTransaction = this.data.currentTransaction;
      this.transactionForm.patchValue({
        date: this.currentTransaction.date,
        description: this.currentTransaction.description,
      });
    }
  }

  async onSave() {
    try {
      const formdata = this.transactionForm.value;
      const id = this.currentTransaction?.id ?? this.commonService.makeId();
      const transactionPayload: Transaction = {
        id,
        date: moment(formdata.date).format('YYYY-MM-DD'),
        description: formdata.description,
        status: this.currentTransaction
          ? this.currentTransaction.status
          : TransactionStatus.PENDING,
      };
      const response = await firstValueFrom(
        this.transactionService.saveTransaction(transactionPayload)
      );
      this.store.dispatch(
        upsertTransaction({ transaction: transactionPayload })
      );
      this.onClose();
    } catch (e) {
      console.error('Failed to save transaction', e);
    }
  }

  onClose() {
    this.dialog.closeAll();
  }
}
