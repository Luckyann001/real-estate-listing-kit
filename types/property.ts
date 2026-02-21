export type Property = {
  id: string;
  slug: string;
  title: string;
  price: number;
  currency: "USD";
  location: {
    city: string;
    state: string;
    neighborhood: string;
    lat: number;
    lng: number;
    addressLine: string;
  };
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  propertyType: "House" | "Condo" | "Townhome" | "Loft";
  features: string[];
  description: string;
  images: string[];
};

export type PropertyFilters = {
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
};

export type InquiryPayload = {
  propertyId: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
};
