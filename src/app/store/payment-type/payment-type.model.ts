export interface PaymentType {
  id: string;
  name: string;
  description?: string;
  displayInSales?: boolean;
  displayInDebtorsPayments?: boolean;
  displayInCreditPayments?: boolean;
  displayInCustomerDeposits?: boolean;
  displayInRefunds?: boolean;
  displayInCashierReports?: boolean;
  displayInBankingReceivingMoney?: boolean;
  companyId?: string;
}
