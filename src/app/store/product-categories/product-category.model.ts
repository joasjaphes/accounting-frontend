export interface ProductCategory {
    id: string;
    name: string;
    description?: string;
    salesTax?: string;
    purchasingTax?: string;
    COGSAccount?: string;
    inventoryAccount?: string;
    salesAccount?: string;
    companyId?: string;
}