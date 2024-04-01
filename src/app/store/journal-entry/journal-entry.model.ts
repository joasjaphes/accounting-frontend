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
  type: TransactionType;
}

export type TransactionType = 'DEBIT' | 'CREDIT';
