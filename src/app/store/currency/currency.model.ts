export interface Currency {
  id: string;
  name: string;
  description?: string;
  symbol: string;
  exchangeRate?: string;
  isDefaultLocalCurrency?: boolean;
}
