"use client";

import dynamic from "next/dynamic";

const MapBatasWilayah = dynamic(() => import("./MapBatasWilayah"), {
  ssr: false,
  loading: () => (
    <div className="w-full bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl h-[650px] flex flex-col items-center justify-center space-y-4 shadow-xl">
      <div className="w-12 h-12 rounded-full border-4 border-nagari-green-300 border-t-nagari-green-700 animate-spin"></div>
      <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Loading Peta Interaktif...</p>
    </div>
  ),
});

export default function MapWrapper() {
  return <MapBatasWilayah />;
}
