import { useState, useEffect } from 'react';

const ROLE_KEY = 'homliv_roommate_role';
const VERIFIED_KEY = 'homliv_roommate_verified';

export function useRoommateStore() {
  const [isRoommate, setIsRoommateState] = useState<boolean>(() => {
    return localStorage.getItem(ROLE_KEY) === 'true';
  });

  const [isVerified, setIsVerifiedState] = useState<boolean>(() => {
    return localStorage.getItem(VERIFIED_KEY) === 'true';
  });

  useEffect(() => {
    localStorage.setItem(ROLE_KEY, String(isRoommate));
  }, [isRoommate]);

  useEffect(() => {
    localStorage.setItem(VERIFIED_KEY, String(isVerified));
  }, [isVerified]);

  function setRoommate(value: boolean) {
    setIsRoommateState(value);
  }

  function setVerified(value: boolean) {
    setIsVerifiedState(value);
  }

  return { isRoommate, setRoommate, isVerified, setVerified };
}
