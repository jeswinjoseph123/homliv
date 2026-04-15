import { useState, useEffect } from 'react';

const STORAGE_KEY = 'homliv_landlord_verified';

export function useVerificationStore() {
  const [isVerified, setIsVerifiedState] = useState<boolean>(() => {
    return localStorage.getItem(STORAGE_KEY) === 'true';
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, String(isVerified));
  }, [isVerified]);

  function setVerified(value: boolean) {
    setIsVerifiedState(value);
  }

  return { isVerified, setVerified };
}
