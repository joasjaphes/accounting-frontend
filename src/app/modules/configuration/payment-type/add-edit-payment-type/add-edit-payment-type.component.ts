import { NgIf, NgFor } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { SaveButtonComponent } from '../../../../shared/components/save-button/save-button.component';
import { fadeIn } from '../../../../shared/animations';
import { PaymentType } from '../../../../store/payment-type/payment-type.model';
import { Store } from '@ngrx/store';
import { CommonService } from '../../../../services/common.service';
import { TaxCodeService } from '../../../../services/tax-code.service';
import { AppState } from '../../../../store';
import { TaxCodeActions } from '../../../../store/tax-code/tax-code.actions';
import { TaxCode } from '../../../../store/tax-code/tax-code.model';
import { PaymentTypeService } from '../../../../services/payment-type.service';
import { PaymentTypeActions } from '../../../../store/payment-type/payment-type.actions';
import { MatCheckbox } from '@angular/material/checkbox';

@Component({
  selector: 'app-add-edit-payment-type',
  standalone: true,
  imports: [
    MatFormField,
    MatLabel,
    MatInput,
    NgIf,
    FormsModule,
    ReactiveFormsModule,
    SaveButtonComponent,
    MatSelectModule,
    MatInput,
    MatCheckbox
  ],
  templateUrl: './add-edit-payment-type.component.html',
  styleUrl: './add-edit-payment-type.component.scss',
  animations: [fadeIn],
})
export class AddEditPaymentTypeComponent implements OnInit {
  @Input() paymentType: PaymentType;
  @Output() close = new EventEmitter();
  paymentTypeForm: FormGroup;
  saving = false;
  companyId: string;
  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private commonService: CommonService,
    private paymentTypeService: PaymentTypeService
  ) {}
  ngOnInit(): void {
    this.paymentTypeForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      displayInSales: [''],
      displayInDebtorsPayments: [''],
      displayInCreditPayments: [''],
      displayInCustomerDeposits: [''],
      displayInRefunds: [''],
      displayInCashierReports: [''],
      displayInBankingReceivingMoney: [''],
    });
    const user = JSON.parse(localStorage.getItem('accounting-user'));
    this.companyId = user.companyId;
    this.initPaymentType();
  }

  initPaymentType() {
    if (this.paymentType) {
      this.paymentTypeForm.patchValue({
        name: this.paymentType.name,
        description: this.paymentType.description,
        displayInSales: this.paymentType.displayInSales,
        displayInDebtorsPayments: this.paymentType.displayInDebtorsPayments,
        displayInCreditPayments: this.paymentType.displayInCreditPayments,
        displayInCustomerDeposits: this.paymentType.displayInCustomerDeposits,
        displayInRefunds: this.paymentType.displayInRefunds,
        displayInCashierReports: this.paymentType.displayInCashierReports,
        displayInBankingReceivingMoney:
          this.paymentType.displayInBankingReceivingMoney,
      });
    }
  }

  async onSave() {
    this.saving = true;
    try {
      const formValue = this.paymentTypeForm.value;
      const paymentTypeId = this.paymentType
        ? this.paymentType.id
        : this.commonService.makeId();
      const paymentTypePayload: PaymentType = {
        ...formValue,
        id: paymentTypeId,
        companyId: this.companyId,
      };
      await this.paymentTypeService.savePaymentType(paymentTypePayload);
      this.store.dispatch(
        PaymentTypeActions.upsertPaymentType({ paymentType: paymentTypePayload })
      );
      this.onClose(paymentTypePayload);
    } catch (e) {
      console.error('Failed to save tax code', e);
    }
    this.saving = false;
  }

  onClose(paymentType?: PaymentType) {
    this.close.emit(paymentType);
  }
}
