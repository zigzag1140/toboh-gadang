export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      {/* Top Banner with Local Context */}
      <div className="bg-gradient-to-r from-nagari-green-800 to-nagari-green-950 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="font-bold text-lg">Nagari Toboh Gadang - Bersatu Membangun Daerah</h4>
            <p className="text-sm text-nagari-green-100 mt-1">Platform Informasi Terintegrasi Wali Nagari dan Warga.</p>
          </div>
          <div className="flex items-center gap-2 text-xs bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm border border-white/15">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            Pelayanan Online Aktif 24 Jam
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1: Profile & About */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/images/logo_padang_pariaman.png"
                alt="Logo Kabupaten Padang Pariaman"
                className="w-9 h-10 object-contain shrink-0"
              />
              <span className="font-bold text-lg text-white tracking-wider">
                KANTOR WALI NAGARI TOBOH GADANG
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Pusat pelayanan administrasi dan informasi nagari, berkomitmen mewujudkan tata kelola pemerintahan nagari yang transparan, akuntabel, dan berorientasi pada pelayanan masyarakat.
            </p>
          </div>

          {/* Column 2: Operation Hours & Socials */}
          <div className="space-y-4">
            <h3 className="font-bold text-white text-base tracking-wider uppercase border-b border-slate-800 pb-2">
              Jam Operasional Kantor
            </h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li className="flex justify-between">
                <span>Senin - Kamis:</span>
                <span className="text-slate-200">08.00 - 16.00 WIB</span>
              </li>
              <li className="flex justify-between">
                <span>Jumat:</span>
                <span className="text-slate-200">08.00 - 15.30 WIB</span>
              </li>
              <li className="flex justify-between">
                <span>Sabtu - Minggu:</span>
                <span className="text-red-400 font-semibold">Tutup (Libur)</span>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Details */}
          <div className="space-y-4">
            <h3 className="font-bold text-white text-base tracking-wider uppercase border-b border-slate-800 pb-2">
              Hubungi Kami
            </h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex gap-3">
                <svg className="w-5 h-5 text-nagari-gold-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Jl. Raya Toboh Gadang No. 42, Nagari Toboh Gadang, Kec. Sintuk Toboh Gadang, Kab. Padang Pariaman, Sumatera Barat</span>
              </li>
              <li className="flex gap-3 items-center">
                <svg className="w-5 h-5 text-nagari-gold-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="https://wa.me/6281277014421" target="_blank" rel="noopener noreferrer" className="hover:text-nagari-gold-400 transition-colors">
                  +6281277014421
                </a>
              </li>
              <li className="flex gap-3 items-center">
                <svg className="w-5 h-5 text-nagari-gold-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:tobohgadangcountry@gmail.com" className="hover:text-nagari-gold-400 transition-colors">
                  tobohgadangcountry@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom copyright */}
        <div className="border-t border-slate-800 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Pemerintahan Nagari Toboh Gadang. Hak Cipta Dilindungi.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-slate-300">Kebijakan Privasi</a>
            <a href="#" className="hover:text-slate-300">Syarat & Ketentuan</a>
            <a href="/admin" className="hover:text-nagari-gold-400 font-semibold flex items-center gap-1">
              <span>Portal Admin</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
