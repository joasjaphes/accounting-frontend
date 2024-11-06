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
import { SaveButtonComponent } from '../../../shared/components/save-button/save-button.component';
import { Currency } from '../../../store/currency/currency.model';
import { Store } from '@ngrx/store';
import { CommonService } from '../../../services/common.service';
import { CustomerService } from '../../../services/customer.service';
import { AppState } from '../../../store';
import { CustomerActions } from '../../../store/customers/customer.actions';
import { Customer } from '../../../store/customers/customer.model';
import { CurrencyService } from '../../../services/currency.service';
import { CurrencyActions } from '../../../store/currency/currency.actions';
import { fadeIn } from '../../../shared/animations';

@Component({
  selector: 'app-add-edit-currency',
  standalone: true,
  imports: [
    MatFormField,
    MatLabel,
    MatInput,
    NgIf,
    NgFor,
    FormsModule,
    ReactiveFormsModule,
    SaveButtonComponent,
  ],
  templateUrl: './add-edit-currency.component.html',
  styleUrl: './add-edit-currency.component.scss',
  animations: [fadeIn],
})
export class AddEditCurrencyComponent implements OnInit {
  @Input() currency: Currency;
  @Output() close = new EventEmitter();
  currencyForm: FormGroup;
  saving = false;
  companyId: string;
  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private commonService: CommonService,
    private currencyService: CurrencyService
  ) {}
  ngOnInit(): void {
    this.currencyForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      symbol: [''],
    });
    const user = JSON.parse(localStorage.getItem('accounting-user'));
    this.companyId = user.companyId;
    this.initCurrency()
  }

  initCurrency() {
    if (this.currency) {
      this.currencyForm.patchValue({
        name: this.currency.name,
        description: this.currency.description,
        symbol: this.currency.symbol,
      });
    }
  }

  async onSave() {
    this.saving = true;
    try {
      const formValue = this.currencyForm.value;
      const customerId = this.currency
        ? this.currency.id
        : this.commonService.makeId();
      const currencyPayload: Currency = {
        ...formValue,
        id: customerId,
        companyId: this.companyId,
      };
      await this.currencyService.saveCurrency(currencyPayload);
      this.store.dispatch(
        CurrencyActions.upsertCurrency({ currency: currencyPayload })
      );
      this.onClose(currencyPayload);
    } catch (e) {
      console.error('Failed to save currency', e);
    }
    this.saving = false;
  }

  onClose(customer?: Customer) {
    this.close.emit(customer);
  }
}
