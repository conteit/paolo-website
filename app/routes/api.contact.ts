import type { ActionFunctionArgs } from "react-router";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactFormData {
  message: string;
}

export async function action({ request }: ActionFunctionArgs) {
  if (request.method !== "POST") {
    return Response.json({ error: "Method not allowed" }, { status: 405 });
  }

  try {
    const formData = await request.formData();
    const message = formData.get("message");

    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return Response.json({ error: "Message is required" }, { status: 400 });
    }

    if (message.length > 1000) {
      return Response.json(
        { error: "Message too long (max 1000 characters)" },
        { status: 400 }
      );
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
      from: "Contact Form <onboarding@resend.dev>",
      to: recipientEmail,
      subject: "New message from paolocontessi.com",
      text: `You received a new message from your website contact form:\n\n${message.trim()}`,
      replyTo: undefined,
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
