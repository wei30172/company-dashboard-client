import React, {
  useState,
  useContext,
  createContext,
  Dispatch,
  SetStateAction,
} from "react";

interface ModeContextProps {
  darkMode: boolean;
  setDarkMode: Dispatch<SetStateAction<boolean>>;
}

export const ModeContext = createContext<ModeContextProps>({
  darkMode: false,
} as ModeContextProps);

interface Props {
  children: React.ReactNode;
}

interface Props {
  children: React.ReactNode;
}

export const ModeProvider: React.FC<Props> = ({ children }) => {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  return (
    <ModeContext.Provider
      value={{
        darkMode,
        setDarkMode,
      }}
    >
      {children}
    </ModeContext.Provider>
  );
};

export const useModeContext = () => useContext(ModeContext);
