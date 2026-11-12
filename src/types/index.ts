// типи даних з мого бекенда

export type Store = {
  _id: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  rating: number;
};

export type CustomerReview = {
  _id: string;
  name: string;
  testimonial: string;
  photo?: string; // поки нема на беку
};

export type Product = {
  _id: string;
  photo: string;
  name: string;
  suppliers: string;
  stock: number;
  price: number;
  category: string;
  description?: string; // поки нема на беку
  rating?: number; // поки нема на беку
};

export const CATEGORIES = [
  'Medicine',
  'Heart',
  'Head',
  'Hand',
  'Leg',
  'Dental Care',
  'Skin Care',
];

export type CartItem = {
  productId: Product | null; // null, якщо продукт видалили з бази
  quantity: number;
};

export type Cart = {
  products: CartItem[];
  totalPrice: number;
};

export type ProductsResponse = {
  page: number;
  perPage: number;
  totalItems: number;
  totalPage: number;
  products: Product[];
};
