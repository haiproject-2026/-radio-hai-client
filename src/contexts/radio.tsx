'use client';

import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

export type RadioContextValue = {
  playing: boolean;
  currentTrack?: string;
  play: () => void;
  pause: () => void;
  setTrack: (t?: string) => void;
};

const RadioContext = createContext<RadioContextValue | null>(null);

export function RadioProvider({ children }: { children: ReactNode }) {
  const [playing, setPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<string | undefined>(undefined);

  const value: RadioContextValue = {
    playing,
    currentTrack,
    play: () => setPlaying(true),
    pause: () => setPlaying(false),
    setTrack: (t?: string) => setCurrentTrack(t),
  };

  return <RadioContext.Provider value={value}>{children}</RadioContext.Provider>;
}

/* eslint-disable-next-line react-refresh/only-export-components */
export function useRadio() {
  const context = useContext(RadioContext);
  if (!context) throw new Error('useRadio doit être englobé dans un RadioProvider');
  return context;
}
