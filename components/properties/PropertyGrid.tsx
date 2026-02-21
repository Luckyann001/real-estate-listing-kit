import Link from "next/link";
import { formatCurrency } from "@/lib/properties";
import type { Property } from "@/types/property";

type PropertyGridProps = {
  properties: Property[];
};

export default function PropertyGrid({ properties }: PropertyGridProps) {
  if (!properties.length) {
    return (
      <section className="panel" style={{ padding: "1.5rem" }}>
        <h3 style={{ marginTop: 0 }}>No listings matched your filters.</h3>
        <small>Try broadening location terms or removing one of the price constraints.</small>
      </section>
    );
  }

  return (
    <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1rem" }}>
      {properties.map((property) => (
        <article key={property.id} className="panel" style={{ overflow: "hidden" }}>
          <img
            src={`${property.images[0]}?auto=format&fit=crop&w=1000&q=80`}
            alt={property.title}
            style={{ width: "100%", height: 180, objectFit: "cover" }}
          />
          <div style={{ padding: "1rem" }}>
            <h3 style={{ marginTop: 0, marginBottom: "0.4rem" }}>{property.title}</h3>
            <p style={{ marginTop: 0, marginBottom: "0.4rem", color: "#4e5d74" }}>
              {property.location.city}, {property.location.state} • {property.location.neighborhood}
            </p>
            <p style={{ marginTop: 0, fontWeight: 700, marginBottom: "0.4rem" }}>{formatCurrency(property.price)}</p>
            <small>
              {property.bedrooms} bd • {property.bathrooms} ba • {property.sqft.toLocaleString()} sqft
            </small>
            <div style={{ marginTop: "0.9rem" }}>
              <Link className="button button-secondary" href={`/properties/${property.slug}`}>
                View Details
              </Link>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}
