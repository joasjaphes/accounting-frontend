import { NgIf } from '@angular/common';
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
import { FinancialPeriod } from '../../../../store/financial-period/financial-period.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store';
import { CommonService } from '../../../../services/common.service';
import { FinancialPeriodService } from '../../../../services/financial-period.service';
import { FinancialPeriodActions } from '../../../../store/financial-period/financial-period.actions';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { fadeIn } from '../../../../shared/animations';

@Component({
  selector: 'app-add-edit-financial-period',
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
    MatDatepickerModule
  ],
  templateUrl: './add-edit-financial-period.component.html',
  styleUrl: './add-edit-financial-period.component.scss',
  animations:[fadeIn]
})
export class AddEditFinancialPeriodComponent implements OnInit {
  @Input() financialPeriod: FinancialPeriod;
  @Output() close = new EventEmitter();
  financialPeriodForm: FormGroup;
  saving = false;
  companyId: string;
  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private commonService: CommonService,
    private financialPeriodService: FinancialPeriodService
  ) {}
  ngOnInit(): void {
    this.financialPeriodForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      costingMethod: ['WEIGHTED_AVERAGE'],
      status: ['OPEN'],
    });
    const user = JSON.parse(localStorage.getItem('accounting-user'));
    this.companyId = user.companyId;
    this.initPaymentType();
  }

  initPaymentType() {
    if (this.financialPeriod) {
      this.financialPeriodForm.patchValue({
        name: this.financialPeriod.name,
        description: this.financialPeriod.description,
        startDate: this.financialPeriod.startDate,
        endDate: this.financialPeriod.endDate,
        costingMethod: this.financialPeriod.costingMethod,
        status: this.financialPeriod.status,
      });
    }
  }

  async onSave() {
    this.saving = true;
    try {
      const formValue = this.financialPeriodForm.value;
      const financialPeriodId = this.financialPeriod
        ? this.financialPeriod.id
        : this.commonService.makeId();
      const financialPeriodPayload: FinancialPeriod = {
        ...formValue,
        id: financialPeriodId,
        companyId: this.companyId,
      };
      await this.financialPeriodService.saveFinancialPeriod(financialPeriodPayload);
      this.store.dispatch(
        FinancialPeriodActions.upsertFinancialPeriod({
          financialPeriod: financialPeriodPayload,
        })
      );
      this.onClose(financialPeriodPayload);
    } catch (e) {
      console.error('Failed to save tax code', e);
    }
    this.saving = false;
  }

  onClose(financialPeriod?: FinancialPeriod) {
    this.close.emit(financialPeriod);
  }
}
