import { verifyWebhook } from '@clerk/nextjs/webhooks';
import { WebhookEvent } from '@clerk/nextjs/server';
import { createUser, deleteUser, updateUser } from '@/lib/actions/user.action';

export async function POST(req: Request) {
  try {
    const evt = await verifyWebhook(req);
    const event = evt as WebhookEvent;

    const rawId = event.data?.id;
    if (!rawId) {
      return new Response('Missing user ID in webhook payload', { status: 400 });
    }

    const id: string = rawId;
    const eventType = event.type;

    console.log(`Received webhook: ${eventType}, ID: ${id}`);

    if (eventType === 'user.created') {
      const { email_addresses, image_url, first_name, last_name, username } = event.data;

      const user = {
        clerkId: id,
        email: email_addresses[0]?.email_address ?? '',
        username: username ?? '',
        firstName: first_name ?? '',
        lastName: last_name ?? '',
        photo: image_url,
      };

      const newUser = await createUser(user);
      return new Response(JSON.stringify({ message: 'User created', user: newUser }), {
        status: 200,
      });
    }

    if (eventType === 'user.updated') {
      const { image_url, first_name, last_name, username } = event.data;

      const user = {
        firstName: first_name ?? '',
        lastName: last_name ?? '',
        username: username ?? '',
        photo: image_url,
      };

      const updatedUser = await updateUser(id, user);
      return new Response(JSON.stringify({ message: 'User updated', user: updatedUser }), {
        status: 200,
      });
    }

    if (eventType === 'user.deleted') {
      const deletedUser = await deleteUser(id);
      return new Response(JSON.stringify({ message: 'User deleted', user: deletedUser }), {
        status: 200,
      });
    }

    return new Response('Event ignored', { status: 200 });
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error verifying webhook', { status: 400 });
  }
}
