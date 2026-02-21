import { notFound } from "next/navigation";
import InquiryForm from "@/components/properties/InquiryForm";
import ListingCopyEditorHelper from "@/components/properties/ListingCopyEditorHelper";
import PropertyGallery from "@/components/properties/PropertyGallery";
import { formatCurrency, getPropertyBySlug } from "@/lib/properties";

type PropertyDetailPageProps = {
  params: { slug: string };
};

export default function PropertyDetailPage({ params }: PropertyDetailPageProps) {
  const property = getPropertyBySlug(params.slug);

  if (!property) {
    notFound();
  }

  return (
    <main className="container" style={{ display: "grid", gap: "1rem" }}>
      <header className="panel" style={{ padding: "1rem" }}>
        <p style={{ marginTop: 0, marginBottom: "0.35rem", color: "#4e5d74" }}>
          {property.location.addressLine}, {property.location.city}, {property.location.state}
        </p>
        <h1 style={{ marginTop: 0, marginBottom: "0.5rem" }}>{property.title}</h1>
        <p style={{ marginTop: 0, marginBottom: "0.5rem", fontWeight: 700 }}>{formatCurrency(property.price)}</p>
        <small>
          {property.bedrooms} bd • {property.bathrooms} ba • {property.sqft.toLocaleString()} sqft • {property.propertyType}
        </small>
      </header>

      <PropertyGallery images={property.images} title={property.title} />

      <section className="detail-grid">
        <article className="panel" style={{ padding: "1rem" }}>
          <h3 style={{ marginTop: 0 }}>Overview</h3>
          <p>{property.description}</p>
          <h4>Features</h4>
          <ul style={{ marginBottom: 0, paddingLeft: "1rem" }}>
            {property.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </article>

        <InquiryForm propertyId={property.id} propertyTitle={property.title} />
      </section>

      <section className="panel" style={{ padding: "1rem" }}>
        <h3 style={{ marginTop: 0 }}>Map Integration Point</h3>
        <small>
          `lat: {property.location.lat}, lng: {property.location.lng}` can be passed into your map provider component (Google Maps, Mapbox, Leaflet).
        </small>
      </section>

      <ListingCopyEditorHelper
        title={property.title}
        location={`${property.location.city}, ${property.location.state}`}
        initialDescription={property.description}
      />
    </main>
  );
}
