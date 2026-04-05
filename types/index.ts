export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  images: string[];
  category?: string;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export interface OrderItem {
  product: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  status: string;
  stripeId?: string;
  createdAt: Date;
}

export type UserRole = 'USER' | 'ADMIN';

