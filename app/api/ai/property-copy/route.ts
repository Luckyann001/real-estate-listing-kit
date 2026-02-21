import OpenAI from "openai";
import { NextResponse } from "next/server";

type CopyRequest = {
  title?: string;
  location?: string;
  description?: string;
  tone?: string;
};

export async function POST(request: Request) {
  const payload = (await request.json()) as CopyRequest;

  if (!payload.description || !payload.title || !payload.location) {
    return NextResponse.json({ message: "title, location, and description are required." }, { status: 400 });
  }

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { message: "OPENAI_API_KEY is missing. Add it to your environment variables." },
      { status: 500 }
    );
  }

  try {
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const completion = await client.responses.create({
      model: "gpt-4.1-mini",
      input: [
        {
          role: "system",
          content: "You rewrite residential property copy. Keep it factual, vivid, and concise. Return one polished paragraph only."
        },
        {
          role: "user",
          content:
            `Rewrite this listing description in a ${payload.tone ?? "professional"} tone. ` +
            `Property title: ${payload.title}. Location: ${payload.location}. ` +
            `Current description: ${payload.description}`
        }
      ]
    });

    const generated = completion.output_text?.trim();
    if (!generated) {
      return NextResponse.json({ message: "No copy generated." }, { status: 502 });
    }

    return NextResponse.json({ copy: generated });
  } catch {
    return NextResponse.json({ message: "AI provider request failed." }, { status: 502 });
  }
}
