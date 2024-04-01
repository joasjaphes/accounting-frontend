export interface Menu {
  name: string;
  path?: string;
  icon: string;
  children?: Menu[];
}

export const menus: Menu[] = [
  {
    name: 'General Ledger',
    icon: 'home',
    children: [
      {
        name: 'Accounts',
        icon: 'account_balance',
        path: 'general-ledger/accounts',
      },
      {
        name: 'Journal Entry',
        icon: 'book',
        path: 'general-ledger/journal-entry',
      },
      {
        name: 'Transactions',
        icon: 'account_balance',
        path: 'general-ledger/transactions',
      },
    ],
  },
];
