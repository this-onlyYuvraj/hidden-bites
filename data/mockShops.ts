export interface Shop {
  id: string;
  name: string;
  type: string;
  specialty: string;
  priceRange: string;
  location: string;
  rating: number;
  reviewCount: number;
  image: string;
  addedBy: string;
  description?: string;
  reviews?: Review[];
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export const mockShops: Shop[] = [
  {
    id: "1",
    name: "Chai Corner",
    type: "Tea",
    specialty: "Masala Chai & Samosas",
    priceRange: "50-150",
    location: "MG Road, Pune",
    rating: 4.5,
    reviewCount: 127,
    image: "https://in.pinterest.com/pin/21603273207109636",
    addedBy: "Rahul K.",
    description: "A hidden gem serving the most authentic masala chai in town. The owner has been perfecting his recipe for over 20 years.",
    reviews: [
      {
        id: "r1",
        userId: "u1",
        userName: "Priya S.",
        rating: 5,
        comment: "Best chai in the city! The ginger adds the perfect kick.",
        createdAt: "2024-01-15",
      },
      {
        id: "r2",
        userId: "u2",
        userName: "Amit T.",
        rating: 4,
        comment: "Great atmosphere and friendly service. Samosas are crispy and delicious.",
        createdAt: "2024-01-10",
      },
    ],
  },
  {
    id: "2",
    name: "Spice Street",
    type: "Street Food",
    specialty: "Pani Puri & Bhel",
    priceRange: "30-100",
    location: "FC Road, Pune",
    rating: 4.2,
    reviewCount: 89,
    image: "https://in.pinterest.com/pin/21603273207109636/",
    addedBy: "Sneha M.",
    description: "Authentic street food experience with incredibly fresh ingredients and traditional recipes passed down through generations.",
    reviews: [
      {
        id: "r3",
        userId: "u3",
        userName: "Vikram P.",
        rating: 4,
        comment: "Love the tangy pani puri! Always fresh and flavorful.",
        createdAt: "2024-01-12",
      },
    ],
  },
  {
    id: "3",
    name: "Bean & Brew",
    type: "Coffee",
    specialty: "Artisan Coffee & Pastries",
    priceRange: "150-400",
    location: "Koregaon Park, Pune",
    rating: 4.7,
    reviewCount: 203,
    image: "https://in.pinterest.com/pin/21603273207109636/",
    addedBy: "Alex R.",
    description: "Cozy coffee shop with a curated selection of single-origin beans and freshly baked pastries. Perfect for working or catching up with friends.",
    reviews: [
      {
        id: "r4",
        userId: "u4",
        userName: "Maya D.",
        rating: 5,
        comment: "Amazing coffee quality and such a peaceful ambiance for work!",
        createdAt: "2024-01-14",
      },
      {
        id: "r5",
        userId: "u5",
        userName: "Rohan K.",
        rating: 4,
        comment: "Great pastries and the barista really knows their craft.",
        createdAt: "2024-01-08",
      },
    ],
  },
  {
    id: "4",
    name: "Dosa Delight",
    type: "South Indian",
    specialty: "Crispy Dosas & Filter Coffee",
    priceRange: "80-200",
    location: "Shivaji Nagar, Pune",
    rating: 4.3,
    reviewCount: 156,
    image: "https://in.pinterest.com/pin/21603273207109636/",
    addedBy: "Lakshmi V.",
    description: "Family-run restaurant serving traditional South Indian breakfast with perfectly crispy dosas and authentic filter coffee.",
  },
  {
    id: "5",
    name: "Bubble Tea Paradise",
    type: "Drinks",
    specialty: "Bubble Tea & Smoothies",
    priceRange: "120-300",
    location: "Viman Nagar, Pune",
    rating: 4.1,
    reviewCount: 94,
    image: "https://in.pinterest.com/pin/21603273207109636/",
    addedBy: "Jenny L.",
    description: "Trendy bubble tea spot with creative flavors and Instagram-worthy presentations. Great for a refreshing treat!",
  },
  {
    id: "6",
    name: "Midnight Biryani",
    type: "Biryani",
    specialty: "Hyderabadi Biryani",
    priceRange: "200-500",
    location: "Camp Area, Pune",
    rating: 4.6,
    reviewCount: 312,
    image: "https://in.pinterest.com/pin/21603273207109636/",
    addedBy: "Arjun H.",
    description: "Late-night biryani specialist serving authentic Hyderabadi biryani with perfectly spiced meat and fragrant rice.",
  },
];

export const mockUser = {
  name: "John Doe",
  email: "john@example.com",
  avatar: "",
};