import { NgFor, NgIf } from '@angular/common';
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
import { Store } from '@ngrx/store';
import { AppState } from '../../store';
import { fadeIn } from '../../shared/animations';
import { SaveButtonComponent } from '../../shared/components/save-button/save-button.component';
import { CommonService } from '../../services/common.service';
import { Customer } from '../../store/customers/customer.model';
import { CustomerActions } from '../../store/customers/customer.actions';

@Component({
  selector: 'app-add-edit-customer',
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
  templateUrl: './add-edit-customer.component.html',
  styleUrl: './add-edit-customer.component.scss',
  animations: [fadeIn],
})
export class AddEditCustomerComponent implements OnInit {
  @Input() customer: Customer;
  @Output() close = new EventEmitter();
  customerForm: FormGroup;
  saving = false;
  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private commonService: CommonService
  ) {}
  ngOnInit(): void {
    this.customerForm = this.formBuilder.group({
      name: ['', Validators.required],
      phoneNumber: [''],
      email: [''],
      address: [''],
    });
  }

  initCustomer() {
    if (this.customer) {
      this.customerForm.patchValue({
        name: this.customer.name,
        phoneNumber: this.customer.phoneNumber,
        email: this.customer.email,
        address: this.customer.address,
      });
    }
  }

  async onSave() {
    this.saving = true;
    try {
      const formValue = this.customerForm.value;
      const customerId = this.customer
        ? this.customer.id
        : this.commonService.makeId();
      const customerPayload: Customer = {
        ...formValue,
        id: customerId,
      };
      this.store.dispatch(
        CustomerActions.upsertCustomer({ customer: customerPayload })
      );
      this.onClose();
    } catch (e) {
      console.error('Failed to save customer', e);
    }
    this.saving = false;
  }

  onClose() {
    this.close.emit();
  }
}
