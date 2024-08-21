/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  createContext,
  ReactNode,
  useContext,
  useState,
  useMemo,
} from 'react';

export type NavigationProps = {
  navigation?: NavigationHelper;
  params?: Params;
};

export type Params = Record<string, any>;

export type NavigationHelper = {
  navigate: (routeName: string, params?: Params) => void;
  goBack: (params?: Params) => void;
  canGoBack: () => boolean;
};

type NavigationContainerProps = {
  children: ReactNode;
};

export type NavigationContextType = {
  currentRoute: string;
  setCurrentRoute: React.Dispatch<React.SetStateAction<string>>;
};

const NavigationContext = createContext<NavigationContextType>({
  currentRoute: '',
  setCurrentRoute: () => null,
});

const NavigationContainer = ({ children }: NavigationContainerProps) => {
  const [currentRoute, setCurrentRoute] = useState('');

  const contextValue = useMemo(
    () => ({
      currentRoute,
      setCurrentRoute,
    }),
    [currentRoute, setCurrentRoute],
  );

  return (
    <NavigationContext.Provider value={contextValue}>
      {children}
    </NavigationContext.Provider>
  );
};
export default NavigationContainer;

export const useNavigation = () => useContext(NavigationContext);
