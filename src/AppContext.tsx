import type { ReactNode } from 'react';

import { AppProvider } from './contexts/app';
import { RadioProvider } from './contexts/radio';

export default function AppProviders({ children }: { children: ReactNode }) {
  return (
    <AppProvider>
      <RadioProvider>{children}</RadioProvider>
    </AppProvider>
  );
}
