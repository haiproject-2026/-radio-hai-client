'use client';

import type { JSX } from "react";
import PodcastsContainer from "./components/layout/Podcasts";

export default function PodcastsPage(): JSX.Element {
  return (
    <main className="min-h-screen bg-slate-50/50 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <PodcastsContainer />
      </div>
    </main>
  );
}
