import type { ActionFunctionArgs } from "react-router";
import { Resend } from "resend";

const isDev = process.env.NODE_ENV === "development";
const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

interface TurnstileVerifyResponse {
  success: boolean;
  "error-codes"?: string[];
}

async function verifyTurnstileToken(token: string): Promise<boolean> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;
  if (!secretKey) {
    console.error("TURNSTILE_SECRET_KEY environment variable not set");
    return false;
  }

  try {
    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          secret: secretKey,
          response: token,
        }),
      }
    );

    const data = (await response.json()) as TurnstileVerifyResponse;
    return data.success;
  } catch (error) {
    console.error("Turnstile verification error:", error);
    return false;
  }
}

export async function action({ request }: ActionFunctionArgs) {
  if (request.method !== "POST") {
    return Response.json({ error: "Method not allowed" }, { status: 405 });
  }

  try {
    const formData = await request.formData();
    const message = formData.get("message");
    const email = formData.get("email");
    const turnstileToken = formData.get("turnstileToken");

    // Verify Turnstile token if secret key is configured
    if (process.env.TURNSTILE_SECRET_KEY) {
      if (!turnstileToken || typeof turnstileToken !== "string") {
        return Response.json(
          { error: "Security verification required" },
          { status: 400 }
        );
      }

      const isValidToken = await verifyTurnstileToken(turnstileToken);
      if (!isValidToken) {
        return Response.json(
          { error: "Security verification failed. Please try again." },
          { status: 400 }
        );
      }
    }

    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return Response.json({ error: "Message is required" }, { status: 400 });
    }

    if (message.length > 1000) {
      return Response.json(
        { error: "Message too long (max 1000 characters)" },
        { status: 400 }
      );
    }

    // Validate email if provided
    let replyToEmail: string | undefined;
    if (email && typeof email === "string" && email.trim().length > 0) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        return Response.json({ error: "Invalid email address" }, { status: 400 });
      }
      replyToEmail = email.trim();
    }

    const emailBody = replyToEmail
      ? `You received a new message from your website contact form:\n\nFrom: ${replyToEmail}\n\n${message.trim()}`
      : `You received a new message from your website contact form:\n\n${message.trim()}`;

    // Dev mode: log instead of sending
    if (!resend || isDev) {
      console.log("=== DEV MODE: Contact form submission ===");
      console.log("From:", replyToEmail || "(no email provided)");
      console.log("Message:", message.trim());
      console.log("==========================================");
      return Response.json({ success: true });
    }

    const recipientEmail = process.env.CONTACT_EMAIL;
    if (!recipientEmail) {
      console.error("CONTACT_EMAIL environment variable not set");
      return Response.json(
        { error: "Contact form is not configured" },
        { status: 500 }
      );
    }

    const { error } = await resend.emails.send({
      from: "Contact Form <hello@paolocontessi.me>",
      to: recipientEmail,
      subject: replyToEmail
        ? `New message from ${replyToEmail}`
        : "New message from paolocontessi.me",
      text: emailBody,
      replyTo: replyToEmail,
    });

    if (error) {
      console.error("Resend error:", error);
      return Response.json(
        { error: "Failed to send message" },
        { status: 500 }
      );
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}
