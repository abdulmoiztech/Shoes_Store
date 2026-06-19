export interface ColorOption {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  discountPrice?: number;
  brand: string;
  rating: number;
  reviewsCount: number;
  category: 'Running' | 'Casual' | 'Formal' | 'Sports' | 'Sneakers' | 'Kids';
  gender: 'Men' | 'Women' | 'Kids' | 'Unisex';
  sizes: number[];
  colors: ColorOption[];
  images: string[]; // Standard array of image URLs
  description: string;
  features: string[]; // Brief details (e.g., "Breathable mesh", "Cushioned sole")
  featured?: boolean;
  bestSeller?: boolean;
  newArrival?: boolean;
  stock: number;
}

export interface CartItem {
  id: string; // Unique combinations: `${productId}-${selectedSize}-${selectedColorName}`
  product: Product;
  selectedSize: number;
  selectedColor: ColorOption;
  quantity: number;
}

export interface FilterState {
  searchQuery: string;
  brands: string[];
  categories: string[];
  genders: string[];
  sizes: number[];
  colors: string[];
  priceRange: [number, number];
  sortBy: 'featured' | 'price-low' | 'price-high' | 'rating';
}

export interface OrderDetails {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  zipCode: string;
  phone: string;
  cardNumber: string;
  cardExpiry: string;
  cardCvc: string;
}
