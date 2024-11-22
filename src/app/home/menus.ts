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
  {
    name: 'Configuration',
    id: 'configuration',
    icon: 'home',
    children: [
      {
        name: 'Company Setup',
        id: 'companySetup',
        icon: 'account_balance',
        path: 'configuration/company-setup',
      },
      {
        name: 'Currency Setup',
        id: 'currencySetup',
        icon: 'account_balance',
        path: 'configuration/currency-setup',
      },
      {
        name: 'Stores Setup',
        id: 'storeSetup',
        icon: 'account_balance',
        path: 'configuration/store-setup',
      },
      {
        name: 'Tax Code',
        id: 'taxCode',
        icon: 'account_balance',
        path: 'configuration/tax-code',
      },
      {
        name: 'Financial Period',
        id: 'financialPeriod',
        icon: 'account_balance',
        path: 'configuration/financial-period',
      },
      {
        name: 'Payment Type',
        id: 'paymentType',
        icon: 'account_balance',
        path: 'configuration/payment-type',
      },
      {
        name: 'Product Category',
        id: 'productCategory',
        icon:'',
        path:'configuration/product-category'
      },
      {
        name: 'Packaging',
        id: 'packaging',
        icon:'',
        path:'configuration/packaging'
      }
    ],
  },
];
