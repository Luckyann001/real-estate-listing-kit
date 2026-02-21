# AI Real Estate Listing Kit

Property listing kit built with Next.js + TypeScript. It includes searchable property browsing, listing detail pages, inquiry submission, and an AI-assisted listing copy endpoint/editor helper.

## Included Features

- Property listing page with filter controls for location, price range, and bedrooms
- Property detail page with gallery, specs, and map integration points
- Inquiry form component + backend route for capturing lead requests
- AI copy endpoint (`/api/ai/property-copy`) for listing description improvements
- Editor helper UI on property detail pages for generating copy variants

## Project Structure

- `app/properties/page.tsx` listing page
- `app/properties/[slug]/page.tsx` detail template
- `components/properties/PropertyGrid.tsx` listing cards
- `components/properties/PropertyFilters.tsx` search/filter controls
- `components/properties/PropertyGallery.tsx` listing image gallery
- `components/properties/InquiryForm.tsx` lead capture form
- `components/properties/ListingCopyEditorHelper.tsx` AI editor helper
- `app/api/properties/route.ts` filtered property API
- `app/api/inquiries/route.ts` inquiry capture API
- `app/api/ai/property-copy/route.ts` AI listing copy API

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Add environment variables in `.env.local`:

```bash
OPENAI_API_KEY=your_openai_api_key
```

3. Run the app:

```bash
npm run dev
```

4. Open `http://localhost:3000/properties`

## API Notes

### `GET /api/properties`

Query params:
- `location` string match against city/state/neighborhood
- `minPrice` numeric
- `maxPrice` numeric
- `bedrooms` minimum bedroom count

### `POST /api/inquiries`

Payload:

```json
{
  "propertyId": "p-101",
  "name": "Alex Buyer",
  "email": "alex@example.com",
  "phone": "555-0100",
  "message": "Can I schedule a tour this weekend?"
}
```

### `POST /api/ai/property-copy`

Payload:

```json
{
  "title": "Sunset Hills Modern Villa",
  "location": "Austin, TX",
  "description": "Open-concept living...",
  "tone": "luxury and concise"
}
```

Response:

```json
{
  "copy": "Polished AI-generated listing paragraph..."
}
```

## Integration Notes

- Replace `lib/properties.ts` sample data with your DB or CMS provider.
- `location.lat`/`location.lng` are map integration points for Mapbox/Google/Leaflet.
- The inquiry route currently stores submissions in-memory for kit/demo use; replace with persistent storage (Postgres, CRM webhook, etc.) in production.
- The AI copy endpoint uses OpenAI Responses API and requires `OPENAI_API_KEY`.

## Genix Upload Deliverables Coverage

- Property browsing UX with filters: implemented in `/properties`
- Property detail template with gallery: implemented in `/properties/[slug]`
- Inquiry capture flow: form + `/api/inquiries`
- AI-generated copy variants: editor helper + `/api/ai/property-copy`
