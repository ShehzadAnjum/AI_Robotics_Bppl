import { createAuthClient } from 'better-auth/react';

// Get backend URL from environment or use defaults
const getBackendUrl = () => {
  // Check if running in browser
  if (typeof window !== 'undefined') {
    // Production: Use environment variable or fallback to deployed backend
    if (window.location.hostname.includes('github.io')) {
      // GitHub Pages production - use deployed Vercel backend
      return process.env.REACT_APP_BACKEND_URL || 'https://robotics-book-chat-api.vercel.app';
    }
  }

  // Development: Local backend
  return process.env.REACT_APP_BACKEND_URL || 'http://localhost:3000';
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
  useActiveOrganization,
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
