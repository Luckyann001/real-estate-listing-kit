import { NextRequest, NextResponse } from "next/server";
import { filterProperties } from "@/lib/properties";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const location = searchParams.get("location")?.trim() || undefined;
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  const bedrooms = searchParams.get("bedrooms");

  const results = filterProperties({
    location,
    minPrice: minPrice ? Number(minPrice) : undefined,
    maxPrice: maxPrice ? Number(maxPrice) : undefined,
    bedrooms: bedrooms ? Number(bedrooms) : undefined
  });

  return NextResponse.json({ data: results, count: results.length });
}
