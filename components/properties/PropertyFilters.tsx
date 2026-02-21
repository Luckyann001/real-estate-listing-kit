import type { PropertyFilters } from "@/types/property";

type PropertyFiltersProps = {
  defaultFilters: PropertyFilters;
};

export default function PropertyFilters({ defaultFilters }: PropertyFiltersProps) {
  return (
    <form className="panel" style={{ padding: "1rem", display: "grid", gap: "0.75rem", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))" }}>
      <div>
        <label htmlFor="location">Location</label>
        <input id="location" name="location" placeholder="City, state, neighborhood" defaultValue={defaultFilters.location ?? ""} />
      </div>

      <div>
        <label htmlFor="minPrice">Min Price</label>
        <input id="minPrice" name="minPrice" type="number" min={0} step={10000} placeholder="250000" defaultValue={defaultFilters.minPrice ?? ""} />
      </div>

      <div>
        <label htmlFor="maxPrice">Max Price</label>
        <input id="maxPrice" name="maxPrice" type="number" min={0} step={10000} placeholder="1500000" defaultValue={defaultFilters.maxPrice ?? ""} />
      </div>

      <div>
        <label htmlFor="bedrooms">Bedrooms</label>
        <select id="bedrooms" name="bedrooms" defaultValue={defaultFilters.bedrooms ?? ""}>
          <option value="">Any</option>
          <option value="1">1+</option>
          <option value="2">2+</option>
          <option value="3">3+</option>
          <option value="4">4+</option>
          <option value="5">5+</option>
        </select>
      </div>

      <div style={{ display: "flex", alignItems: "end", gap: "0.5rem" }}>
        <button type="submit" className="button button-primary" style={{ width: "100%" }}>
          Apply Filters
        </button>
      </div>
    </form>
  );
}
