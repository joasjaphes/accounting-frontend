export interface Transaction {
  id: string;
  description: string;
  status?: string;
  date: string;
}

export enum TransactionStatus {
  PENDING = 'Pending',
  RECORDED = 'Recorded',
}
