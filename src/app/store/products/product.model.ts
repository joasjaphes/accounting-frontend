export interface Product {
  id: string;
  name: string;
  description?: string;
  type: string;
  price: number;
}

export type ProductType = 'Physical' | 'Service';
