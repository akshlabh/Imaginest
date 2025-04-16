/* eslint-disable camelcase */
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook } from "svix";
import { clerkClient ,WebhookEvent} from "@clerk/nextjs/server";

import { createUser, deleteUser, updateUser } from "@/lib/actions/user.action";

// Webhook handler
export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SIGNING_SECRET;

  if (!WEBHOOK_SECRET) {
    console.error("Missing CLERK_WEBHOOK_SIGNING_SECRET");
    return new Response("Webhook secret missing", { status: 500 });
  }

  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    console.error("Missing svix headers");
    return new Response("Missing svix headers", { status: 400 });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(WEBHOOK_SECRET);
  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Webhook verification failed:", err);
    return new Response("Invalid signature", { status: 400 });
  }

  const eventType = evt.type;
  const { id } = evt.data;

  console.log(`[CLERK WEBHOOK] Received event: ${eventType}`);

  try {
    if (eventType === "user.created") {
      const { id, email_addresses, image_url, first_name, last_name, username } = evt.data;

      const newUser = await createUser({
        clerkId: id,
        email: email_addresses[0]?.email_address || "",
        username: username || "",
        firstName: first_name || "",
        lastName: last_name || "",
        photo: image_url || "",
      });

      const client = await clerkClient(); // 👈 await the function
      await client.users.updateUserMetadata(id, {
        publicMetadata: {
        userId: newUser._id,
        },
      });


      return NextResponse.json({ message: "User created", user: newUser });
    }

    if (eventType === "user.updated") {
      const { id, image_url, first_name, last_name, username } = evt.data;

      const updatedUser = await updateUser(id, {
        firstName: first_name || "",
        lastName: last_name || "",
        username: username || "",
        photo: image_url || "",
      });

      return NextResponse.json({ message: "User updated", user: updatedUser });
    }

    if (eventType === "user.deleted") {
      const userId1 = id || "";
      const deletedUser = await deleteUser(userId1);
      return NextResponse.json({ message: "User deleted", user: deletedUser });
    }

    console.log(`Unhandled event type: ${eventType}`);
    return new Response("Unhandled event type", { status: 200 });

  } catch (error) {
    console.error(`Webhook handler error for event ${eventType}:`, error);
    return NextResponse.json(
      { error: "Internal server error", details: (error as any).message },
      { status: 500 }
    );
  }
}
