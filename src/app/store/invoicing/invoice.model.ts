export interface Invoice {
  id: string;
  invoiceNumber:string;
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
  itemList:string;
}

export interface InvoiceItem {
  id: string;
  productId: string;
  amount: number;
  discount: number;
  VATAmount: number;
  subtotal: number;
}

export type paymentStatus = 'UNPAID' | 'PAID' | 'PARTIALLY_PAID';
