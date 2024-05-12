export interface Product {
  id: string;
  name: string;
  description?: string;
  type: ProductType;
}

export type ProductType = 'Physical' | 'Service';
