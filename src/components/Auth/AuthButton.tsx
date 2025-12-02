import React, { useState } from 'react';
import { useAuth } from '@site/src/lib/auth-client';
import SignInModal from './SignInModal';
import SignUpModal from './SignUpModal';
import UserMenu from './UserMenu';
import styles from './Auth.module.css';

/**
 * AuthButton - Main authentication UI component for navbar
 *
 * Shows different UI based on authentication state:
 * - Not authenticated: Sign In / Sign Up buttons
 * - Authenticated: User menu with avatar
 */
export default function AuthButton(): JSX.Element {
  const { isAuthenticated, isLoading, user } = useAuth();
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  // Loading state
  if (isLoading) {
    return (
      <div className={styles.authLoading}>
        <span>Loading...</span>
      </div>
    );
  }

  // Authenticated state - show user menu
  if (isAuthenticated && user) {
    return <UserMenu user={user} />;
  }

  // Unauthenticated state - show sign in/up buttons
  return (
    <>
      <div className={styles.authButtons}>
        <button
          className={styles.signInBtn}
          onClick={() => setShowSignIn(true)}
          aria-label="Sign in"
        >
          Sign In
        </button>
        <button
          className={styles.signUpBtn}
          onClick={() => setShowSignUp(true)}
          aria-label="Sign up"
        >
          Sign Up
        </button>
      </div>

      {showSignIn && (
        <SignInModal
          onClose={() => setShowSignIn(false)}
          onSwitchToSignUp={() => {
            setShowSignIn(false);
            setShowSignUp(true);
          }}
        />
      )}

      {showSignUp && (
        <SignUpModal
          onClose={() => setShowSignUp(false)}
          onSwitchToSignIn={() => {
            setShowSignUp(false);
            setShowSignIn(true);
          }}
        />
      )}
    </>
  );
}
