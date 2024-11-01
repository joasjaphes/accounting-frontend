export interface Menu {
  name: string;
  id: string;
  path?: string;
  icon: string;
  children?: Menu[];
}

export const menus: Menu[] = [
  {
    name: 'General Ledger',
    id: 'generalLedger',
    icon: 'home',
    children: [
      {
        name: 'Accounts',
        id: 'accounts',
        icon: 'account_balance',
        path: 'general-ledger/accounts',
      },
      {
        name: 'Journal Entry',
        id: 'journalEntry',
        icon: 'book',
        path: 'general-ledger/journal-entry',
      },
      // {
      //   name: 'Transactions',
      //   icon: 'account_balance',
      //   path: 'general-ledger/transactions',
      // },
    ],
  },
  {
    name: 'Receivables',
    id: 'receivable',
    icon: 'home',
    children: [
      {
        name: 'Invoicing',
        id: 'invoicing',
        icon: 'account_balance',
        path: 'receivables/invoicing',
      },
      // {
      //   name: 'Transactions',
      //   icon: 'account_balance',
      //   path: 'general-ledger/transactions',
      // },
    ],
  },
  {
    name: 'Customers',
    id: 'customers',
    icon: 'home',
    path: 'customers',
  },
  {
    name: 'Products',
    id: 'products',
    icon: 'account_balance',
    path: 'products',
  },
];
