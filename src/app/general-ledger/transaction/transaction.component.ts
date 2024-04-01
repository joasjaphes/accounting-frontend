import { Component } from '@angular/core';
import { PageLayoutComponent } from '../../shared/components/page-layout/page-layout.component';

@Component({
  selector: 'app-transaction',
  standalone: true,
  imports: [PageLayoutComponent],
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.css',
})
export class TransactionComponent {
  viewDetails = false;
  formTitle = '';
  formDescription = '';

  closeForm() {}
}
