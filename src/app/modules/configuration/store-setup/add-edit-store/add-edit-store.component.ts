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
import { SaveButtonComponent } from '../../../../shared/components/save-button/save-button.component';
import { fadeIn } from '../../../../shared/animations';
import { Store } from '@ngrx/store';
import { CommonService } from '../../../../services/common.service';
import { CurrencyService } from '../../../../services/currency.service';
import { AppState } from '../../../../store';
import { CurrencyActions } from '../../../../store/currency/currency.actions';
import { Currency } from '../../../../store/currency/currency.model';
import { Customer } from '../../../../store/customers/customer.model';
import { StoreSetup } from '../../../../store/store-setup/store-setup.model';
import { StoreSetupService } from '../../../../services/store-setup.service';
import { StoreSetupActions } from '../../../../store/store-setup/store-setup.actions';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-add-edit-store',
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
    MatCheckboxModule,
  ],
  templateUrl: './add-edit-store.component.html',
  styleUrl: './add-edit-store.component.scss',
  animations: [fadeIn],
})
export class AddEditStoreComponent implements OnInit {
  @Input() storeSetup: StoreSetup;
  @Output() close = new EventEmitter();
  storeForm: FormGroup;
  saving = false;
  companyId: string;
  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private commonService: CommonService,
    private storeSetupService: StoreSetupService
  ) {}
  ngOnInit(): void {
    this.storeForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      canRequestFromOtherStores: [''],
      allowSales: [''],
      canIssueToOtherStores: [''],
      canReceivePurchaseOrder: [''],
    });
    const user = JSON.parse(localStorage.getItem('accounting-user'));
    this.companyId = user.companyId;
    this.initStore();
  }

  initStore() {
    if (this.storeSetup) {
      this.storeForm.patchValue({
        name: this.storeSetup.name,
        description: this.storeSetup.description,
        canRequestFromOtherStores: this.storeSetup.canRequestFromOtherStores,
        allowSales: this.storeSetup.allowSales,
        canIssueToOtherStores: this.storeSetup.canIssueToOtherStores,
        canReceivePurchaseOrder: this.storeSetup.canReceivePurchaseOrder,
      });
    }
  }

  async onSave() {
    this.saving = true;
    try {
      const formValue = this.storeForm.value;
      const storeID = this.storeSetup
        ? this.storeSetup.id
        : this.commonService.makeId();
      const storePayload: StoreSetup = {
        ...formValue,
        id: storeID,
        companyId: this.companyId,
      };
      await this.storeSetupService.saveStore(storePayload);
      this.store.dispatch(
        StoreSetupActions.upsertStore({ store: storePayload })
      );
      this.onClose(storePayload);
    } catch (e) {
      console.error('Failed to save store', e);
    }
    this.saving = false;
  }

  onClose(customer?: Customer) {
    this.close.emit(customer);
  }
}
