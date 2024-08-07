import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
} from 'react';
export type TypeAppState = {
  isOpenMenu: boolean;
  setIsOpenMenu: Dispatch<SetStateAction<boolean>> | undefined;
  isOpenNavMenu: boolean;
  setIsOpenNavMenu: Dispatch<SetStateAction<boolean>> | undefined;
  settings?: Record<string, string>;
  setSettings?: Dispatch<SetStateAction<Record<string, string>>> | undefined;
};

const AppContext = createContext<TypeAppState | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isOpenNavMenu, setIsOpenNavMenu] = useState(false);
  const [settings, setSettings] = useState({});
  return (
    <AppContext.Provider value={{
      isOpenNavMenu,
      setIsOpenNavMenu,
      isOpenMenu,
      setIsOpenMenu,
      settings,
      setSettings
    }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
