import { useState, useEffect } from 'react';

const STORAGE_KEY = 'homliv_admin_session';

export function useAdminStore() {
  const [isAdmin, setIsAdminState] = useState<boolean>(() => {
    return localStorage.getItem(STORAGE_KEY) === 'true';
  });

  useEffect(() => {
    if (isAdmin) {
      localStorage.setItem(STORAGE_KEY, 'true');
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [isAdmin]);

  function login() {
    setIsAdminState(true);
  }

  function logout() {
    setIsAdminState(false);
  }

  return { isAdmin, login, logout };
}
