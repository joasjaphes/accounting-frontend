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
import { TaxCode } from '../../../../store/tax-code/tax-code.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store';
import { CommonService } from '../../../../services/common.service';
import { TaxCodeService } from '../../../../services/tax-code.service';
import { TaxCodeActions } from '../../../../store/tax-code/tax-code.actions';
import { Account } from '../../../../store/accounts/account.model';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { fadeIn } from '../../../../shared/animations';

@Component({
  selector: 'app-add-edit-tax-code',
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
    MatSelectModule,
    MatInput,
  ],
  templateUrl: './add-edit-tax-code.component.html',
  styleUrl: './add-edit-tax-code.component.scss',
  animations:[fadeIn]
})
export class AddEditTaxCodeComponent implements OnInit {
  @Input() taxCode: TaxCode;
  @Input() accounts: Account[];
  @Output() close = new EventEmitter();
  taxCodeForm: FormGroup;
  saving = false;
  companyId: string;
  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private commonService: CommonService,
    private taxCodeService: TaxCodeService
  ) {}
  ngOnInit(): void {
    this.taxCodeForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      rate: [''],
      salesAccount: [''],
      purchasesAccount: [''],
    });
    const user = JSON.parse(localStorage.getItem('accounting-user'));
    this.companyId = user.companyId;
    this.initTaxCode();
  }

  initTaxCode() {
    if (this.taxCode) {
      this.taxCodeForm.patchValue({
        name: this.taxCode.name,
        description: this.taxCode.description,
        rate: this.taxCode.rate,
        salesAccount: this.taxCode.salesAccount,
        purchasesAccount: this.taxCode.purchasesAccount,
      });
    }
  }

  async onSave() {
    this.saving = true;
    try {
      const formValue = this.taxCodeForm.value;
      const taxCodeId = this.taxCode
        ? this.taxCode.id
        : this.commonService.makeId();
      const taxCodePayload: TaxCode = {
        ...formValue,
        id: taxCodeId,
        companyId: this.companyId,
      };
      await this.taxCodeService.saveTaxCode(taxCodePayload);
      this.store.dispatch(
        TaxCodeActions.upsertTaxCode({ taxCode: taxCodePayload })
      );
      this.onClose(taxCodePayload);
    } catch (e) {
      console.error('Failed to save tax code', e);
    }
    this.saving = false;
  }

  onClose(taxCode?: TaxCode) {
    this.close.emit(taxCode);
  }
}
