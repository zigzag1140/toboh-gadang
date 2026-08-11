"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Slide {
  image: string;
}

export default function HeroSlideshow() {
  const slides: Slide[] = [
    { image: "/images/slide1.png" },
    { image: "/images/slide2.png" },
    { image: "/images/slide3.png" },
    { image: "/images/slide4.png" }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative min-h-[90vh] md:min-h-[85vh] flex items-center justify-start bg-slate-950 text-white overflow-hidden pb-16 md:pb-24 pt-10">
      
      {/* 1. Background Slider Images with Dark Tint */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? "opacity-100 scale-100" : "opacity-0 scale-105"
            } transform duration-[2000ms]`}
          >
            {/* Ambient gradients to blend slides and improve text legibility */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-900/40 to-transparent z-10" />
            <img
              src={slide.image}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover object-center"
            />
          </div>
        ))}
      </div>

      {/* 2. Container Layout for Elements - Left aligned */}
      <div className="relative max-w-7xl mx-auto w-full px-6 md:px-12 z-10 mt-6 pb-8">
        {/* Left Side: Welcome Text and CTAs */}
        <div className="max-w-2xl space-y-6 text-left">
          <p className="text-sm md:text-base font-bold text-nagari-gold-400 tracking-wider">
            Selamat Datang di
          </p>
          
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
            Nagari <span className="text-emerald-450 dark:text-emerald-455">Toboh Gadang</span>
          </h1>
          
          <p className="text-sm md:text-base text-slate-200 max-w-xl leading-relaxed">
            Mewujudkan Nagari yang maju, mandiri, dan sejahtera melalui pelayanan publik yang transparan dan inovatif.
          </p>

          {/* Styled CTA buttons matching screenshot */}
          <div className="flex flex-row flex-wrap gap-4 pt-2">
            <Link
              href="/profil"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-nagari-green-700 to-nagari-green-800 hover:from-nagari-green-800 hover:to-nagari-green-950 border border-emerald-800 shadow-md transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
            >
              {/* Home-like outline icon */}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              Profil Nagari
            </Link>
            <Link
              href="/layanan"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-slate-900 bg-white hover:bg-slate-100 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 shadow-md"
            >
              {/* User icon */}
              <svg className="w-4 h-4 text-slate-650" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Layanan Publik
            </Link>

          </div>
        </div>
      </div>

      {/* 3. Indicators dots synced in the center bottom */}
      <div className="absolute bottom-16 md:bottom-20 left-1/2 -translate-x-1/2 z-30 flex space-x-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 focus:outline-none ${
              idx === currentIndex ? "bg-emerald-450 w-6" : "bg-white/40 hover:bg-white/60"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* 4. Beautiful wave separator matching reference layout */}
      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none z-20 pointer-events-none">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-[50px] md:h-[70px]"
          preserveAspectRatio="none"
        >
          {/* Gold background wave layer to act as gold bottom thin line */}
          <path
            d="M0 60 C 360 120, 1080 0, 1440 60 L 1440 120 L 0 120 Z"
            fill="#d99e15"
          />
          {/* White/Dark theme responsive wave layer */}
          <path
            d="M0 64 C 360 122, 1080 4, 1440 64 L 1440 120 L 0 120 Z"
            className="fill-[#fcfdfe] dark:fill-slate-950 transition-colors duration-300"
          />
        </svg>
      </div>

    </section>
  );
}
