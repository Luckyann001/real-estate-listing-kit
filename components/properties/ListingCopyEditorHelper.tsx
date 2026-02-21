"use client";

import { useState } from "react";

type ListingCopyEditorHelperProps = {
  title: string;
  location: string;
  initialDescription: string;
};

export default function ListingCopyEditorHelper({ title, location, initialDescription }: ListingCopyEditorHelperProps) {
  const [draft, setDraft] = useState(initialDescription);
  const [tone, setTone] = useState("luxury and clear");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState("");

  async function generate() {
    setStatus("loading");
    setError("");

    try {
      const response = await fetch("/api/ai/property-copy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, location, description: draft, tone })
      });

      const data = (await response.json()) as { copy?: string; message?: string };
      if (!response.ok || !data.copy) {
        throw new Error(data.message ?? "Unable to generate copy.");
      }

      setDraft(data.copy);
      setStatus("idle");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Generation failed.");
    }
  }

  return (
    <section className="panel" style={{ padding: "1rem", display: "grid", gap: "0.75rem" }}>
      <h3 style={{ marginTop: 0, marginBottom: 0 }}>AI Listing Copy Helper</h3>
      <small>Use this editor helper to generate cleaner listing language from the current draft.</small>

      <div>
        <label htmlFor="tone">Tone direction</label>
        <input id="tone" value={tone} onChange={(event) => setTone(event.target.value)} placeholder="luxury and concise" />
      </div>

      <div>
        <label htmlFor="copyDraft">Editable description</label>
        <textarea id="copyDraft" rows={7} value={draft} onChange={(event) => setDraft(event.target.value)} />
      </div>

      <button type="button" className="button button-secondary" onClick={generate} disabled={status === "loading"}>
        {status === "loading" ? "Generating..." : "Generate AI Variant"}
      </button>

      {error ? <small style={{ color: "#b22a2a" }}>{error}</small> : null}
    </section>
  );
}
