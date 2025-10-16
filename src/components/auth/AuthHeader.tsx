import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';

export default function AuthHeader() {
  return (
    <div className="flex items-center gap-4">
      <SignedOut>
        <SignInButton 
          mode="modal"
          appearance={{
            elements: {
              rootBox: "inline-flex",
              button: "bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            }
          }}
        >
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            Iniciar Sesión
          </button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton 
          appearance={{
            elements: {
              avatarBox: "w-8 h-8",
              userButtonPopoverCard: "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700",
              userButtonPopoverActions: "bg-white dark:bg-gray-800"
            }
          }}
          userProfileMode="modal"
          afterSignOutUrl="/"
        />
      </SignedIn>
    </div>
  );
}