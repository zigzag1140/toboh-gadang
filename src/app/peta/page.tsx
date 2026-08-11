import React from "react";
import MapWrapper from "@/components/MapWrapper";

export default function PetaPage() {
  return (
    <div className="py-12 space-y-12">
      {/* HEADER SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <span className="text-xs font-bold text-nagari-green-600 dark:text-nagari-gold-400 uppercase tracking-widest">
          Visualisasi Kartografis &amp; Geografis
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Peta Batas Wilayah &amp; Kantor Wali Nagari
        </h1>
        <p className="text-base text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Jelajahi batas administratif Nagari Toboh Gadang, temukan titik koordinat pilar batas (PBU/PABU), dan lihat lokasi detail Kantor Wali Nagari.
        </p>
      </section>

      {/* MAP SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <MapWrapper />
      </section>
    </div>
  );
}
