export interface JournalEntry {
  id: string;
  date: string;
  description: string;
  transactions: JournalTransaction[];
}

export interface JournalTransaction {
  id: string;
  amount: number;
  accountId: string;
  accountName?:string;
  debitAmount?:number;
  creditAmount?:number;
  type: TransactionType;
  date:string;
}

export type TransactionType = 'DEBIT' | 'CREDIT';
