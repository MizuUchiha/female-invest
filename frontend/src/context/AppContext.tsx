import React, { createContext, useState, FC, ReactNode } from 'react';

interface AppContextInterface {
  user: string;
  setUser: React.Dispatch<React.SetStateAction<string>>;
}

interface AppProviderProps {
  children: ReactNode;
}

export const AppContext = createContext<AppContextInterface | null>(null);

const AppProvider: FC<AppProviderProps> = ({ children }) => {
  const [user, setUser] = useState<string>('');

  return (
    <AppContext.Provider value={{ user, setUser }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
