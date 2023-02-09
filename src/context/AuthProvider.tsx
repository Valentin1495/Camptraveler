import { createContext, useState } from 'react';

export interface Auth {
  email: string;
  id: number;
  profileImageName: string;
  accessToken: string;
  refreshToken: string;
}

interface Context {
  auth: Auth | undefined;
  setAuth: React.Dispatch<React.SetStateAction<Auth | undefined>>;
}

const AuthContext = createContext<Context | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState<Auth>();

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
