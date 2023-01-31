import { AppMenu } from '../../app-menus';

export const accounts: AppMenu[] = [
    {
        title: 'Assets',
        route: 'assets',
        icon: 'asset.png'
    },
    {
        title: 'Liabilities',
        route: 'liabilities',
        icon: 'liability.png'
    },
    {
        title: 'Share holder equity',
        route: 'share-holder-equity',
        icon: 'equity.png'
    },
    {
        title: 'Expenses',
        route: 'expenses',
        icon: 'expenses.png'
    },
    {
        title: 'Income',
        route: 'income',
        icon: 'revenue.png'
    }
];


export const accountsSubmenus: AppMenu[] = [
    {
        title: 'Assets',
        route: '/accounts/assets',
        icon: 'asset.png'
    },
    {
        title: 'Liabilities',
        route: '/accounts/liabilities',
        icon: 'liability.png'
    },
    {
        title: 'Share holder equity',
        route: '/accounts/share-holder-equity',
        icon: 'equity.png'
    },
    {
        title: 'Expenses',
        route: '/accounts/expenses',
        icon: 'expenses.png'
    },
    {
        title: 'Income',
        route: '/accounts/income',
        icon: 'revenue.png'
    }
];

export enum AccountCategory {
    ASSET = 'asset',
    LIABILITY = 'liability',
    SHARE_HOLDER_EQUITY = 'share_holder_equity',
    EXPENSES = 'expenses',
    INCOME = 'income'
}