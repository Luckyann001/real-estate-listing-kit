import { Property, PropertyFilters } from "@/types/property";

export const properties: Property[] = [
  {
    id: "p-101",
    slug: "sunset-hills-modern-villa",
    title: "Sunset Hills Modern Villa",
    price: 1285000,
    currency: "USD",
    location: {
      city: "Austin",
      state: "TX",
      neighborhood: "Sunset Hills",
      lat: 30.3076,
      lng: -97.7521,
      addressLine: "1428 Ridgeview Lane"
    },
    bedrooms: 4,
    bathrooms: 3,
    sqft: 2870,
    propertyType: "House",
    features: ["Pool", "Home Office", "EV Charger", "Smart Thermostat"],
    description:
      "Open-concept living with oversized windows, custom kitchen cabinetry, and private backyard pool. Minutes from downtown dining and trails.",
    images: [
      "https://images.unsplash.com/photo-1600585152915-d208bec867a1",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde"
    ]
  },
  {
    id: "p-102",
    slug: "riverfront-loft-district",
    title: "Riverfront Loft District",
    price: 765000,
    currency: "USD",
    location: {
      city: "Portland",
      state: "OR",
      neighborhood: "Pearl District",
      lat: 45.5337,
      lng: -122.6858,
      addressLine: "92 NW Broadwater St"
    },
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1520,
    propertyType: "Loft",
    features: ["Water View", "Rooftop Access", "Gym", "Concierge"],
    description:
      "Industrial-chic loft with floor-to-ceiling river views and polished concrete finishes. Walkable to galleries, coffee bars, and transit.",
    images: [
      "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4",
      "https://images.unsplash.com/photo-1494526585095-c41746248156",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3"
    ]
  },
  {
    id: "p-103",
    slug: "cedar-park-family-home",
    title: "Cedar Park Family Home",
    price: 549000,
    currency: "USD",
    location: {
      city: "Nashville",
      state: "TN",
      neighborhood: "Cedar Park",
      lat: 36.1652,
      lng: -86.7832,
      addressLine: "4111 Larkspur Ave"
    },
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1985,
    propertyType: "Townhome",
    features: ["Fenced Yard", "Two-Car Garage", "Updated HVAC", "School Zone A"],
    description:
      "Light-filled family home with renovated kitchen, dedicated dining room, and flexible bonus space for playroom or studio.",
    images: [
      "https://images.unsplash.com/photo-1600573472550-8090b5e0745e",
      "https://images.unsplash.com/photo-1600585154203-bf8a3f5eafca",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0"
    ]
  },
  {
    id: "p-104",
    slug: "highland-condo-with-terrace",
    title: "Highland Condo with Terrace",
    price: 899000,
    currency: "USD",
    location: {
      city: "Denver",
      state: "CO",
      neighborhood: "Highland",
      lat: 39.762,
      lng: -105.011,
      addressLine: "1832 W Elm Court"
    },
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1740,
    propertyType: "Condo",
    features: ["Private Terrace", "Mountain View", "Secure Parking", "Gas Fireplace"],
    description:
      "Corner condo with panoramic mountain sightlines, chef-ready kitchen, and oversized terrace designed for year-round entertaining.",
    images: [
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85"
    ]
  }
];

export function filterProperties(filters: PropertyFilters): Property[] {
  return properties.filter((property) => {
    if (filters.location) {
      const token = filters.location.toLowerCase();
      const loc = `${property.location.city} ${property.location.state} ${property.location.neighborhood}`.toLowerCase();
      if (!loc.includes(token)) return false;
    }

    if (typeof filters.minPrice === "number" && property.price < filters.minPrice) {
      return false;
    }

    if (typeof filters.maxPrice === "number" && property.price > filters.maxPrice) {
      return false;
    }

    if (typeof filters.bedrooms === "number" && property.bedrooms < filters.bedrooms) {
      return false;
    }

    return true;
  });
}

export function getPropertyBySlug(slug: string): Property | undefined {
  return properties.find((property) => property.slug === slug);
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
}
