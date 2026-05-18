import { createContext, useContext } from 'react';
import type { AppActions, AppSnapshot } from '../types/domain';
import { useAppState } from '../hooks/useAppState';

interface AppContextValue {
  state: AppSnapshot;
  actions: AppActions;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const { snapshot, actions } = useAppState();
  return <AppContext.Provider value={{ state: snapshot, actions }}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const value = useContext(AppContext);
  if (!value) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return value;
}
