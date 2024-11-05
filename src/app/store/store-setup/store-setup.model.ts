export interface StoreSetup {
  id: string;
  name: string;
  description?: string;
  canRequestFromOtherStores?: boolean;
  allowSales?: boolean;
  canIssueToOtherStores?: boolean;
  canReceivePurchaseOrder?:boolean;
}
