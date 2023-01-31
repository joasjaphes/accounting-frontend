export interface AppMenu {
    title: string;
    icon: string;
    route: string;
}
export const appMenus: AppMenu[] = [
    {
        title: 'Dashboard',
        icon: 'dashboard.png',
        route: 'dashboard'
    },
    {
        title: 'Accounts',
        icon: 'account.png',
        route: 'accounts'
    },
    {
        title: 'Transactions',
        icon: 'transaction.png',
        route: 'transactions'
    },
    {
        title: 'Journal Entry',
        icon: 'journal-entry.png',
        route: 'journal-entry'
    },
    {
        title: 'Financial Statements',
        icon: 'financial-statement.png',
        route: 'financial-statements'
    }
];
