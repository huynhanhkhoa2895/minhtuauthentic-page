import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
} from 'react';
export type TypeAppState = {
  carts: unknown[];
  setCart: Dispatch<SetStateAction<never[]>> | undefined;
  settings?: Record<string, string>;
  setSettings?: Dispatch<SetStateAction<Record<string, string>>> | undefined;
};
const appState: TypeAppState = {
  carts: [],
  setCart: undefined,
  settings: undefined,
  setSettings: undefined,
};

const AppContext = createContext<TypeAppState | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [carts, setCart] = useState([]);
  const [settings, setSettings] = useState({});
  return (
    <AppContext.Provider value={{ carts, setCart, settings, setSettings }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
