import { SignedIn, SignedOut, UserButton, SignInButton } from '@clerk/nextjs';

export default function Home() {
  return (
    <>
      <SignedIn>
        <UserButton afterSignOutUrl="/" />
      </SignedIn>
      <SignedOut>
        <SignInButton mode="modal" />
      </SignedOut>
    </>
  );
}
