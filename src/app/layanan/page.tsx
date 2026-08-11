"use client";

import React, { useState } from "react";

export default function LayananPage() {
  const [selectedTemplate, setSelectedTemplate] = useState("ahli-waris");
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"form" | "preview">("form");
  
  const [formData, setFormData] = useState({
    // Penandatanganan & Nomor Surat
    nomorSurat: "472/018/Duk-2026",
    tanggalSurat: "19 Januari 2026",
    waliNagari: "NASRI",

    // Common fields (Domisili, Tidak Bekerja, Usaha)
    nama: "BUDI SANTOSO",
    nik: "1305110708950002",
    ttl: "Toboh Baru/12-08-1995",
    jenisKelamin: "Laki-laki",
    sukuAgama: "Minang/Islam",
    pekerjaan: "Wiraswasta",
    alamat: "Jorong Koto Baru, Nagari Toboh Gadang, Kec. Sintuak Toboh Gadang",
    keperluan: "Persyaratan administrasi perbankan dan pembukaan rekening",

    // Ahli Waris specific fields
    namaAhliWaris: "DARUS PRATAMA PUTRA",
    nikAhliWaris: "1305110612100001",
    ttlAhliWaris: "Toboh Olo/06-12-2010",
    sukuAgamaAhliWaris: "Minang/Islam",
    pekerjaanAhliWaris: "Pelajar/Mahasiswa",
    alamatAhliWaris: "Toboh Olo Nagari Toboh Gadang Kecamatan Sintuak Toboh Gadang",
    hubungan: "Anak Kandung",
    namaPewaris: "DONA SAPUTRI",
    nikPewaris: "1305114208900001",
    ttlPewaris: "Toboh Olo/02-08-1990",
    sukuAgamaPewaris: "Minang",
    pekerjaanPewaris: "Mengurus Rumah Tangga",
    alamatPewaris: "Toboh Olo Nagari Toboh Gadang Kecamatan Sintuak Toboh Gadang",

    // Kelahiran specific fields
    namaBayi: "ALIA RAHMA",
    hariTanggalLahirBayi: "Senin, 10 Mei 2026",
    tempatLahirBayi: "Toboh Olo",
    jenisKelaminBayi: "Perempuan",
    namaIbu: "SITI AMINAH",
    nikIbu: "1305115203920003",
    pekerjaanIbu: "Mengurus Rumah Tangga",
    namaAyah: "AHMAD RUSDI",
    nikAyah: "1305111504880004",
    pekerjaanAyah: "Petani",

    // Usaha specific fields
    namaUsaha: "Kios Keripik Sanjai Hendra",
    jenisUsaha: "Perdagangan Makanan Tradisional / Kuliner",
    lokasiUsaha: "Jalan Raya Lintas Lubuk Alung - Pariaman, Nagari Toboh Gadang",

    // Tidak Mampu specific fields
    namaAnak: "REZA FIRMANSYAH",
    nikAnak: "1305112209120007",
    ttlAnak: "Toboh Olo/22-09-2012",
    sekolahAnak: "SMP Negeri 1 Sintuk Toboh Gadang"
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePrint = () => {
    const letterEl = document.getElementById("printable-letter");
    if (!letterEl) {
      window.print();
      return;
    }

    // Remove any existing print iframe
    const existingIframe = document.getElementById("print-iframe");
    if (existingIframe) {
      existingIframe.remove();
    }

    const iframe = document.createElement("iframe");
    iframe.id = "print-iframe";
    iframe.style.position = "fixed";
    iframe.style.right = "0";
    iframe.style.bottom = "0";
    iframe.style.width = "0";
    iframe.style.height = "0";
    iframe.style.border = "0";
    iframe.style.visibility = "hidden";
    document.body.appendChild(iframe);

    const doc = iframe.contentWindow?.document;
    if (!doc) {
      window.print();
      return;
    }

    const currentDocName = documents.find(d => d.id === selectedTemplate)?.name || "Surat Keterangan Nagari";
    const contentHtml = letterEl.innerHTML;

    doc.open();
    doc.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${currentDocName}</title>
          <meta charset="utf-8">
          <style>
            @page {
              size: A4 portrait;
              margin: 15mm 20mm;
            }
            * {
              box-sizing: border-box;
              margin: 0;
              padding: 0;
            }
            body {
              font-family: "Times New Roman", Times, serif;
              color: #000;
              background: #fff;
              font-size: 11.5pt;
              line-height: 1.45;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            .grid {
              display: grid;
            }
            .grid-cols-12 {
              grid-template-columns: repeat(12, minmax(0, 1fr));
            }
            .col-span-3 {
              grid-column: span 3 / span 3;
            }
            .col-span-9 {
              grid-column: span 9 / span 9;
            }
            .col-span-4 {
              grid-column: span 4 / span 4;
            }
            .col-span-8 {
              grid-column: span 8 / span 8;
            }
            .gap-y-1 {
              row-gap: 0.25rem;
            }
            .flex {
              display: flex;
            }
            .items-start {
              align-items: flex-start;
            }
            .items-center {
              align-items: center;
            }
            .justify-center {
              justify-content: center;
            }
            .justify-end {
              justify-content: flex-end;
            }
            .gap-4 {
              gap: 1rem;
            }
            .flex-1 {
              flex: 1 1 0%;
            }
            .flex-shrink-0 {
              flex-shrink: 0;
            }
            .text-center {
              text-align: center;
            }
            .text-justify {
              text-align: justify;
            }
            .text-right {
              text-align: right;
            }
            .font-bold {
              font-weight: bold;
            }
            .font-semibold {
              font-weight: 600;
            }
            .font-extrabold {
              font-weight: 800;
            }
            .font-black {
              font-weight: 900;
            }
            .font-serif {
              font-family: "Times New Roman", Times, serif;
            }
            .font-sans {
              font-family: Arial, Helvetica, sans-serif;
            }
            .italic {
              font-style: italic;
            }
            .underline {
              text-decoration: underline;
            }
            .uppercase {
              text-transform: uppercase;
            }
            .tracking-wide {
              letter-spacing: 0.025em;
            }
            .tracking-wider {
              letter-spacing: 0.05em;
            }
            .tracking-widest {
              letter-spacing: 0.1em;
            }
            .indent-8 {
              text-indent: 2rem;
            }
            .leading-relaxed {
              line-height: 1.6;
            }
            .space-y-1 > * + * {
              margin-top: 0.2rem;
            }
            .space-y-2 > * + * {
              margin-top: 0.4rem;
            }
            .space-y-4 > * + * {
              margin-top: 0.85rem;
            }
            .space-y-6 > * + * {
              margin-top: 1.15rem;
            }
            .space-y-16 > * + * {
              margin-top: 4rem;
            }
            .mt-1 { margin-top: 0.25rem; }
            .mt-8 { margin-top: 1.25rem; }
            .mt-12 { margin-top: 1.75rem; }
            .pb-3 { padding-bottom: 0.75rem; }
            .pl-8 { padding-left: 2rem; }
            .w-16 { width: 4rem; }
            .h-20 { height: 5rem; }
            .w-60 { width: 15rem; }
            .border-b-\\[4px\\] {
              border-bottom-width: 4px;
            }
            .border-double {
              border-style: double;
            }
            .border-black {
              border-color: #000;
            }
            img {
              max-width: 100%;
              height: auto;
            }
            span {
              background: transparent !important;
              color: #000 !important;
              box-shadow: none !important;
              transform: none !important;
              border: none !important;
            }
          </style>
        </head>
        <body>
          ${contentHtml}
        </body>
      </html>
    `);
    doc.close();

    setTimeout(() => {
      iframe.contentWindow?.focus();
      iframe.contentWindow?.print();
    }, 300);
  };

  // Helper function to render fields in the preview with focus glowing/highlighting sync
  const renderPreviewField = (name: string, value: string, fallback = "__________________") => {
    const isFocused = focusedField === name;
    return (
      <span 
        className={`px-1.5 py-0.5 rounded font-medium transition-all duration-300 inline-block ${
          isFocused 
            ? "bg-amber-100 dark:bg-amber-950/80 text-slate-950 dark:text-amber-100 ring-2 ring-amber-400 dark:ring-amber-500 scale-105 font-bold shadow-sm" 
            : "hover:bg-slate-100/70 dark:hover:bg-slate-800/40"
        }`}
      >
        {value || fallback}
      </span>
    );
  };

  const procedures = [
    {
      name: "Surat Keterangan Ahli Waris",
      requirements: [
        "Fotokopi KTP Ahli Waris & Pewaris",
        "Fotokopi Kartu Keluarga (KK)",
        "Surat Kematian Pewaris dari Rumah Sakit / Kelurahan",
        "Surat pengantar dari Wali Jorong setempat",
      ],
      duration: "1-2 Hari Kerja",
      cost: "Gratis",
    },
    {
      name: "SKU (Surat Keterangan Usaha)",
      requirements: [
        "Fotokopi KTP & Kartu Keluarga (KK)",
        "Surat pengantar dari Wali Jorong setempat",
        "Foto tempat / aktivitas usaha (cetak fisik / digital)",
      ],
      duration: "1 Hari Kerja",
      cost: "Gratis",
    },
    {
      name: "SKTM (Surat Keterangan Tidak Mampu)",
      requirements: [
        "Fotokopi KTP & Kartu Keluarga (KK)",
        "Surat Pengantar Wali Jorong dengan keterangan kurang mampu",
        "Surat pernyataan miskin bermaterai Rp 10.000",
      ],
      duration: "1-2 Hari Kerja",
      cost: "Gratis",
    },
    {
      name: "Surat Pengantar Nikah (Model N1-N4)",
      requirements: [
        "Fotokopi KTP calon mempelai & kedua orang tua",
        "Fotokopi Kartu Keluarga & Akta Kelahiran",
        "Pas foto ukuran 2x3 dan 4x6 latar biru (masing-masing 4 lembar)",
        "Surat pengantar Wali Jorong",
      ],
      duration: "2 Hari Kerja",
      cost: "Gratis",
    },
  ];

  const documents = [
    {
      id: "ahli-waris",
      name: "Surat Keterangan Ahli Waris",
      filename: "Surat Keterangan Ahli Waris.doc",
      url: "/public/Surat Keterangan Ahli Waris.doc",
      size: "754 KB"
    },
    {
      id: "domisili",
      name: "Surat Keterangan Domisili",
      filename: "Surat Keterangan Domisili.doc",
      url: "/public/Surat Keterangan Domisili.doc",
      size: "318 KB"
    },
    {
      id: "kelahiran",
      name: "Surat Keterangan Kelahiran",
      filename: "Surat Keterangan Kelahiran.doc",
      url: "/public/Surat Keterangan Kelahiran.doc",
      size: "413 KB"
    },
    {
      id: "tidak-bekerja",
      name: "Surat Keterangan Tidak Bekerja",
      filename: "Surat Keterangan Tidak Bekerja.doc",
      url: "/public/Surat Keterangan Tidak Bekerja.doc",
      size: "190 KB"
    },
    {
      id: "tidak-mampu",
      name: "Surat Keterangan Tidak Mampu",
      filename: "Surat Keterangan Tidak Mampu.doc",
      url: "/public/Surat Keterangan Tidak Mampu.doc",
      size: "384 KB"
    },
    {
      id: "usaha",
      name: "Surat Keterangan Usaha",
      filename: "Surat Keterangan Usaha.doc",
      url: "/public/Surat Keterangan Usaha.doc",
      size: "329 KB"
    }
  ];

  return (
    <div className="py-12 space-y-20">
      {/* Dynamic Print CSS */}
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #printable-letter, #printable-letter * {
            visibility: visible;
          }
          #printable-letter {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            margin: 0 !important;
            padding: 0 !important;
            box-shadow: none !important;
            border: none !important;
            background: white !important;
            color: black !important;
          }
          @page {
            size: A4;
            margin: 20mm;
          }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleUp {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fade-in {
          animation: fadeIn 0.18s ease-out forwards;
        }
        .animate-scale-up {
          animation: scaleUp 0.22s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      {/* HEADER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <span className="text-xs font-bold text-nagari-green-600 dark:text-nagari-gold-400 uppercase tracking-widest">
          Layanan Administrasi
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Layanan Publik &amp; Administrasi
        </h1>
        <p className="text-base text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Temukan pedoman pengurusan surat, unduh berkas template asli (.doc), dan isi draf administrasi langsung di bawah ini.
        </p>
      </section>

      {/* 1. PROSEDUR PENGURUSAN SURAT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-center gap-3">
          <span className="text-2xl">📋</span>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">Prosedur Pengurusan Surat</h2>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-850/50 border-b border-slate-200 dark:border-slate-800">
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Jenis Surat</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Syarat Dokumen</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider w-40">Estimasi Waktu</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider w-32">Biaya</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
                {procedures.map((proc, index) => (
                  <tr key={index} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/50 transition-colors">
                    <td className="px-6 py-5 font-bold text-slate-900 dark:text-white align-top">
                      {proc.name}
                    </td>
                    <td className="px-6 py-5 align-top">
                      <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-350">
                        {proc.requirements.map((req, rIdx) => (
                          <li key={rIdx}>{req}</li>
                        ))}
                      </ul>
                    </td>
                    <td className="px-6 py-5 align-top font-semibold text-slate-700 dark:text-slate-300">
                      {proc.duration}
                    </td>
                    <td className="px-6 py-5 align-top font-bold text-emerald-600 dark:text-emerald-400">
                      {proc.cost}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 2. UNDUH DOKUMEN */}
      <section className="bg-slate-50 dark:bg-slate-900/20 py-16 border-t border-b border-slate-150/40 dark:border-slate-850">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex items-center gap-3">
            <span className="text-2xl">📥</span>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">Unduh Template Surat (Format Word .doc)</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {documents.map((doc, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 flex flex-col justify-between shadow-sm hover:border-nagari-green-600/40 dark:hover:border-nagari-gold-500/40 transition-colors duration-200"
              >
                <div className="space-y-2">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-950/40 rounded-lg flex items-center justify-center text-lg">
                    📝
                  </div>
                  <h4 className="font-bold text-slate-950 dark:text-white text-sm line-clamp-2">{doc.name}</h4>
                  <p className="text-[10px] text-slate-400 font-semibold uppercase">{doc.size} | Format Word</p>
                </div>
                <div className="flex gap-2 mt-5">
                  <button
                    onClick={() => {
                      setSelectedTemplate(doc.id);
                      setIsModalOpen(true);
                      setActiveTab("form"); // reset to form tab on open
                    }}
                    className="flex-1 py-2.5 rounded-xl bg-nagari-green-600 hover:bg-nagari-green-700 dark:bg-nagari-gold-500 dark:hover:bg-nagari-gold-600 text-white dark:text-slate-950 text-xs font-bold flex items-center justify-center gap-2 transition-all duration-200 shadow-sm cursor-pointer"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit &amp; Cetak
                  </button>
                  <a
                    href={doc.url}
                    download={doc.filename}
                    title="Unduh Format Word (.doc)"
                    className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-700 dark:text-slate-450 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/40 flex items-center justify-center transition-all duration-200 cursor-pointer"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal Editor & Preview */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-0 md:p-6 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-slate-900 w-full max-w-6xl h-full md:h-[90vh] rounded-none md:rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-200 dark:border-slate-800 animate-scale-up">
            
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/40">
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-nagari-green-600 dark:text-nagari-gold-400 uppercase tracking-widest block">
                  Editor &amp; Generator Surat
                </span>
                <h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-white">
                  {documents.find(d => d.id === selectedTemplate)?.name || "Edit Surat"}
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl hover:bg-slate-200/60 dark:hover:bg-slate-850 text-slate-500 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white transition-colors cursor-pointer"
                aria-label="Tutup"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Mobile Tab Toggle (md:hidden) */}
            <div className="md:hidden flex border-b border-slate-200 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-900/20 text-sm">
              <button
                onClick={() => setActiveTab("form")}
                className={`flex-1 py-3 text-center font-bold border-b-2 transition-all ${
                  activeTab === "form"
                    ? "border-nagari-green-600 dark:border-nagari-gold-500 text-nagari-green-700 dark:text-nagari-gold-400"
                    : "border-transparent text-slate-500"
                }`}
              >
                Formulir
              </button>
              <button
                onClick={() => setActiveTab("preview")}
                className={`flex-1 py-3 text-center font-bold border-b-2 transition-all ${
                  activeTab === "preview"
                    ? "border-nagari-green-600 dark:border-nagari-gold-500 text-nagari-green-700 dark:text-nagari-gold-400"
                    : "border-transparent text-slate-500"
                }`}
              >
                Pratinjau Surat
              </button>
            </div>

            {/* Modal Content: Left and Right Columns */}
            <div className="flex-1 flex flex-col md:flex-row overflow-hidden min-h-0">
              
              {/* Left Column: Form Editor */}
              <div className={`w-full md:w-[45%] border-r border-slate-200/80 dark:border-slate-800 overflow-y-auto p-5 space-y-5 bg-slate-50/30 dark:bg-slate-900/20 ${activeTab === "form" ? "block" : "hidden md:block"}`}>
                
                {/* Dropdown Pemilih Template */}
                <div className="space-y-1.5 border-b border-slate-200/50 dark:border-slate-800/50 pb-4">
                  <label className="font-bold text-nagari-green-700 dark:text-nagari-gold-400 uppercase tracking-wider block text-[10px]">
                    Ganti Jenis Surat
                  </label>
                  <select
                    value={selectedTemplate}
                    onChange={(e) => setSelectedTemplate(e.target.value)}
                    className="w-full px-3.5 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/60 text-slate-900 dark:text-white font-extrabold focus:outline-none focus:border-nagari-green-600 focus:ring-4 focus:ring-nagari-green-600/10 transition-all duration-200 text-xs shadow-sm cursor-pointer"
                  >
                <option value="ahli-waris">Surat Keterangan Ahli Waris</option>
                <option value="domisili">Surat Keterangan Domisili</option>
                <option value="kelahiran">Surat Keterangan Kelahiran</option>
                <option value="tidak-bekerja">Surat Keterangan Tidak Bekerja</option>
                <option value="tidak-mampu">Surat Keterangan Tidak Mampu (SKTM)</option>
                <option value="usaha">Surat Keterangan Usaha (SKU)</option>
              </select>
            </div>

            <div className="space-y-4 text-[11px]">
              {/* Nomor Surat & Tgl Surat (Common to all) */}
              <div className="grid grid-cols-2 gap-3 bg-slate-50/40 dark:bg-slate-950/30 p-3 rounded-2xl border border-slate-150/40 dark:border-slate-850">
                <div className="space-y-1">
                  <label className="font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wide block">Nomor Surat</label>
                  <input
                    type="text"
                    name="nomorSurat"
                    value={formData.nomorSurat}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("nomorSurat")}
                    onBlur={() => setFocusedField(null)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/60 text-slate-900 dark:text-white font-semibold focus:outline-none focus:border-nagari-green-600 focus:ring-2 focus:ring-nagari-green-600/10 transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wide block">Tanggal Surat</label>
                  <input
                    type="text"
                    name="tanggalSurat"
                    value={formData.tanggalSurat}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("tanggalSurat")}
                    onBlur={() => setFocusedField(null)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/60 text-slate-900 dark:text-white font-semibold focus:outline-none focus:border-nagari-green-600 focus:ring-2 focus:ring-nagari-green-600/10 transition-all"
                  />
                </div>
              </div>

              {/* INPUT FORM DINAMIS BERDASARKAN SELECTED TEMPLATE */}
              {selectedTemplate === "ahli-waris" && (
                <>
                  <div className="border-t border-slate-100 dark:border-slate-850 pt-4">
                    <h4 className="font-black text-xs text-nagari-green-700 dark:text-nagari-gold-400 mb-3 uppercase tracking-wider flex items-center gap-1.5">
                      <span className="w-1.5 h-3 rounded bg-nagari-green-600 block"></span> Data Ahli Waris
                    </h4>
                    <div className="space-y-3">
                      <div className="space-y-1"><label className="font-bold text-slate-700 dark:text-slate-350 block">Nama Lengkap</label><input type="text" name="namaAhliWaris" value={formData.namaAhliWaris} onChange={handleChange} onFocus={() => setFocusedField("namaAhliWaris")} onBlur={() => setFocusedField(null)} className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 focus:outline-none focus:border-nagari-green-600 focus:ring-2 focus:ring-nagari-green-600/10 transition-all" /></div>
                      <div className="space-y-1"><label className="font-bold text-slate-700 dark:text-slate-350 block">NIK</label><input type="text" name="nikAhliWaris" value={formData.nikAhliWaris} onChange={handleChange} onFocus={() => setFocusedField("nikAhliWaris")} onBlur={() => setFocusedField(null)} className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 focus:outline-none focus:border-nagari-green-600 focus:ring-2 focus:ring-nagari-green-600/10 transition-all" /></div>
                      <div className="space-y-1"><label className="font-bold text-slate-700 dark:text-slate-350 block">Tempat/Tanggal Lahir</label><input type="text" name="ttlAhliWaris" value={formData.ttlAhliWaris} onChange={handleChange} onFocus={() => setFocusedField("ttlAhliWaris")} onBlur={() => setFocusedField(null)} className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 focus:outline-none focus:border-nagari-green-600 focus:ring-2 focus:ring-nagari-green-600/10 transition-all" /></div>
                      <div className="space-y-1"><label className="font-bold text-slate-700 dark:text-slate-350 block">Suku/Agama</label><input type="text" name="sukuAgamaAhliWaris" value={formData.sukuAgamaAhliWaris} onChange={handleChange} onFocus={() => setFocusedField("sukuAgamaAhliWaris")} onBlur={() => setFocusedField(null)} className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 focus:outline-none focus:border-nagari-green-600 focus:ring-2 focus:ring-nagari-green-600/10 transition-all" /></div>
                      <div className="space-y-1"><label className="font-bold text-slate-700 dark:text-slate-350 block">Pekerjaan</label><input type="text" name="pekerjaanAhliWaris" value={formData.pekerjaanAhliWaris} onChange={handleChange} onFocus={() => setFocusedField("pekerjaanAhliWaris")} onBlur={() => setFocusedField(null)} className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 focus:outline-none focus:border-nagari-green-600 focus:ring-2 focus:ring-nagari-green-600/10 transition-all" /></div>
                      <div className="space-y-1"><label className="font-bold text-slate-700 dark:text-slate-350 block">Alamat Lengkap</label><textarea name="alamatAhliWaris" value={formData.alamatAhliWaris} onChange={handleChange} onFocus={() => setFocusedField("alamatAhliWaris")} onBlur={() => setFocusedField(null)} rows={2} className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 focus:outline-none focus:border-nagari-green-600 focus:ring-2 focus:ring-nagari-green-600/10 transition-all" /></div>
                      <div className="space-y-1"><label className="font-bold text-slate-700 dark:text-slate-350 block">Hubungan Ahli Waris</label><input type="text" name="hubungan" value={formData.hubungan} onChange={handleChange} onFocus={() => setFocusedField("hubungan")} onBlur={() => setFocusedField(null)} className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 focus:outline-none focus:border-nagari-green-600 focus:ring-2 focus:ring-nagari-green-600/10 transition-all" /></div>
                    </div>
                  </div>
                  <div className="border-t border-slate-100 dark:border-slate-850 pt-4">
                    <h4 className="font-black text-xs text-nagari-green-700 dark:text-nagari-gold-400 mb-3 uppercase tracking-wider flex items-center gap-1.5">
                      <span className="w-1.5 h-3 rounded bg-nagari-green-600 block"></span> Data Pewaris
                    </h4>
                    <div className="space-y-3">
                      <div className="space-y-1"><label className="font-bold text-slate-700 dark:text-slate-350 block">Nama Pewaris</label><input type="text" name="namaPewaris" value={formData.namaPewaris} onChange={handleChange} onFocus={() => setFocusedField("namaPewaris")} onBlur={() => setFocusedField(null)} className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 focus:outline-none focus:border-nagari-green-600 focus:ring-2 focus:ring-nagari-green-600/10 transition-all" /></div>
                      <div className="space-y-1"><label className="font-bold text-slate-700 dark:text-slate-350 block">NIK</label><input type="text" name="nikPewaris" value={formData.nikPewaris} onChange={handleChange} onFocus={() => setFocusedField("nikPewaris")} onBlur={() => setFocusedField(null)} className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 focus:outline-none focus:border-nagari-green-600 focus:ring-2 focus:ring-nagari-green-600/10 transition-all" /></div>
                      <div className="space-y-1"><label className="font-bold text-slate-700 dark:text-slate-350 block">Tempat/Tanggal Lahir</label><input type="text" name="ttlPewaris" value={formData.ttlPewaris} onChange={handleChange} onFocus={() => setFocusedField("ttlPewaris")} onBlur={() => setFocusedField(null)} className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 focus:outline-none focus:border-nagari-green-600 focus:ring-2 focus:ring-nagari-green-600/10 transition-all" /></div>
                      <div className="space-y-1"><label className="font-bold text-slate-700 dark:text-slate-350 block">Suku/Agama</label><input type="text" name="sukuAgamaPewaris" value={formData.sukuAgamaPewaris} onChange={handleChange} onFocus={() => setFocusedField("sukuAgamaPewaris")} onBlur={() => setFocusedField(null)} className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 focus:outline-none focus:border-nagari-green-600 focus:ring-2 focus:ring-nagari-green-600/10 transition-all" /></div>
                      <div className="space-y-1"><label className="font-bold text-slate-700 dark:text-slate-350 block">Pekerjaan</label><input type="text" name="pekerjaanPewaris" value={formData.pekerjaanPewaris} onChange={handleChange} onFocus={() => setFocusedField("pekerjaanPewaris")} onBlur={() => setFocusedField(null)} className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 focus:outline-none focus:border-nagari-green-600 focus:ring-2 focus:ring-nagari-green-600/10 transition-all" /></div>
                      <div className="space-y-1"><label className="font-bold text-slate-700 dark:text-slate-350 block">Alamat Lengkap</label><textarea name="alamatPewaris" value={formData.alamatPewaris} onChange={handleChange} onFocus={() => setFocusedField("alamatPewaris")} onBlur={() => setFocusedField(null)} rows={2} className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 focus:outline-none focus:border-nagari-green-600 focus:ring-2 focus:ring-nagari-green-600/10 transition-all" /></div>
                    </div>
                  </div>
                </>
              )}

              {/* DOMISILI / TIDAK BEKERJA */}
              {(selectedTemplate === "domisili" || selectedTemplate === "tidak-bekerja") && (
                <div className="border-t border-slate-100 dark:border-slate-850 pt-4">
                  <h4 className="font-black text-xs text-nagari-green-700 dark:text-nagari-gold-400 mb-3 uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-1.5 h-3 rounded bg-nagari-green-600 block"></span> Data Pemohon
                  </h4>
                  <div className="space-y-3">
                    <div className="space-y-1"><label className="font-bold text-slate-700 dark:text-slate-350 block">Nama Lengkap</label><input type="text" name="nama" value={formData.nama} onChange={handleChange} onFocus={() => setFocusedField("nama")} onBlur={() => setFocusedField(null)} className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 focus:outline-none focus:border-nagari-green-600 focus:ring-2 focus:ring-nagari-green-600/10 transition-all" /></div>
                    <div className="space-y-1"><label className="font-bold text-slate-700 dark:text-slate-350 block">NIK</label><input type="text" name="nik" value={formData.nik} onChange={handleChange} onFocus={() => setFocusedField("nik")} onBlur={() => setFocusedField(null)} className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 focus:outline-none focus:border-nagari-green-600 focus:ring-2 focus:ring-nagari-green-600/10 transition-all" /></div>
                    <div className="space-y-1"><label className="font-bold text-slate-700 dark:text-slate-350 block">Tempat/Tanggal Lahir</label><input type="text" name="ttl" value={formData.ttl} onChange={handleChange} onFocus={() => setFocusedField("ttl")} onBlur={() => setFocusedField(null)} className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 focus:outline-none focus:border-nagari-green-600 focus:ring-2 focus:ring-nagari-green-600/10 transition-all" /></div>
                    <div className="space-y-1"><label className="font-bold text-slate-700 dark:text-slate-350 block">Jenis Kelamin</label><input type="text" name="jenisKelamin" value={formData.jenisKelamin} onChange={handleChange} onFocus={() => setFocusedField("jenisKelamin")} onBlur={() => setFocusedField(null)} className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 focus:outline-none focus:border-nagari-green-600 focus:ring-2 focus:ring-nagari-green-600/10 transition-all" /></div>
                    <div className="space-y-1"><label className="font-bold text-slate-700 dark:text-slate-350 block">Suku / Agama / Kepercayaan</label><input type="text" name="sukuAgama" value={formData.sukuAgama} onChange={handleChange} onFocus={() => setFocusedField("sukuAgama")} onBlur={() => setFocusedField(null)} className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 focus:outline-none focus:border-nagari-green-600 focus:ring-2 focus:ring-nagari-green-600/10 transition-all" /></div>
                    {selectedTemplate === "domisili" && (
                      <div className="space-y-1"><label className="font-bold text-slate-700 dark:text-slate-350 block">Pekerjaan</label><input type="text" name="pekerjaan" value={formData.pekerjaan} onChange={handleChange} onFocus={() => setFocusedField("pekerjaan")} onBlur={() => setFocusedField(null)} className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 focus:outline-none focus:border-nagari-green-600 focus:ring-2 focus:ring-nagari-green-600/10 transition-all" /></div>
                    )}
                    <div className="space-y-1"><label className="font-bold text-slate-700 dark:text-slate-350 block">Alamat Tinggal</label><textarea name="alamat" value={formData.alamat} onChange={handleChange} onFocus={() => setFocusedField("alamat")} onBlur={() => setFocusedField(null)} rows={2} className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 focus:outline-none focus:border-nagari-green-600 focus:ring-2 focus:ring-nagari-green-600/10 transition-all" /></div>
                    <div className="space-y-1"><label className="font-bold text-slate-700 dark:text-slate-350 block">Tujuan / Keperluan Surat</label><input type="text" name="keperluan" value={formData.keperluan} onChange={handleChange} onFocus={() => setFocusedField("keperluan")} onBlur={() => setFocusedField(null)} className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 focus:outline-none focus:border-nagari-green-600 focus:ring-2 focus:ring-nagari-green-600/10 transition-all" /></div>
                  </div>
                </div>
              )}

              {/* KELAHIRAN */}
              {selectedTemplate === "kelahiran" && (
                <>
                  <div className="border-t border-slate-100 dark:border-slate-850 pt-4">
                    <h4 className="font-black text-xs text-nagari-green-700 dark:text-nagari-gold-400 mb-3 uppercase tracking-wider flex items-center gap-1.5">
                      <span className="w-1.5 h-3 rounded bg-nagari-green-600 block"></span> Data Kelahiran Bayi
                    </h4>
                    <div className="space-y-3">
                      <div className="space-y-1"><label className="font-bold text-slate-700 dark:text-slate-350 block">Nama Bayi</label><input type="text" name="namaBayi" value={formData.namaBayi} onChange={handleChange} onFocus={() => setFocusedField("namaBayi")} onBlur={() => setFocusedField(null)} className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 focus:outline-none focus:border-nagari-green-600 focus:ring-2 focus:ring-nagari-green-600/10 transition-all" /></div>
                      <div className="space-y-1"><label className="font-bold text-slate-700 dark:text-slate-350 block">Hari/Tanggal Lahir</label><input type="text" name="hariTanggalLahirBayi" value={formData.hariTanggalLahirBayi} onChange={handleChange} onFocus={() => setFocusedField("hariTanggalLahirBayi")} onBlur={() => setFocusedField(null)} className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 focus:outline-none focus:border-nagari-green-600 focus:ring-2 focus:ring-nagari-green-600/10 transition-all" /></div>
                      <div className="space-y-1"><label className="font-bold text-slate-700 dark:text-slate-350 block">Tempat Lahir</label><input type="text" name="tempatLahirBayi" value={formData.tempatLahirBayi} onChange={handleChange} onFocus={() => setFocusedField("tempatLahirBayi")} onBlur={() => setFocusedField(null)} className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 focus:outline-none focus:border-nagari-green-600 focus:ring-2 focus:ring-nagari-green-600/10 transition-all" /></div>
                      <div className="space-y-1"><label className="font-bold text-slate-700 dark:text-slate-350 block">Jenis Kelamin</label><input type="text" name="jenisKelaminBayi" value={formData.jenisKelaminBayi} onChange={handleChange} onFocus={() => setFocusedField("jenisKelaminBayi")} onBlur={() => setFocusedField(null)} className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 focus:outline-none focus:border-nagari-green-600 focus:ring-2 focus:ring-nagari-green-600/10 transition-all" /></div>
                    </div>
                  </div>
                  <div className="border-t border-slate-100 dark:border-slate-850 pt-4">
                    <h4 className="font-black text-xs text-nagari-green-700 dark:text-nagari-gold-400 mb-3 uppercase tracking-wider flex items-center gap-1.5">
                      <span className="w-1.5 h-3 rounded bg-nagari-green-600 block"></span> Data Orang Tua
                    </h4>
                    <div className="space-y-3">
                      <div className="space-y-1"><label className="font-bold text-slate-700 dark:text-slate-350 block">Nama Ibu</label><input type="text" name="namaIbu" value={formData.namaIbu} onChange={handleChange} onFocus={() => setFocusedField("namaIbu")} onBlur={() => setFocusedField(null)} className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 focus:outline-none focus:border-nagari-green-600 focus:ring-2 focus:ring-nagari-green-600/10 transition-all" /></div>
                      <div className="space-y-1"><label className="font-bold text-slate-700 dark:text-slate-350 block">NIK Ibu</label><input type="text" name="nikIbu" value={formData.nikIbu} onChange={handleChange} onFocus={() => setFocusedField("nikIbu")} onBlur={() => setFocusedField(null)} className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 focus:outline-none focus:border-nagari-green-600 focus:ring-2 focus:ring-nagari-green-600/10 transition-all" /></div>
                      <div className="space-y-1"><label className="font-bold text-slate-700 dark:text-slate-350 block">Pekerjaan Ibu</label><input type="text" name="pekerjaanIbu" value={formData.pekerjaanIbu} onChange={handleChange} onFocus={() => setFocusedField("pekerjaanIbu")} onBlur={() => setFocusedField(null)} className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 focus:outline-none focus:border-nagari-green-600 focus:ring-2 focus:ring-nagari-green-600/10 transition-all" /></div>
                      <div className="space-y-1"><label className="font-bold text-slate-700 dark:text-slate-350 block">Nama Ayah</label><input type="text" name="namaAyah" value={formData.namaAyah} onChange={handleChange} onFocus={() => setFocusedField("namaAyah")} onBlur={() => setFocusedField(null)} className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 focus:outline-none focus:border-nagari-green-600 focus:ring-2 focus:ring-nagari-green-600/10 transition-all" /></div>
                      <div className="space-y-1"><label className="font-bold text-slate-700 dark:text-slate-350 block">NIK Ayah</label><input type="text" name="nikAyah" value={formData.nikAyah} onChange={handleChange} onFocus={() => setFocusedField("nikAyah")} onBlur={() => setFocusedField(null)} className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 focus:outline-none focus:border-nagari-green-600 focus:ring-2 focus:ring-nagari-green-600/10 transition-all" /></div>
                      <div className="space-y-1"><label className="font-bold text-slate-700 dark:text-slate-350 block">Pekerjaan Ayah</label><input type="text" name="pekerjaanAyah" value={formData.pekerjaanAyah} onChange={handleChange} onFocus={() => setFocusedField("pekerjaanAyah")} onBlur={() => setFocusedField(null)} className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 focus:outline-none focus:border-nagari-green-600 focus:ring-2 focus:ring-nagari-green-600/10 transition-all" /></div>
                      <div className="space-y-1"><label className="font-bold text-slate-700 dark:text-slate-350 block">Alamat Orang Tua</label><textarea name="alamat" value={formData.alamat} onChange={handleChange} onFocus={() => setFocusedField("alamat")} onBlur={() => setFocusedField(null)} rows={2} className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 focus:outline-none focus:border-nagari-green-600 focus:ring-2 focus:ring-nagari-green-600/10 transition-all" /></div>
                    </div>
                  </div>
                </>
              )}

              {/* TIDAK MAMPU (SKTM) */}
              {selectedTemplate === "tidak-mampu" && (
                <>
                  <div className="border-t border-slate-100 dark:border-slate-850 pt-4">
                    <h4 className="font-black text-xs text-nagari-green-700 dark:text-nagari-gold-400 mb-3 uppercase tracking-wider flex items-center gap-1.5">
                      <span className="w-1.5 h-3 rounded bg-nagari-green-600 block"></span> Data Orang Tua / Wali
                    </h4>
                    <div className="space-y-3">
                      <div className="space-y-1"><label className="font-bold text-slate-700 dark:text-slate-350 block">Nama Lengkap Orang Tua</label><input type="text" name="nama" value={formData.nama} onChange={handleChange} onFocus={() => setFocusedField("nama")} onBlur={() => setFocusedField(null)} className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 focus:outline-none focus:border-nagari-green-600 focus:ring-2 focus:ring-nagari-green-600/10 transition-all" /></div>
                      <div className="space-y-1"><label className="font-bold text-slate-700 dark:text-slate-350 block">NIK Orang Tua</label><input type="text" name="nik" value={formData.nik} onChange={handleChange} onFocus={() => setFocusedField("nik")} onBlur={() => setFocusedField(null)} className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 focus:outline-none focus:border-nagari-green-600 focus:ring-2 focus:ring-nagari-green-600/10 transition-all" /></div>
                      <div className="space-y-1"><label className="font-bold text-slate-700 dark:text-slate-350 block">Tempat/Tanggal Lahir</label><input type="text" name="ttl" value={formData.ttl} onChange={handleChange} onFocus={() => setFocusedField("ttl")} onBlur={() => setFocusedField(null)} className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 focus:outline-none focus:border-nagari-green-600 focus:ring-2 focus:ring-nagari-green-600/10 transition-all" /></div>
                      <div className="space-y-1"><label className="font-bold text-slate-700 dark:text-slate-350 block">Pekerjaan</label><input type="text" name="pekerjaan" value={formData.pekerjaan} onChange={handleChange} onFocus={() => setFocusedField("pekerjaan")} onBlur={() => setFocusedField(null)} className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 focus:outline-none focus:border-nagari-green-600 focus:ring-2 focus:ring-nagari-green-600/10 transition-all" /></div>
                      <div className="space-y-1"><label className="font-bold text-slate-700 dark:text-slate-350 block">Alamat Tinggal</label><textarea name="alamat" value={formData.alamat} onChange={handleChange} onFocus={() => setFocusedField("alamat")} onBlur={() => setFocusedField(null)} rows={2} className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 focus:outline-none focus:border-nagari-green-600 focus:ring-2 focus:ring-nagari-green-600/10 transition-all" /></div>
                    </div>
                  </div>
                  <div className="border-t border-slate-100 dark:border-slate-855 pt-4">
                    <h4 className="font-black text-xs text-nagari-green-700 dark:text-nagari-gold-400 mb-3 uppercase tracking-wider flex items-center gap-1.5">
                      <span className="w-1.5 h-3 rounded bg-nagari-green-600 block"></span> Data Anak
                    </h4>
                    <div className="space-y-3">
                      <div className="space-y-1"><label className="font-bold text-slate-700 dark:text-slate-350 block">Nama Anak</label><input type="text" name="namaAnak" value={formData.namaAnak} onChange={handleChange} onFocus={() => setFocusedField("namaAnak")} onBlur={() => setFocusedField(null)} className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 focus:outline-none focus:border-nagari-green-600 focus:ring-2 focus:ring-nagari-green-600/10 transition-all" /></div>
                      <div className="space-y-1"><label className="font-bold text-slate-700 dark:text-slate-350 block">NIK Anak</label><input type="text" name="nikAnak" value={formData.nikAnak} onChange={handleChange} onFocus={() => setFocusedField("nikAnak")} onBlur={() => setFocusedField(null)} className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 focus:outline-none focus:border-nagari-green-600 focus:ring-2 focus:ring-nagari-green-600/10 transition-all" /></div>
                      <div className="space-y-1"><label className="font-bold text-slate-700 dark:text-slate-350 block">Tempat/Tanggal Lahir</label><input type="text" name="ttlAnak" value={formData.ttlAnak} onChange={handleChange} onFocus={() => setFocusedField("ttlAnak")} onBlur={() => setFocusedField(null)} className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 focus:outline-none focus:border-nagari-green-600 focus:ring-2 focus:ring-nagari-green-600/10 transition-all" /></div>
                      <div className="space-y-1"><label className="font-bold text-slate-700 dark:text-slate-350 block">Sekolah / Universitas</label><input type="text" name="sekolahAnak" value={formData.sekolahAnak} onChange={handleChange} onFocus={() => setFocusedField("sekolahAnak")} onBlur={() => setFocusedField(null)} className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 focus:outline-none focus:border-nagari-green-600 focus:ring-2 focus:ring-nagari-green-600/10 transition-all" /></div>
                      <div className="space-y-1"><label className="font-bold text-slate-700 dark:text-slate-350 block">Tujuan / Keperluan Surat</label><input type="text" name="keperluan" value={formData.keperluan} onChange={handleChange} onFocus={() => setFocusedField("keperluan")} onBlur={() => setFocusedField(null)} className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 focus:outline-none focus:border-nagari-green-600 focus:ring-2 focus:ring-nagari-green-600/10 transition-all" /></div>
                    </div>
                  </div>
                </>
              )}

              {/* USAHA (SKU) */}
              {selectedTemplate === "usaha" && (
                <>
                  <div className="border-t border-slate-100 dark:border-slate-850 pt-4">
                    <h4 className="font-black text-xs text-nagari-green-700 dark:text-nagari-gold-400 mb-3 uppercase tracking-wider flex items-center gap-1.5">
                      <span className="w-1.5 h-3 rounded bg-nagari-green-600 block"></span> Data Pemilik Usaha
                    </h4>
                    <div className="space-y-3">
                      <div className="space-y-1"><label className="font-bold text-slate-700 dark:text-slate-350 block">Nama Lengkap</label><input type="text" name="nama" value={formData.nama} onChange={handleChange} onFocus={() => setFocusedField("nama")} onBlur={() => setFocusedField(null)} className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 focus:outline-none focus:border-nagari-green-600 focus:ring-2 focus:ring-nagari-green-600/10 transition-all" /></div>
                      <div className="space-y-1"><label className="font-bold text-slate-700 dark:text-slate-350 block">NIK</label><input type="text" name="nik" value={formData.nik} onChange={handleChange} onFocus={() => setFocusedField("nik")} onBlur={() => setFocusedField(null)} className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 focus:outline-none focus:border-nagari-green-600 focus:ring-2 focus:ring-nagari-green-600/10 transition-all" /></div>
                      <div className="space-y-1"><label className="font-bold text-slate-700 dark:text-slate-350 block">Tempat/Tanggal Lahir</label><input type="text" name="ttl" value={formData.ttl} onChange={handleChange} onFocus={() => setFocusedField("ttl")} onBlur={() => setFocusedField(null)} className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 focus:outline-none focus:border-nagari-green-600 focus:ring-2 focus:ring-nagari-green-600/10 transition-all" /></div>
                      <div className="space-y-1"><label className="font-bold text-slate-700 dark:text-slate-350 block">Jenis Kelamin</label><input type="text" name="jenisKelamin" value={formData.jenisKelamin} onChange={handleChange} onFocus={() => setFocusedField("jenisKelamin")} onBlur={() => setFocusedField(null)} className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 focus:outline-none focus:border-nagari-green-600 focus:ring-2 focus:ring-nagari-green-600/10 transition-all" /></div>
                      <div className="space-y-1"><label className="font-bold text-slate-700 dark:text-slate-350 block">Alamat Rumah</label><textarea name="alamat" value={formData.alamat} onChange={handleChange} onFocus={() => setFocusedField("alamat")} onBlur={() => setFocusedField(null)} rows={2} className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 focus:outline-none focus:border-nagari-green-600 focus:ring-2 focus:ring-nagari-green-600/10 transition-all" /></div>
                    </div>
                  </div>
                  <div className="border-t border-slate-100 dark:border-slate-855 pt-4">
                    <h4 className="font-black text-xs text-nagari-green-700 dark:text-nagari-gold-400 mb-3 uppercase tracking-wider flex items-center gap-1.5">
                      <span className="w-1.5 h-3 rounded bg-nagari-green-600 block"></span> Data Usaha
                    </h4>
                    <div className="space-y-3">
                      <div className="space-y-1"><label className="font-bold text-slate-700 dark:text-slate-350 block">Nama Usaha</label><input type="text" name="namaUsaha" value={formData.namaUsaha} onChange={handleChange} onFocus={() => setFocusedField("namaUsaha")} onBlur={() => setFocusedField(null)} className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 focus:outline-none focus:border-nagari-green-600 focus:ring-2 focus:ring-nagari-green-600/10 transition-all" /></div>
                      <div className="space-y-1"><label className="font-bold text-slate-700 dark:text-slate-350 block">Jenis Usaha / Komoditas</label><input type="text" name="jenisUsaha" value={formData.jenisUsaha} onChange={handleChange} onFocus={() => setFocusedField("jenisUsaha")} onBlur={() => setFocusedField(null)} className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 focus:outline-none focus:border-nagari-green-600 focus:ring-2 focus:ring-nagari-green-600/10 transition-all" /></div>
                      <div className="space-y-1"><label className="font-bold text-slate-700 dark:text-slate-350 block">Lokasi Usaha</label><textarea name="lokasiUsaha" value={formData.lokasiUsaha} onChange={handleChange} onFocus={() => setFocusedField("lokasiUsaha")} onBlur={() => setFocusedField(null)} rows={2} className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 focus:outline-none focus:border-nagari-green-600 focus:ring-2 focus:ring-nagari-green-600/10 transition-all" /></div>
                      <div className="space-y-1"><label className="font-bold text-slate-700 dark:text-slate-350 block">Tujuan Penggunaan Surat</label><input type="text" name="keperluan" value={formData.keperluan} onChange={handleChange} onFocus={() => setFocusedField("keperluan")} onBlur={() => setFocusedField(null)} className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 focus:outline-none focus:border-nagari-green-600 focus:ring-2 focus:ring-nagari-green-600/10 transition-all" /></div>
                    </div>
                  </div>
                </>
              )}

              {/* TANDATANGAN (Common to all) */}
              <div className="border-t border-slate-100 dark:border-slate-850 pt-4">
                <h4 className="font-black text-xs text-nagari-green-700 dark:text-nagari-gold-400 mb-3 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-1.5 h-3 rounded bg-nagari-green-600 block"></span> Wali Nagari Penandatangan
                </h4>
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 dark:text-slate-350 block">Nama Wali Nagari</label>
                  <input
                    type="text"
                    name="waliNagari"
                    value={formData.waliNagari}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("waliNagari")}
                    onBlur={() => setFocusedField(null)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 focus:outline-none focus:border-nagari-green-600 focus:ring-2 focus:ring-nagari-green-600/10 transition-all"
                  />
                </div>

              </div>
            </div>
          </div>

          {/* Sisi Kanan: Live Preview A4 */}
          <div className={`w-full md:w-[55%] overflow-y-auto p-4 md:p-6 bg-slate-100 dark:bg-slate-950 flex flex-col justify-start items-center relative ${activeTab === "preview" ? "block" : "hidden md:block"}`}>
                
                {/* Sticky top info bar */}
                <div className="w-full max-w-[210mm] mb-4 flex justify-between items-center bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-4 py-2.5 rounded-xl border border-slate-200/40 dark:border-slate-800/40 sticky top-0 z-10 shadow-sm">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    Pratinjau Kertas A4
                  </span>
                  <button
                    onClick={handlePrint}
                    className="text-xs font-bold text-nagari-green-700 dark:text-nagari-gold-400 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                    </svg>
                    Cetak
                  </button>
                </div>

                {/* Printable container */}
                <div className="w-full flex justify-center overflow-x-auto pb-4">
                  <div
                    id="printable-letter"
                    className="bg-white text-slate-900 border border-slate-350 p-6 md:p-14 w-[210mm] min-h-[297mm] shadow-xl text-[11px] md:text-[14px] leading-relaxed font-serif relative"
                  >
                
                {/* KOP SURAT */}
                <div className="flex items-start gap-4 border-b-[4px] border-double border-black pb-3">
                  <div className="w-16 h-20 flex-shrink-0 flex items-center justify-center">
                    <img
                      src="/images/logo_padang_pariaman.png"
                      alt="Logo Kabupaten Padang Pariaman"
                      className="w-16 h-20 object-contain"
                    />
                  </div>

                  <div className="flex-1 text-center font-sans">
                    <h2 className="text-[14px] md:text-[16px] font-extrabold uppercase tracking-wide text-slate-900">
                      Pemerintah Kabupaten Padang Pariaman
                    </h2>
                    <h1 className="text-[18px] md:text-[20px] font-black uppercase tracking-widest text-emerald-950">
                      Nagari Toboh Gadang
                    </h1>
                    <h3 className="text-[13px] md:text-[15px] font-bold uppercase tracking-wider text-slate-800">
                      Kecamatan Sintuak Toboh Gadang
                    </h3>
                    <p className="text-[10px] md:text-[11px] font-medium italic mt-1 text-slate-700">
                      Jl. Lintas Lubuk Alung - Pariaman. email: tobohgadangcountry@gmail.com
                    </p>
                  </div>
                </div>

                {/* ISI SURAT SESUAI SELECTED TEMPLATE */}
                <div className="mt-8 space-y-6 text-justify text-slate-950">
                  
                  {/* --- 1. TEMPLATE: AHLI WARIS --- */}
                  {selectedTemplate === "ahli-waris" && (
                    <>
                      <div className="text-center space-y-1">
                        <h3 className="text-[15px] md:text-[17px] font-bold underline tracking-wider uppercase">
                          Surat Keterangan Ahli Waris
                        </h3>
                        <p className="font-sans font-medium">Nomor : {renderPreviewField("nomorSurat", formData.nomorSurat)}</p>
                      </div>

                      <p className="indent-8 text-justify">
                        Yang bertanda tangan dibawah ini Wali Nagari Toboh Gadang Kecamatan Sintuak Toboh Gadang Kabupaten Padang Pariaman dengan ini menerangkan bahwa:
                      </p>

                      <div className="pl-8 grid grid-cols-12 gap-y-1">
                        <div className="col-span-3 font-semibold">Nama</div>
                        <div className="col-span-9">: <span className="font-bold">{renderPreviewField("namaAhliWaris", formData.namaAhliWaris)}</span></div>
                        <div className="col-span-3 font-semibold">NIK</div>
                        <div className="col-span-9">: {renderPreviewField("nikAhliWaris", formData.nikAhliWaris)}</div>
                        <div className="col-span-3 font-semibold">Tempat/Tgl Lahir</div>
                        <div className="col-span-9">: {renderPreviewField("ttlAhliWaris", formData.ttlAhliWaris)}</div>
                        <div className="col-span-3 font-semibold">Suku/Agama</div>
                        <div className="col-span-9">: {renderPreviewField("sukuAgamaAhliWaris", formData.sukuAgamaAhliWaris)}</div>
                        <div className="col-span-3 font-semibold">Pekerjaan</div>
                        <div className="col-span-9">: {renderPreviewField("pekerjaanAhliWaris", formData.pekerjaanAhliWaris)}</div>
                        <div className="col-span-3 font-semibold">Alamat</div>
                        <div className="col-span-9">: {renderPreviewField("alamatAhliWaris", formData.alamatAhliWaris)}</div>
                      </div>

                      <p className="text-justify">
                        Bahwa orang yang tersebut namanya diatas adalah ahli waris (<span className="italic">{renderPreviewField("hubungan", formData.hubungan)}</span>) dari :
                      </p>

                      <div className="pl-8 grid grid-cols-12 gap-y-1">
                        <div className="col-span-3 font-semibold">Nama</div>
                        <div className="col-span-9">: <span className="font-bold">{renderPreviewField("namaPewaris", formData.namaPewaris)}</span></div>
                        <div className="col-span-3 font-semibold">NIK</div>
                        <div className="col-span-9">: {renderPreviewField("nikPewaris", formData.nikPewaris)}</div>
                        <div className="col-span-3 font-semibold">Tempat/Tgl Lahir</div>
                        <div className="col-span-9">: {renderPreviewField("ttlPewaris", formData.ttlPewaris)}</div>
                        <div className="col-span-3 font-semibold">Suku/Agama</div>
                        <div className="col-span-9">: {renderPreviewField("sukuAgamaPewaris", formData.sukuAgamaPewaris)}</div>
                        <div className="col-span-3 font-semibold">Pekerjaan</div>
                        <div className="col-span-9">: {renderPreviewField("pekerjaanPewaris", formData.pekerjaanPewaris)}</div>
                        <div className="col-span-3 font-semibold">Alamat</div>
                        <div className="col-span-9">: {renderPreviewField("alamatPewaris", formData.alamatPewaris)}</div>
                      </div>

                      <p className="text-justify leading-relaxed">
                        Orang yang namanya tersebut diatas benar warga Nagari Toboh Gadang Kecamatan Sintuak Toboh Gadang Kabupaten Padang Pariaman dan Menurut Orang yang bersangkutan diatas adalah benar <span className="font-bold">{formData.namaAhliWaris}</span> ahli waris yang sah (<span className="italic">{formData.hubungan}</span>) dari <span className="font-bold">{formData.namaPewaris}</span>.
                      </p>
                    </>
                  )}

                  {/* --- 2. TEMPLATE: DOMISILI --- */}
                  {selectedTemplate === "domisili" && (
                    <>
                      <div className="text-center space-y-1">
                        <h3 className="text-[15px] md:text-[17px] font-bold underline tracking-wider uppercase">
                          Surat Keterangan Domisili
                        </h3>
                        <p className="font-sans font-medium">Nomor : {renderPreviewField("nomorSurat", formData.nomorSurat)}</p>
                      </div>

                      <p className="indent-8 text-justify">
                        Yang bertanda tangan dibawah ini Wali Nagari Toboh Gadang Kecamatan Sintuak Toboh Gadang Kabupaten Padang Pariaman menerangkan dengan sebenarnya bahwa:
                      </p>

                      <div className="pl-8 grid grid-cols-12 gap-y-1">
                        <div className="col-span-3 font-semibold">Nama Lengkap</div>
                        <div className="col-span-9">: <span className="font-bold">{renderPreviewField("nama", formData.nama)}</span></div>
                        <div className="col-span-3 font-semibold">NIK</div>
                        <div className="col-span-9">: {renderPreviewField("nik", formData.nik)}</div>
                        <div className="col-span-3 font-semibold">Tempat/Tgl Lahir</div>
                        <div className="col-span-9">: {renderPreviewField("ttl", formData.ttl)}</div>
                        <div className="col-span-3 font-semibold">Jenis Kelamin</div>
                        <div className="col-span-9">: {renderPreviewField("jenisKelamin", formData.jenisKelamin)}</div>
                        <div className="col-span-3 font-semibold">Suku/Agama</div>
                        <div className="col-span-9">: {renderPreviewField("sukuAgama", formData.sukuAgama)}</div>
                        <div className="col-span-3 font-semibold">Pekerjaan</div>
                        <div className="col-span-9">: {renderPreviewField("pekerjaan", formData.pekerjaan)}</div>
                        <div className="col-span-3 font-semibold">Alamat</div>
                        <div className="col-span-9">: {renderPreviewField("alamat", formData.alamat)}</div>
                      </div>

                      <p className="indent-8 text-justify leading-relaxed">
                        Bahwa orang yang bersangkutan adalah benar warga yang berdomisili dan menetap di alamat tersebut di atas di wilayah Nagari Toboh Gadang, Kecamatan Sintuak Toboh Gadang, Kabupaten Padang Pariaman.
                      </p>

                      <p className="indent-8 text-justify leading-relaxed">
                        Demikianlah Surat Keterangan Domisili ini diberikan kepada yang bersangkutan untuk dipergunakan sebagai: <span className="font-semibold">{renderPreviewField("keperluan", formData.keperluan)}</span>.
                      </p>
                    </>
                  )}

                  {/* --- 3. TEMPLATE: KELAHIRAN --- */}
                  {selectedTemplate === "kelahiran" && (
                    <>
                      <div className="text-center space-y-1">
                        <h3 className="text-[15px] md:text-[17px] font-bold underline tracking-wider uppercase">
                          Surat Keterangan Kelahiran
                        </h3>
                        <p className="font-sans font-medium">Nomor : {renderPreviewField("nomorSurat", formData.nomorSurat)}</p>
                      </div>

                      <p className="indent-8 text-justify">
                        Yang bertanda tangan dibawah ini Wali Nagari Toboh Gadang Kecamatan Sintuak Toboh Gadang Kabupaten Padang Pariaman dengan ini menerangkan bahwa telah lahir seorang anak:
                      </p>

                      <div className="pl-8 grid grid-cols-12 gap-y-1">
                        <div className="col-span-3 font-semibold">Nama Bayi</div>
                        <div className="col-span-9">: <span className="font-bold">{renderPreviewField("namaBayi", formData.namaBayi)}</span></div>
                        <div className="col-span-3 font-semibold">Hari/Tgl Lahir</div>
                        <div className="col-span-9">: {renderPreviewField("hariTanggalLahirBayi", formData.hariTanggalLahirBayi)}</div>
                        <div className="col-span-3 font-semibold">Tempat Lahir</div>
                        <div className="col-span-9">: {renderPreviewField("tempatLahirBayi", formData.tempatLahirBayi)}</div>
                        <div className="col-span-3 font-semibold">Jenis Kelamin</div>
                        <div className="col-span-9">: {renderPreviewField("jenisKelaminBayi", formData.jenisKelaminBayi)}</div>
                      </div>

                      <p className="text-justify font-semibold">
                        Dari pasangan suami-istri yang sah:
                      </p>

                      <div className="pl-8 grid grid-cols-12 gap-y-1">
                        <div className="col-span-3 font-semibold">Nama Ibu</div>
                        <div className="col-span-9">: {renderPreviewField("namaIbu", formData.namaIbu)} (NIK: {renderPreviewField("nikIbu", formData.nikIbu)})</div>
                        <div className="col-span-3 font-semibold">Pekerjaan Ibu</div>
                        <div className="col-span-9">: {renderPreviewField("pekerjaanIbu", formData.pekerjaanIbu)}</div>
                        <div className="col-span-3 font-semibold">Nama Ayah</div>
                        <div className="col-span-9">: {renderPreviewField("namaAyah", formData.namaAyah)} (NIK: {renderPreviewField("nikAyah", formData.nikAyah)})</div>
                        <div className="col-span-3 font-semibold">Pekerjaan Ayah</div>
                        <div className="col-span-9">: {renderPreviewField("pekerjaanAyah", formData.pekerjaanAyah)}</div>
                        <div className="col-span-3 font-semibold">Alamat Orang Tua</div>
                        <div className="col-span-9">: {renderPreviewField("alamat", formData.alamat)}</div>
                      </div>

                      <p className="indent-8 text-justify">
                        Demikianlah Surat Keterangan Kelahiran ini dibuat dengan sebenarnya agar dapat dipergunakan sebagaimana mestinya.
                      </p>
                    </>
                  )}

                  {/* --- 4. TEMPLATE: TIDAK BEKERJA --- */}
                  {selectedTemplate === "tidak-bekerja" && (
                    <>
                      <div className="text-center space-y-1">
                        <h3 className="text-[15px] md:text-[17px] font-bold underline tracking-wider uppercase">
                          Surat Keterangan Tidak Bekerja
                        </h3>
                        <p className="font-sans font-medium">Nomor : {renderPreviewField("nomorSurat", formData.nomorSurat)}</p>
                      </div>

                      <p className="indent-8 text-justify">
                        Yang bertanda tangan dibawah ini Wali Nagari Toboh Gadang Kecamatan Sintuak Toboh Gadang Kabupaten Padang Pariaman menerangkan dengan sebenarnya bahwa:
                      </p>

                      <div className="pl-8 grid grid-cols-12 gap-y-1">
                        <div className="col-span-3 font-semibold">Nama Lengkap</div>
                        <div className="col-span-9">: <span className="font-bold">{renderPreviewField("nama", formData.nama)}</span></div>
                        <div className="col-span-3 font-semibold">NIK</div>
                        <div className="col-span-9">: {renderPreviewField("nik", formData.nik)}</div>
                        <div className="col-span-3 font-semibold">Tempat/Tgl Lahir</div>
                        <div className="col-span-9">: {renderPreviewField("ttl", formData.ttl)}</div>
                        <div className="col-span-3 font-semibold">Jenis Kelamin</div>
                        <div className="col-span-9">: {renderPreviewField("jenisKelamin", formData.jenisKelamin)}</div>
                        <div className="col-span-3 font-semibold">Agama</div>
                        <div className="col-span-9">: {renderPreviewField("sukuAgama", formData.sukuAgama)}</div>
                        <div className="col-span-3 font-semibold">Alamat</div>
                        <div className="col-span-9">: {renderPreviewField("alamat", formData.alamat)}</div>
                      </div>

                      <p className="indent-8 text-justify leading-relaxed">
                        Bahwa yang bersangkutan sampai saat ini benar-benar <strong>tidak sedang bekerja (menganggur)</strong> dan tidak terikat kontrak kerja dengan instansi pemerintah maupun swasta mana pun.
                      </p>

                      <p className="indent-8 text-justify leading-relaxed">
                        Demikianlah Surat Keterangan ini dibuat dengan sebenarnya atas keterangan bersangkutan untuk dipergunakan sebagai: <span className="font-semibold">{renderPreviewField("keperluan", formData.keperluan)}</span>.
                      </p>
                    </>
                  )}

                  {/* --- 5. TEMPLATE: TIDAK MAMPU (SKTM) --- */}
                  {selectedTemplate === "tidak-mampu" && (
                    <>
                      <div className="text-center space-y-1">
                        <h3 className="text-[15px] md:text-[17px] font-bold underline tracking-wider uppercase">
                          Surat Keterangan Tidak Mampu
                        </h3>
                        <p className="font-sans font-medium">Nomor : {renderPreviewField("nomorSurat", formData.nomorSurat)}</p>
                      </div>

                      <p className="indent-8 text-justify">
                        Yang bertanda tangan dibawah ini Wali Nagari Toboh Gadang Kecamatan Sintuak Toboh Gadang Kabupaten Padang Pariaman menerangkan dengan sebenarnya bahwa:
                      </p>

                      <div className="pl-8 grid grid-cols-12 gap-y-1">
                        <div className="col-span-3 font-semibold">Nama Orang Tua</div>
                        <div className="col-span-9">: <span className="font-bold">{renderPreviewField("nama", formData.nama)}</span></div>
                        <div className="col-span-3 font-semibold">NIK</div>
                        <div className="col-span-9">: {renderPreviewField("nik", formData.nik)}</div>
                        <div className="col-span-3 font-semibold">Tempat/Tgl Lahir</div>
                        <div className="col-span-9">: {renderPreviewField("ttl", formData.ttl)}</div>
                        <div className="col-span-3 font-semibold">Pekerjaan</div>
                        <div className="col-span-9">: {renderPreviewField("pekerjaan", formData.pekerjaan)}</div>
                        <div className="col-span-3 font-semibold">Alamat</div>
                        <div className="col-span-9">: {renderPreviewField("alamat", formData.alamat)}</div>
                      </div>

                      <p className="text-justify font-semibold">
                        Adalah orang tua / wali dari anak berikut:
                      </p>

                      <div className="pl-8 grid grid-cols-12 gap-y-1">
                        <div className="col-span-3 font-semibold">Nama Anak</div>
                        <div className="col-span-9">: <span className="font-bold">{renderPreviewField("namaAnak", formData.namaAnak)}</span></div>
                        <div className="col-span-3 font-semibold">NIK Anak</div>
                        <div className="col-span-9">: {renderPreviewField("nikAnak", formData.nikAnak)}</div>
                        <div className="col-span-3 font-semibold">Tempat/Tgl Lahir</div>
                        <div className="col-span-9">: {renderPreviewField("ttlAnak", formData.ttlAnak)}</div>
                        <div className="col-span-3 font-semibold">Sekolah/Univ</div>
                        <div className="col-span-9">: {renderPreviewField("sekolahAnak", formData.sekolahAnak)}</div>
                      </div>

                      <p className="indent-8 text-justify leading-relaxed">
                        Berdasarkan keterangan dari Wali Jorong setempat, keluarga tersebut benar tergolong dalam keadaan keluarga kurang mampu/ekonomi lemah.
                      </p>

                      <p className="indent-8 text-justify leading-relaxed">
                        Demikianlah Surat Keterangan Tidak Mampu ini dibuat untuk dipergunakan sebagai: <span className="font-semibold">{renderPreviewField("keperluan", formData.keperluan)}</span>.
                      </p>
                    </>
                  )}

                  {/* --- 6. TEMPLATE: USAHA (SKU) --- */}
                  {selectedTemplate === "usaha" && (
                    <>
                      <div className="text-center space-y-1">
                        <h3 className="text-[15px] md:text-[17px] font-bold underline tracking-wider uppercase">
                          Surat Keterangan Usaha (SKU)
                        </h3>
                        <p className="font-sans font-medium">Nomor : {renderPreviewField("nomorSurat", formData.nomorSurat)}</p>
                      </div>

                      <p className="indent-8 text-justify">
                        Yang bertanda tangan dibawah ini Wali Nagari Toboh Gadang Kecamatan Sintuak Toboh Gadang Kabupaten Padang Pariaman menerangkan dengan sebenarnya bahwa:
                      </p>

                      <div className="pl-8 grid grid-cols-12 gap-y-1">
                        <div className="col-span-3 font-semibold">Nama Lengkap</div>
                        <div className="col-span-9">: <span className="font-bold">{renderPreviewField("nama", formData.nama)}</span></div>
                        <div className="col-span-3 font-semibold">NIK</div>
                        <div className="col-span-9">: {renderPreviewField("nik", formData.nik)}</div>
                        <div className="col-span-3 font-semibold">Tempat/Tgl Lahir</div>
                        <div className="col-span-9">: {renderPreviewField("ttl", formData.ttl)}</div>
                        <div className="col-span-3 font-semibold">Jenis Kelamin</div>
                        <div className="col-span-9">: {renderPreviewField("jenisKelamin", formData.jenisKelamin)}</div>
                        <div className="col-span-3 font-semibold">Alamat Rumah</div>
                        <div className="col-span-9">: {renderPreviewField("alamat", formData.alamat)}</div>
                      </div>

                      <p className="indent-8 text-justify leading-relaxed">
                        Bahwa yang bersangkutan benar memiliki dan mengelola usaha produktif berupa:
                      </p>

                      <div className="pl-8 grid grid-cols-12 gap-y-1">
                        <div className="col-span-3 font-semibold">Nama Usaha</div>
                        <div className="col-span-9">: <span className="font-bold">{renderPreviewField("namaUsaha", formData.namaUsaha)}</span></div>
                        <div className="col-span-3 font-semibold">Jenis/Komoditas</div>
                        <div className="col-span-9">: {renderPreviewField("jenisUsaha", formData.jenisUsaha)}</div>
                        <div className="col-span-3 font-semibold">Lokasi Usaha</div>
                        <div className="col-span-9">: {renderPreviewField("lokasiUsaha", formData.lokasiUsaha)}</div>
                      </div>

                      <p className="indent-8 text-justify leading-relaxed">
                        Usaha tersebut telah berjalan selama kurang lebih 2 (dua) tahun dan berjalan aktif hingga sekarang.
                      </p>

                      <p className="indent-8 text-justify leading-relaxed">
                        Demikianlah Surat Keterangan Usaha ini dibuat untuk dipergunakan sebagai: <span className="font-semibold">{renderPreviewField("keperluan", formData.keperluan)}</span>.
                      </p>
                    </>
                  )}

                  {/* PARAGRAF PENUTUP (Common) */}
                  <p className="indent-8 text-justify">
                    Demikianlah Surat Keterangan ini dibuat dengan sebenarnya agar dapat dipergunakan sebagaimana mestinya.
                  </p>
                </div>

                {/* TANDA TANGAN */}
                <div className="mt-12 flex justify-end">
                  <div className="text-center space-y-16 w-60 text-slate-900">
                    <div className="space-y-1 font-sans">
                      <p>Toboh Gadang, {renderPreviewField("tanggalSurat", formData.tanggalSurat)}</p>
                      <p className="font-bold">Wali Nagari Toboh Gadang</p>
                    </div>
                    
                    <div className="font-sans font-bold underline uppercase tracking-wide">
                      {renderPreviewField("waliNagari", formData.waliNagari)}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row gap-3 justify-between items-center bg-slate-50/50 dark:bg-slate-900/40">
              <a
                href={documents.find(d => d.id === selectedTemplate)?.url}
                download={documents.find(d => d.id === selectedTemplate)?.filename}
                className="w-full sm:w-auto py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Unduh Format Word (.doc)
              </a>

              <div className="w-full sm:w-auto flex gap-2">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 sm:flex-initial py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold text-slate-650 dark:text-slate-350 transition-all cursor-pointer"
                >
                  Tutup
                </button>
                <button
                  onClick={handlePrint}
                  className="flex-2 sm:flex-initial py-2.5 px-5 rounded-xl bg-nagari-green-600 hover:bg-nagari-green-700 dark:bg-nagari-gold-500 dark:hover:bg-nagari-gold-600 text-white dark:text-slate-950 text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg shadow-nagari-green-600/10 cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                  </svg>
                  Cetak / Simpan PDF
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
