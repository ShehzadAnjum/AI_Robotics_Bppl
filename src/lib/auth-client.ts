import { createAuthClient } from 'better-auth/react';

// Get backend URL based on environment
const getBackendUrl = () => {
  // Check if running in browser
  if (typeof window !== 'undefined') {
    // Production: GitHub Pages → Vercel backend
    if (window.location.hostname.includes('github.io')) {
      return 'https://airobobookmagic.vercel.app';
    }
    // Development: Local backend
    return 'http://localhost:3000';
  }

  // SSR fallback (shouldn't be reached due to BrowserOnly wrapper)
  return 'http://localhost:3000';
};

// Create better-auth client for React
export const authClient = createAuthClient({
  baseURL: getBackendUrl(),
  credentials: 'include', // Required for cross-domain cookies
});

// Export auth hooks and methods
export const {
  signIn,
  signUp,
  signOut,
  useSession,
} = authClient;

// Helper to check if user is authenticated
export const useAuth = () => {
  const session = useSession();

  return {
    user: session.data?.user,
    session: session.data?.session,
    isAuthenticated: !!session.data?.session,
    isLoading: session.isPending,
    error: session.error,
  };
};

// Export types
export type User = NonNullable<ReturnType<typeof useAuth>['user']>;
export type Session = NonNullable<ReturnType<typeof useAuth>['session']>;
