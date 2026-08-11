"use client";

import { useEffect, useRef, useState } from "react";
import {
  BOUNDARY_POINTS,
  KANTOR_WALI_NAGARI,
  getPolygonCoordinates,
  BoundaryPoint
} from "@/lib/borderData";

declare global {
  interface Window {
    L: any;
  }
}

export default function MapBatasWilayah() {
  const [leafletLoaded, setLeafletLoaded] = useState(false);
  const [mapType, setMapType] = useState<"standard" | "satellite">("satellite");
  const [showMarkers, setShowMarkers] = useState(true);

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const markersRef = useRef<{ [key: string]: any }>({});
  const polygonRef = useRef<any>(null);
  const officeMarkerRef = useRef<any>(null);
  const layersRef = useRef<{ osm: any; sat: any } | null>(null);

  // 1. Dynamic script and CSS loading for Leaflet (SSR safe)
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (window.L) {
      setLeafletLoaded(true);
      return;
    }

    // Load stylesheet
    const linkId = "leaflet-css-cdn";
    if (!document.getElementById(linkId)) {
      const link = document.createElement("link");
      link.id = linkId;
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(link);
    }

    // Load script
    const scriptId = "leaflet-js-cdn";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
      script.async = true;
      script.onload = () => setLeafletLoaded(true);
      document.head.appendChild(script);
    } else {
      const interval = setInterval(() => {
        if (window.L) {
          setLeafletLoaded(true);
          clearInterval(interval);
        }
      }, 100);
      return () => clearInterval(interval);
    }
  }, []);

  // 2. Initialize Leaflet Map
  useEffect(() => {
    if (!leafletLoaded || !mapContainerRef.current) return;

    const L = window.L;

    // Standard & Satellite Tile Layers
    const osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    const sat = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
      attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    });

    layersRef.current = { osm, sat };

    // Create Map (Initial view centered on Kantor Wali Nagari)
    const map = L.map(mapContainerRef.current, {
      center: [KANTOR_WALI_NAGARI.lat, KANTOR_WALI_NAGARI.lng],
      zoom: 14,
      layers: [sat]
    });

    mapRef.current = map;

    // Draw Closed Boundary Polygon
    const polyCoords = getPolygonCoordinates();
    const polygon = L.polygon(polyCoords, {
      color: "#478c60", // nagari-green-500
      fillColor: "#c5dfcd", // nagari-green-200
      fillOpacity: 0.25,
      weight: 3,
      dashArray: "5, 10"
    }).addTo(map);

    polygon.bindTooltip("Batas Wilayah Nagari Toboh Gadang", { sticky: true });
    polygonRef.current = polygon;

    // Draw Kantor Wali Nagari Marker (custom animated divIcon)
    const officeIcon = L.divIcon({
      className: "custom-office-icon-container",
      html: `
        <div class="relative flex items-center justify-center">
          <div class="absolute w-8 h-8 rounded-full bg-red-500 opacity-40 animate-ping"></div>
          <div class="relative w-7 h-7 rounded-full bg-gradient-to-tr from-red-600 to-red-500 border-2 border-white flex items-center justify-center text-white text-[11px] shadow-lg font-bold">
            🏛️
          </div>
        </div>
      `,
      iconSize: [28, 28],
      iconAnchor: [14, 14]
    });

    const officePopupContent = `
      <div style="font-family: system-ui, sans-serif; min-width: 220px; padding: 4px;">
        <h4 style="margin: 0 0 6px 0; font-weight: 800; color: #1e3c2b; font-size: 13px;">
          ${KANTOR_WALI_NAGARI.name}
        </h4>
        <p style="margin: 0 0 8px 0; font-size: 11px; color: #555;">
          📍 ${KANTOR_WALI_NAGARI.alamat}
        </p>
        <div style="font-size: 11px; line-height: 1.5; border-top: 1px solid #eee; padding-top: 6px;">
          <strong>Wali Nagari:</strong> ${KANTOR_WALI_NAGARI.waliNagari.replace(" (Wali Nagari Antar Waktu)", "")}<br/>
          <strong>Sekretaris:</strong> ${KANTOR_WALI_NAGARI.sekretaris.replace(" (PLT.)", "")}<br/>
          <strong>Jam Kerja:</strong> ${KANTOR_WALI_NAGARI.jamKerja}
        </div>
        <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(KANTOR_WALI_NAGARI.name + " Sintuk Padang Pariaman")}" 
           target="_blank" 
           style="display: block; margin-top: 10px; text-align: center; background-color: #34714a; color: white; padding: 6px 12px; border-radius: 6px; font-weight: bold; text-decoration: none; font-size: 11px;">
           Buka di Google Maps
        </a>
      </div>
    `;

    const officeMarker = L.marker([KANTOR_WALI_NAGARI.lat, KANTOR_WALI_NAGARI.lng], {
      icon: officeIcon
    })
      .addTo(map)
      .bindPopup(officePopupContent);

    officeMarkerRef.current = officeMarker;

    // Draw Boundary Pillar Markers (PBU/PABU/TK)
    BOUNDARY_POINTS.forEach((pt) => {
      const isPbu = pt.type === "PBU" || pt.type === "PABU";
      
      const markerIcon = L.divIcon({
        className: `custom-${pt.type.toLowerCase()}-icon`,
        html: `
          <div class="w-4 h-4 rounded-full ${
            pt.type === "PABU"
              ? "bg-rose-500 ring-2 ring-rose-300"
              : pt.type === "PBU"
              ? "bg-amber-500 ring-2 ring-amber-300"
              : "bg-teal-500"
          } border-2 border-white shadow-md flex items-center justify-center">
            <div class="w-1 h-1 rounded-full bg-white"></div>
          </div>
        `,
        iconSize: [16, 16],
        iconAnchor: [8, 8]
      });

      const markerPopupContent = `
        <div style="font-family: system-ui, sans-serif; min-width: 180px;">
          <h5 style="margin: 0 0 4px 0; font-weight: 800; color: #333;">${pt.name}</h5>
          <span style="display: inline-block; padding: 2px 6px; border-radius: 4px; font-size: 9px; font-weight: 850; text-transform: uppercase; margin-bottom: 8px; color: white; background-color: ${
            pt.type === "PABU" ? "#f43f5e" : pt.type === "PBU" ? "#f59e0b" : "#14b8a6"
          };">
            ${pt.type === "PABU" ? "Pilar Acuan Batas Utama" : pt.type === "PBU" ? "Pilar Batas Utama" : "Titik Kartografis"}
          </span>
          <div style="font-size: 11px; color: #444; border-top: 1px solid #eee; padding-top: 6px;">
            <strong>DMS Longitude:</strong> ${pt.dmsLon}<br/>
            <strong>DMS Latitude:</strong> ${pt.dmsLat}<br/>
            <strong>DD Lintang:</strong> ${pt.lat.toFixed(6)}<br/>
            <strong>DD Bujur:</strong> ${pt.lng.toFixed(6)}
          </div>
        </div>
      `;

      const marker = L.marker([pt.lat, pt.lng], { icon: markerIcon })
        .bindPopup(markerPopupContent);

      if (showMarkers) {
        marker.addTo(map);
      }

      markersRef.current[pt.id] = marker;
    });

    // Cleanup on unmount
    return () => {
      map.remove();
    };
  }, [leafletLoaded]);

  // Handle map type toggle (standard vs satellite)
  const toggleMapType = (type: "standard" | "satellite") => {
    if (!mapRef.current || !layersRef.current) return;
    const { osm, sat } = layersRef.current;
    
    if (type === "satellite") {
      mapRef.current.removeLayer(osm);
      mapRef.current.addLayer(sat);
    } else {
      mapRef.current.removeLayer(sat);
      mapRef.current.addLayer(osm);
    }
    setMapType(type);
  };

  // Toggle boundary markers display
  const handleToggleMarkers = () => {
    if (!mapRef.current) return;
    const nextShow = !showMarkers;
    setShowMarkers(nextShow);

    BOUNDARY_POINTS.forEach((pt) => {
      const marker = markersRef.current[pt.id];
      if (marker) {
        if (nextShow) {
          marker.addTo(mapRef.current);
        } else {
          mapRef.current.removeLayer(marker);
        }
      }
    });
  };

  // Fly/Zoom to Kantor Wali Nagari
  const handleFocusOffice = () => {
    if (!mapRef.current || !officeMarkerRef.current) return;
    mapRef.current.flyTo([KANTOR_WALI_NAGARI.lat, KANTOR_WALI_NAGARI.lng], 16, {
      duration: 1.5
    });
    setTimeout(() => {
      officeMarkerRef.current.openPopup();
    }, 1500);
  };

  return (
    <div className="w-full bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl overflow-hidden shadow-xl h-[600px] transition-all relative">
      {!leafletLoaded && (
        <div className="absolute inset-0 bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center space-y-4 z-50">
          <div className="w-12 h-12 rounded-full border-4 border-nagari-green-300 border-t-nagari-green-700 animate-spin"></div>
          <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Loading Peta Batas Wilayah...</p>
        </div>
      )}
      <div ref={mapContainerRef} className="w-full h-full z-10" />

      {/* Map Type Overlay Controls */}
      <div className="absolute bottom-4 left-4 z-[1000] flex bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-xl p-1 shadow-md border border-slate-200/50 dark:border-slate-800">
        <button
          onClick={() => toggleMapType("standard")}
          className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
            mapType === "standard"
              ? "bg-nagari-green-600 text-white shadow-sm"
              : "text-slate-650 hover:text-slate-800 dark:text-slate-450 dark:hover:text-white"
          }`}
        >
          🗺️ Peta Standar
        </button>
        <button
          onClick={() => toggleMapType("satellite")}
          className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
            mapType === "satellite"
              ? "bg-nagari-green-600 text-white shadow-sm"
              : "text-slate-650 hover:text-slate-800 dark:text-slate-450 dark:hover:text-white"
          }`}
        >
          🛰️ Satelit
        </button>
      </div>

      {/* Map Buttons Overlay */}
      <div className="absolute top-4 left-4 z-[1000] flex flex-wrap gap-2">
        <button
          onClick={handleToggleMarkers}
          className={`px-3.5 py-2 text-xs font-bold rounded-xl shadow-md backdrop-blur-md border transition-all flex items-center gap-1.5 ${
            showMarkers
              ? "bg-white/90 dark:bg-slate-900/90 text-nagari-green-700 dark:text-nagari-gold-400 border-slate-200/50 dark:border-slate-800"
              : "bg-slate-200/80 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 border-slate-350 dark:border-slate-700"
          }`}
        >
          <span>📍</span>
          <span>{showMarkers ? "Sembunyikan Pilar" : "Tampilkan Pilar"}</span>
        </button>

        <button
          onClick={handleFocusOffice}
          className="px-3.5 py-2 text-xs font-bold rounded-xl shadow-md bg-rose-600 hover:bg-rose-700 text-white border border-rose-500/25 transition-all flex items-center gap-1.5"
        >
          <span>🏛️</span>
          <span>Fokus Kantor Wali Nagari</span>
        </button>
      </div>
    </div>
  );
}
