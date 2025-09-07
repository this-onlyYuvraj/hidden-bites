// types.ts
export interface Review {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  rating: number;
  comment: string;
  shopId: string;
  userId: string;
}

export interface Shop {
  createdAt: string | number | Date;
  id: string;
  name: string;
  type: string;
  specialty: string;
  priceRange: string;
  location: string;
  image: string;
  addedBy: string;
  reviews: Review[];
  rating: number;
  reviewCount: number;
  lat: number | null;
  lng: number | null;
}
