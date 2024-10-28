import { Component } from '@angular/core';
import { AddEditCustomerComponent } from '../../../../customers/add-edit-customer/add-edit-customer.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-new-customer',
  standalone: true,
  imports: [AddEditCustomerComponent, MatDialogModule],
  templateUrl: './new-customer.component.html',
  styleUrl: './new-customer.component.scss',
})
export class NewCustomerComponent {
  constructor(private dialogRef: MatDialogRef<NewCustomerComponent>) {}

  close(event) {
    this.dialogRef.close(event);
  }
}
