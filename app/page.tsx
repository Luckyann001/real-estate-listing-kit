import Link from "next/link";

export default function HomePage() {
  return (
    <main className="container" style={{ paddingTop: "3rem" }}>
      <section className="panel" style={{ padding: "2rem", textAlign: "center" }}>
        <p style={{ marginTop: 0, color: "#4e5d74" }}>AI Real Estate Listing Kit</p>
        <h1 style={{ marginTop: 0 }}>Property browsing, inquiry capture, and AI copy helper</h1>
        <p style={{ marginBottom: "1.4rem", color: "#4e5d74" }}>
          Start with the property listing page to see filters, map integration hooks, and detail views.
        </p>
        <Link className="button button-primary" href="/properties">
          Open Listings
        </Link>
      </section>
    </main>
  );
}
