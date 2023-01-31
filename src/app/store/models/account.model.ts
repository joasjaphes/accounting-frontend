import { AccountCategory } from '../../modules/accounts/accounts-categories';

export interface Account {
    id: string;
    name: string;
    description?: string;
    balance?: number;
    status: 'active | inActive';
    category: AccountCategory.ASSET | AccountCategory.EXPENSES | AccountCategory.INCOME | AccountCategory.LIABILITY | AccountCategory.SHARE_HOLDER_EQUITY;
}
