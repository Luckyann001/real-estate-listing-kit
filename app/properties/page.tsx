import PropertyFilters from "@/components/properties/PropertyFilters";
import PropertyGrid from "@/components/properties/PropertyGrid";
import { filterProperties } from "@/lib/properties";
import type { PropertyFilters as PropertyFiltersType } from "@/types/property";

type PropertiesPageProps = {
  searchParams?: {
    location?: string;
    minPrice?: string;
    maxPrice?: string;
    bedrooms?: string;
  };
};

function parseFilters(searchParams: PropertiesPageProps["searchParams"]): PropertyFiltersType {
  return {
    location: searchParams?.location?.trim() || undefined,
    minPrice: searchParams?.minPrice ? Number(searchParams.minPrice) : undefined,
    maxPrice: searchParams?.maxPrice ? Number(searchParams.maxPrice) : undefined,
    bedrooms: searchParams?.bedrooms ? Number(searchParams.bedrooms) : undefined
  };
}

export default function PropertiesPage({ searchParams }: PropertiesPageProps) {
  const filters = parseFilters(searchParams);
  const results = filterProperties(filters);

  return (
    <main className="container" style={{ display: "grid", gap: "1rem" }}>
      <header>
        <p style={{ color: "#4e5d74", marginBottom: "0.3rem" }}>Property Discovery</p>
        <h1 style={{ marginTop: 0, marginBottom: "0.4rem" }}>Browse Listings</h1>
        <small>Map integration point: each card includes geolocation metadata for downstream map rendering.</small>
      </header>

      <PropertyFilters defaultFilters={filters} />

      <section>
        <small style={{ display: "block", marginBottom: "0.6rem" }}>{results.length} listing(s) found</small>
        <PropertyGrid properties={results} />
      </section>
    </main>
  );
}
