export interface FinancialPeriod {
  id: string;
  name: string;
  description?: string;
  startDate:string;
  endDate:string;
  costingMethod:string;
  status: 'OPEN' | 'CLOSED';
  companyId?: string;
}
