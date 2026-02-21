"use client";

import { useState } from "react";

type InquiryFormProps = {
  propertyId: string;
  propertyTitle: string;
};

export default function InquiryForm({ propertyId, propertyTitle }: InquiryFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState<string>("");

  async function handleSubmit(formData: FormData) {
    setStatus("loading");
    setMessage("");

    try {
      const payload = {
        propertyId,
        name: String(formData.get("name") ?? ""),
        email: String(formData.get("email") ?? ""),
        phone: String(formData.get("phone") ?? ""),
        message: String(formData.get("message") ?? "")
      };

      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = (await response.json()) as { message?: string };
      if (!response.ok) {
        throw new Error(data.message ?? "Unable to submit inquiry.");
      }

      setStatus("success");
      setMessage("Inquiry submitted. An agent will reach out shortly.");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Submission failed.");
    }
  }

  return (
    <section className="panel" style={{ padding: "1rem" }}>
      <h3 style={{ marginTop: 0 }}>Request Info</h3>
      <small style={{ display: "block", marginBottom: "0.9rem" }}>Send a question about {propertyTitle}.</small>

      <form
        action={async (formData) => {
          await handleSubmit(formData);
        }}
        style={{ display: "grid", gap: "0.75rem" }}
      >
        <div>
          <label htmlFor="name">Name</label>
          <input id="name" name="name" required />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required />
        </div>
        <div>
          <label htmlFor="phone">Phone (optional)</label>
          <input id="phone" name="phone" />
        </div>
        <div>
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            required
            rows={4}
            defaultValue={`Hi, I'm interested in ${propertyTitle}. Please share availability and next steps.`}
          />
        </div>

        <button type="submit" className="button button-primary" disabled={status === "loading"}>
          {status === "loading" ? "Submitting..." : "Send Inquiry"}
        </button>

        {message ? <small style={{ color: status === "error" ? "#b22a2a" : "#1d6f42" }}>{message}</small> : null}
      </form>
    </section>
  );
}
