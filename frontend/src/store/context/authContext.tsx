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

// interface IAuthContext {
//   token: string | null;
//   isLoggedIn: boolean;
//   login: (token: string, expirationTime: string) => void;
//   logout: () => void;
//   signUp: (ifSignUp: boolean) => void;
//   ifToSignUpProv: boolean;
// }

// export const AuthContext = createContext<IAuthContext>({
//   token: null,
//   isLoggedIn: false,
//   login: () => {},
//   logout: () => {},
//   signUp: () => false,
//   ifToSignUpProv: false,
// });

export const AuthProvider = (props: { children: React.ReactNode }) => {
  const savedUserId = getUserId();
  const [user, setUser] = useState<string | null>(savedUserId || null);
  const userValue = useMemo(() => ({ user, setUser }), [user]);

  // const contextValue: IAuthContext = {
  //   token: token,
  //   isLoggedIn: userIsLoggedIn,
  //   login: loginHandler,
  //   logout: logoutHandler,
  //   signUp: signUpHandler,
  //   ifToSignUpProv: ifToSignUp,
  // };

  return <AuthContext.Provider value={userValue}>{props.children}</AuthContext.Provider>;
};

export function useAuth() {
  return useContext(AuthContext);
}
