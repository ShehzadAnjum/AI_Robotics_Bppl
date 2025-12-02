import React, { useState, useRef, useEffect } from 'react';
import { signOut } from '@site/src/lib/auth-client';
import type { User } from '@site/src/lib/auth-client';
import styles from './Auth.module.css';

interface UserMenuProps {
  user: User;
}

export default function UserMenu({ user }: UserMenuProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    window.location.reload();
  };

  // Get initials for avatar
  const initials = user.name
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2) || user.email?.[0].toUpperCase() || '?';

  return (
    <div className={styles.userMenu} ref={menuRef}>
      <button
        className={styles.userAvatar}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="User menu"
        aria-expanded={isOpen}
      >
        {user.image ? (
          <img src={user.image} alt={user.name || 'User'} />
        ) : (
          <span>{initials}</span>
        )}
      </button>

      {isOpen && (
        <div className={styles.userDropdown}>
          <div className={styles.userInfo}>
            <div className={styles.userName}>{user.name || 'User'}</div>
            <div className={styles.userEmail}>{user.email}</div>
          </div>
          <div className={styles.dropdownDivider} />
          <button className={styles.dropdownItem} onClick={handleSignOut}>
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}
