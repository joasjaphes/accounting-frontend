import { Customer } from '../customers/customer.model';
import { Product } from '../products/product.model';

export interface Invoice {
  id: string;
  invoiceNumber: string;
  description: string;
  date: string;
  customerId: string;
  customerName: string;
  subtotal: number;
  amount: number;
  VATAmount: number;
  currency: string;
  discount: number;
  paymentStatus: paymentStatus;
  items: InvoiceItem[];
  itemList?: string;
  customer?: Customer;
}

export interface InvoiceItem {
  id: string;
  productId: string;
  amount: number;
  discount: number;
  VATAmount: number;
  subtotal: number;
  product?: Product;
}

export type paymentStatus = 'UNPAID' | 'PAID' | 'PARTIALLY_PAID';
