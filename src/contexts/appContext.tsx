import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
} from 'react';
export type TypeAppState = {
  carts: unknown[];
  setCart: Dispatch<SetStateAction<never[]>> | undefined;
};
const appState: TypeAppState = {
  carts: [],
  setCart: undefined,
};

const AppContext = createContext<TypeAppState | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [carts, setCart] = useState([]);
  return (
    <AppContext.Provider value={{ carts, setCart }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
