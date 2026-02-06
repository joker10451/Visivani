export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  size: string;
  colors: number;
  badge?: 'new' | 'bestseller' | 'so-coming';
  inStock: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface Review {
  id: string;
  author: string;
  avatar?: string;
  rating: number;
  text: string;
  productName: string;
  date: string;
}

export interface SOProject {
  id: string;
  name: string;
  description: string;
  image: string;
  startDate: string;
  endDate: string;
  participants: number;
  maxParticipants?: number;
  status: 'upcoming' | 'active' | 'completed';
  conditions: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image?: string;
  date: string;
  tags: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  favorites: string[];
  orders: Order[];
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  date: string;
  shippingAddress?: string;
}

export type FilterOption = {
  id: string;
  label: string;
  value: string;
};

export type FilterCategory = {
  id: string;
  name: string;
  options: FilterOption[];
};
