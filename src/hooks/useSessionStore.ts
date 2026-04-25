import { useState } from 'react';

type UserRole = 'tenant' | 'landlord' | null;
const SESSION_KEY = 'homliv_session';

export function useSessionStore() {
  const [role, setRoleState] = useState<UserRole>(
    () => localStorage.getItem(SESSION_KEY) as UserRole
  );

  const isAdmin = localStorage.getItem('homliv_admin_session') === 'true';
  const isRoommate = localStorage.getItem('homliv_roommate_role') === 'true';

  function setRole(r: UserRole) {
    setRoleState(r);
    if (r) localStorage.setItem(SESSION_KEY, r);
    else localStorage.removeItem(SESSION_KEY);
  }

  const dashboardPath =
    isAdmin    ? '/admin/dashboard' :
    isRoommate ? '/roommate/dashboard' :
    role === 'tenant'   ? '/tenant-dashboard' :
    role === 'landlord' ? '/dashboard' :
    null;

  return { dashboardPath, setRole };
}
