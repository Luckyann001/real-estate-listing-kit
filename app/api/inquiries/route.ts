import { NextResponse } from "next/server";
import { properties } from "@/lib/properties";
import type { InquiryPayload } from "@/types/property";

const inquiries: Array<InquiryPayload & { createdAt: string }> = [];

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  const body = (await request.json()) as InquiryPayload;

  if (!body.propertyId || !body.name || !body.email || !body.message) {
    return NextResponse.json({ message: "Missing required fields." }, { status: 400 });
  }

  if (!isValidEmail(body.email)) {
    return NextResponse.json({ message: "Invalid email address." }, { status: 400 });
  }

  const property = properties.find((item) => item.id === body.propertyId);
  if (!property) {
    return NextResponse.json({ message: "Property not found." }, { status: 404 });
  }

  inquiries.push({ ...body, createdAt: new Date().toISOString() });

  return NextResponse.json({
    ok: true,
    message: "Inquiry saved.",
    inquiryCount: inquiries.length
  });
}
