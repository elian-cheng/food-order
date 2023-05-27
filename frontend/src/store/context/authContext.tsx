import React, { useState, createContext, useContext, useMemo } from 'react';
import { getUserId } from '../../API/authorization';

interface IAuthContext {
  user: string | null;
  setUser: React.Dispatch<React.SetStateAction<string | null>>;
}

export const AuthContext = createContext<IAuthContext>({
  user: null,
  setUser: () => {},
});

export const AuthProvider = (props: { children: React.ReactNode }) => {
  const savedUserId = getUserId();
  const [user, setUser] = useState<string | null>(savedUserId || null);
  const userValue = useMemo(() => ({ user, setUser }), [user]);

  return <AuthContext.Provider value={userValue}>{props.children}</AuthContext.Provider>;
};

export function useAuth() {
  return useContext(AuthContext);
}
