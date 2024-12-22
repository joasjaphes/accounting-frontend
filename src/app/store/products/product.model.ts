export interface Product {
  id: string;
  name: string;
  description?: string;
  type: string;
  price: number;
  imageUrl?: string;
}

export type ProductType = 'Physical' | 'Service';
