import React from "react";

export default function ProfilPage() {
  const misiList = [
    {
      num: "01",
      title: "Sarana & Prasarana",
      text: "Memperbaiki dan menambah sarana dan prasarana yang dibutuhkan oleh masyarakat Nagari Toboh Gadang.",
      icon: "🏗️",
      tag: "Infrastruktur",
    },
    {
      num: "02",
      title: "Kualitas Sumber Daya Manusia",
      text: "Meningkatkan kualitas sumber daya manusia (SDM) melalui pendidikan formal maupun informal.",
      icon: "🎓",
      tag: "Pendidikan",
    },
    {
      num: "03",
      title: "Produktivitas Pertanian",
      text: "Meningkatkan hasil dan produktivitas pertanian melalui kerja sama dengan petugas penyuluh lapangan serta pemanfaatan potensi pertanian nagari.",
      icon: "🌾",
      tag: "Pertanian",
    },
    {
      num: "04",
      title: "Pengembangan Usaha Tani",
      text: "Meningkatkan dan mengembangkan usaha pertanian sebagai salah satu sektor utama perekonomian masyarakat.",
      icon: "📈",
      tag: "Ekonomi",
    },
    {
      num: "05",
      title: "Optimalisasi PAN",
      text: "Meningkatkan dan mengelola Pendapatan Asli Nagari (PAN) secara optimal untuk mendukung pembangunan dan kesejahteraan masyarakat.",
      icon: "💎",
      tag: "Keuangan",
    },
    {
      num: "06",
      title: "Tata Kelola Bersih & Transparan",
      text: "Mewujudkan pemerintahan yang baik, bersih, transparan, dan berorientasi pada pelayanan masyarakat melalui pelaksanaan pemerintahan yang efektif dan sesuai ketentuan.",
      icon: "🏛️",
      tag: "Pelayanan",
    },
    {
      num: "07",
      title: "Pembinaan Moral & Keagamaan",
      text: "Membina mental, spiritual, dan kehidupan keagamaan masyarakat, sehingga nilai-nilai agama dapat diamalkan dalam kehidupan sehari-hari.",
      icon: "🕌",
      tag: "Spiritual",
    },
  ];

  return (
    <div className="py-10 space-y-24">
      {/* 1. HERO BANNER PROFIL */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#1C3A27] via-[#244b33] to-[#122519] text-white p-8 sm:p-12 lg:p-16 shadow-2xl shadow-emerald-950/20 border border-emerald-800/40">
          {/* Ambient Lighting Orbs */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#C5A85C]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#2E5A3E]/40 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[#E6D5AC] text-xs font-bold tracking-widest uppercase">
              <span className="w-2 h-2 rounded-full bg-[#C5A85C] animate-pulse"></span>
              Portal Resmi Profil Wilayah
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] text-white">
              Nagari Toboh Gadang
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-emerald-100/90 leading-relaxed font-light">
              Mengenal lebih dekat sejarah luhur, arah visi pembangunan, batas geografis wilayah, serta struktur kepemimpinan adat dan aparatur pemerintahan nagari.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-semibold text-emerald-200/80">
              <span className="flex items-center gap-1.5">
                📍 Kec. Sintuk Toboh Gadang
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                🏛️ Kab. Padang Pariaman
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                🌿 Sumatera Barat
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. VISI & 7 MISI SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-nagari-green-600 dark:text-nagari-gold-400 uppercase tracking-widest">
            Arah &amp; Komitmen Pembangunan
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Visi &amp; Misi Nagari
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            Pedoman strategis mewujudkan nagari madani yang mandiri, berdaya saing, dan sejahtera berlandaskan nilai agama.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Visi Card (Span 5) */}
          <div className="lg:col-span-5 space-y-4 sticky top-24">
            <div className="relative overflow-hidden bg-gradient-to-br from-[#1C3A27] to-[#122519] rounded-[2rem] p-8 sm:p-10 text-white shadow-xl shadow-emerald-950/15 border-2 border-[#C5A85C]/40">
              {/* Decorative Gold Glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#C5A85C]/20 rounded-full blur-2xl pointer-events-none" />
              
              <div className="relative z-10 space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 text-xs font-bold text-[#E6D5AC] uppercase tracking-wider">
                  <span>🎯</span>
                  <span>Visi Utama Nagari</span>
                </div>

                <blockquote className="font-serif text-lg sm:text-xl italic font-medium leading-relaxed text-emerald-50">
                  &ldquo;Memberantas kemiskinan dengan meningkatkan ekonomi untuk mewujudkan masyarakat Nagari Toboh Gadang yang sejahtera, bahagia, dan mandiri yang berlandaskan agama.&rdquo;
                </blockquote>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-emerald-200/70">
                  <span>RPJM Nagari Toboh Gadang</span>
                  <span className="text-[#C5A85C] font-bold">2021 – 2027</span>
                </div>
              </div>
            </div>

            {/* Quote Card Note */}
            <div className="bg-[#FAFBF9] dark:bg-slate-900/60 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 space-y-1.5">
              <span className="font-bold text-[#2E5A3E] dark:text-[#C5A85C] block">
                💡 Semangat Pembangunan:
              </span>
              <p className="leading-relaxed">
                Pondasi pembangunan bertumpu pada kolaborasi antara niniak mamak, alim ulama, cadiak pandai, dan seluruh warga nagari.
              </p>
            </div>
          </div>

          {/* Right Column: 7 Misi Points (Span 7) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between pb-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                7 Pilar Misi Nagari
              </span>
              <span className="text-xs font-bold text-[#2E5A3E] dark:text-[#C5A85C]">
                Target &amp; Program Kerja
              </span>
            </div>

            <div className="space-y-3.5">
              {misiList.map((misi) => (
                <div
                  key={misi.num}
                  className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-emerald-500/30 dark:hover:border-emerald-500/20 transition-all duration-300 flex items-start gap-4 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2E5A3E] to-[#1C3A27] dark:from-[#2a5238] dark:to-[#172e20] text-white flex items-center justify-center text-xs font-extrabold shrink-0 shadow-md shadow-emerald-950/20 group-hover:scale-105 transition-transform">
                    {misi.num}
                  </div>

                  <div className="space-y-1 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-[#2E5A3E] dark:group-hover:text-[#C5A85C] transition-colors">
                        {misi.title}
                      </h4>
                      <span className="text-[10px] font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md shrink-0">
                        {misi.tag}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-350 leading-relaxed">
                      {misi.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. SEJARAH & ASAL-USUL NAGARI */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-bold text-nagari-green-600 dark:text-nagari-gold-400 uppercase tracking-widest">
            Warisan Luhur &amp; Falsafah Adat
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Sejarah Nagari Toboh Gadang
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            Asal-usul persukuan, kepemimpinan Urang Tuo nan Barampek, dan ikatan kultural nagari.
          </p>
        </div>

        {/* 1 Single Unified Container */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-[2rem] p-6 sm:p-10 lg:p-12 shadow-sm text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed space-y-6">
          <p>
            Ditinjau dari asal usul kedatangan penduduk Nagari Toboh Gadang, pertama dari <strong>duo lareh (sumpu dan malalo)</strong> yang terdiri dari <strong>suku koto, panyalai, jambak</strong>, sehingga sampai saat ini yang menjadi <strong>urang tuo nan barampek</strong> ialah mereka yang berasal dari suku yang tersebut diatas yaitu dua orang dari suku panyalai dan dua orang dari suku koto.
          </p>

          <p>
            Sehingga sampai saat ini Toboh Gadang disebut adalah kepunyaan urang tuo nan barampek. Secara Adat dan secara teoritis sampai saat ini jika mengadakan sesuatu acara dalam bidang adat kalau tanpa seizing urang tuo nan barampek maka acara tersebut dinyatakan tidak sah atau cacat secara hukum adat.
          </p>

          <p>
            Namun yang sangat perlu diadakan pengawasan terhadap <em>&ldquo;cupak di baok urang panggaleh&rdquo;</em> sehingga jangan sampai kewibawaan urang tuo nan barampek berangsur memudar oleh orang-orang yang ingin merubah jati diri kita di Toboh Gadang ini secara perlahan sehingga nantinya <em>&ldquo;barasak tunggua dari penabangan&rdquo;</em> dan generasi kedepan menjadi kehilangan sejarah.
          </p>

          <p>
            Kedatangan kedua disusul oleh <strong>urang ampek lareh yang terdiri dari lima suku</strong>, karena kehadirannya kedalam wilayah Toboh Gadang ini menyusul urang tuo nan barampek, maka dengan kearifan dan kebijakannya urang tuo nan barampek membagi kekuasaan dengan urang ampek lareh yang terdiri dari lima suku tersebut.
          </p>

          <p>
            Ditinjau dari segi tempat yang dilalui perjalanan urang tuo lareh mulai turun melalui koto buruak lubuak aluang baru ke toboh karena lokasi tersebut yang paling dekat dari malalo dan sumpu. Urang nan ampek lareh limo suku turun dari kayu anam, ke pakandangan, gadur dan pondok jambek baru ke toboh.
          </p>

          <p>
            Ditinjau dari segi pemerintahan, urang tuo nan barampek dari dua suku tadi memakai sistem rantau dengan hukum body chaniago, sistem yang paling demokratis sejak awal hingga kini / segala sesuatu keputusan diambil secara mufakat / <em>duduak samo randah, tagak samo tinggi</em>, daya serap aspirasi tinggi mambosek dari bumi / bottom up istilah inggris, kedudukan paling tinggi adalah alur dan patut = <em>&ldquo;kamanakan barajo kamamak, mamak barajo ka panghulu, panghulu barajo ka mufakat, mufakat barajo ka alur jo patuik&rdquo;</em>.
          </p>

          <div className="pt-2">
            <p className="font-semibold text-slate-900 dark:text-white mb-3">
              Disebut orang toboh anak ndak bagombak dek orang keliling toboh ialah :
            </p>
            <ul className="space-y-3.5 pl-2 sm:pl-4">
              <li className="flex items-start gap-2.5">
                <span className="text-[#2E5A3E] dark:text-[#C5A85C] font-bold shrink-0 mt-0.5">•</span>
                <p>
                  <strong>Berayah ka ulakan:</strong> dari segi manimba ilmu keagamaan kita orang toboh gadang berguru ke ulakan karena disana adanya Syekh Burhanuddin, sampai saat ini kita bisa temukan ketika bulan puasa kita melaksanakan menilik bulan, selalu kita mengambil pedoman dari ulakan, apabila orang ulakan menyatakan bulan sudah kelihatan selanjutnya tabuh akan dibunyikan, dan serta merta tabuh nagari toboh gadang akan ikut serta.
                </p>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#2E5A3E] dark:text-[#C5A85C] font-bold shrink-0 mt-0.5">•</span>
                <p>
                  <strong>Bermamak ke pakandangan:</strong> dari segi menimba ilmu adat kita orang toboh minta pembandingan / nasehat / berguru ke pakandangan.
                </p>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#2E5A3E] dark:text-[#C5A85C] font-bold shrink-0 mt-0.5">•</span>
                <p>
                  <strong>Beribu kelubuk alung:</strong> dari segi asal usul kita / urang tuo nan barampek turun melalui lubuak aluang.
                </p>
              </li>
            </ul>
          </div>

          <p>
            Implementasinya anak ndak bagombak barayah ka ulakan, bamamak ka pakandangan dan beribu ke lubuak aluang ialah apapun permintaan orang toboh kepada nagari tetangga yang tersebut tadi sampai saat ini disebut dengan istilah <strong>&ldquo;Indak Taapampan&rdquo;</strong> = tidak akan ditolak oleh tiga nagari tersebut sepanjang permintaan tersebut wajar. Namun karena Toboh Gadang tersebut anak ndak bagombak jadi tak ada yang bisa diminta oleh orang keliling tersebut ke Nagari Toboh Gadang baik berupa tanah ulayat, lautan luas, dan kekayaan alam lainnya karena yang akan diberikan tersebut juga tak dimiliki.
          </p>

          <p>
            Karena istilah yang tiga tadi maka secara keseharian Nagari Toboh Gadang mempunyai hubungan emosional yang sangat erat dengan ketiga nagari itu tadi apalagi dalam istilah <em>&ldquo;halam selalu singok bagisie&rdquo;</em> = tetangga dekat.
          </p>
        </div>
      </section>

      {/* 4. BATAS NAGARI */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-[2rem] p-6 sm:p-10 lg:p-12 shadow-sm space-y-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Batas Nagari:
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 text-slate-800 dark:text-slate-200">
            {/* Left Column: Utara & Selatan */}
            <div className="space-y-8">
              <div className="space-y-1.5">
                <h3 className="text-lg sm:text-xl font-bold text-slate-950 dark:text-white">
                  Utara
                </h3>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-350 leading-relaxed font-medium">
                  NAGARI PAKANDANGAN DAN KOTO TINGGI
                </p>
              </div>

              <div className="space-y-1.5">
                <h3 className="text-lg sm:text-xl font-bold text-slate-950 dark:text-white">
                  Selatan
                </h3>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-350 leading-relaxed font-medium">
                  NAGARI TOBOH GADANG BARAT DAN PADANG TOBOH ULAKAN
                </p>
              </div>
            </div>

            {/* Right Column: Timur & Barat */}
            <div className="space-y-8">
              <div className="space-y-1.5">
                <h3 className="text-lg sm:text-xl font-bold text-slate-950 dark:text-white">
                  Timur
                </h3>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-350 leading-relaxed font-medium">
                  NAGARI TOBOH GADANG TIMUR
                </p>
              </div>

              <div className="space-y-1.5">
                <h3 className="text-lg sm:text-xl font-bold text-slate-950 dark:text-white">
                  Barat
                </h3>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-350 leading-relaxed font-medium">
                  NAGARI PAUH KAMBAR
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. STRUKTUR ORGANISASI PERANGKAT NAGARI */}
      <section className="bg-slate-50/70 dark:bg-slate-900/30 py-20 border-t border-b border-slate-200/70 dark:border-slate-850">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-nagari-green-600 dark:text-nagari-gold-400 uppercase tracking-widest">
              Aparatur Pemerintahan
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Struktur Perangkat Nagari Toboh Gadang
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Bagan hierarki pemerintahan Nagari Toboh Gadang dari Wali Nagari, Sekretariat, Kepala Seksi &amp; Urusan, Staf, hingga Wali Korong.
            </p>
          </div>

          {/* Bagan Pohon Organisasi (Organogram) */}
          <div className="flex flex-col items-center space-y-6">
            {/* Level 1: Wali Nagari */}
            <div className="flex flex-col items-center">
              <div className="w-72 bg-gradient-to-br from-[#1C3A27] via-[#2E5A3E] to-[#122519] text-white rounded-3xl p-6 shadow-xl shadow-emerald-950/20 border-2 border-[#C5A85C] text-center hover:scale-105 transition-transform duration-300">
                <h3 className="text-xs font-bold text-emerald-200 uppercase tracking-wider">
                  Wali Nagari Toboh Gadang
                </h3>
                <div className="text-xl font-extrabold text-white mt-1.5 tracking-wide">
                  Nasri
                </div>
              </div>
              <div className="w-0.5 h-8 border-l-2 border-dashed border-emerald-600/40"></div>
            </div>

            {/* Level 2: Sekretaris Nagari */}
            <div className="flex flex-col items-center w-full">
              <div className="w-72 bg-gradient-to-br from-blue-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 shadow-lg border-2 border-sky-400/40 text-center hover:scale-105 transition-transform duration-300">
                <h3 className="text-xs font-bold text-sky-300 uppercase tracking-wider">
                  Sekretaris Nagari (Plt.)
                </h3>
                <div className="text-lg font-extrabold text-white mt-1.5 tracking-wide">
                  Yosmar Yazid, S.Pd
                </div>
              </div>
              <div className="w-0.5 h-8 border-l-2 border-dashed border-sky-500/40"></div>
            </div>

            {/* Level 3: Kaur, Kasi & Staf Grid */}
            <div className="w-full flex flex-col items-center space-y-6">
              {/* Horizontal line for desktop tree */}
              <div className="hidden xl:block w-[90%] h-0.5 border-t-2 border-dashed border-slate-300 dark:border-slate-700"></div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 w-full">
                {/* 3.1 Kaur Keuangan */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 shadow-sm hover:shadow-md hover:border-emerald-500/40 transition-all text-center space-y-2">
                  <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Kaur Keuangan
                  </div>
                  <div className="font-extrabold text-slate-900 dark:text-white text-xs sm:text-sm">
                    Ririn Agustina, S.E
                  </div>
                </div>

                {/* 3.2 Kaur Perencanaan */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 shadow-sm hover:shadow-md hover:border-amber-500/40 transition-all text-center space-y-2">
                  <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Umum &amp; Perencanaan
                  </div>
                  <div className="font-extrabold text-slate-900 dark:text-white text-xs sm:text-sm">
                    Yosmar Yazid, S.Pd
                  </div>
                </div>

                {/* 3.3 Kasi Pemerintahan */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 shadow-sm hover:shadow-md hover:border-purple-500/40 transition-all text-center space-y-2">
                  <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Pemerintahan
                  </div>
                  <div className="font-extrabold text-slate-900 dark:text-white text-xs sm:text-sm">
                    Erpit Melva, S.E
                  </div>
                </div>

                {/* 3.4 Kasi Kesra */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 shadow-sm hover:shadow-md hover:border-orange-500/40 transition-all text-center space-y-2">
                  <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Kesejahteraan
                  </div>
                  <div className="font-extrabold text-slate-900 dark:text-white text-xs sm:text-sm">
                    Anton Arifin
                  </div>
                </div>

                {/* 3.5 Kasi Pelayanan */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 shadow-sm hover:shadow-md hover:border-cyan-500/40 transition-all text-center space-y-2">
                  <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Pelayanan
                  </div>
                  <div className="font-extrabold text-slate-900 dark:text-white text-xs sm:text-sm">
                    Saiful Bahar, S.E
                  </div>
                </div>

                {/* 3.6 Staf List */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 shadow-sm hover:shadow-md hover:border-rose-500/40 transition-all text-center space-y-2">
                  <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Staf Nagari
                  </div>
                  <ul className="text-[11px] font-bold text-slate-700 dark:text-slate-350 space-y-1 text-left px-1">
                    <li>• Butung Gayo</li>
                    <li>• Aris Darusman, EKS</li>
                    <li>• Dessy Effendi Nursyamsi</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Level 4: Wali Korong Group */}
            <div className="w-full flex flex-col items-center pt-8 space-y-6">
              <div className="inline-flex items-center justify-center px-6 py-2.5 rounded-2xl bg-[#1C3A27] text-white text-xs font-extrabold uppercase tracking-widest shadow-md">
                <span>Wali Korong Nagari Toboh Gadang</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 w-full">
                {[
                  { no: "1", korong: "Toboh Apa", nama: "Efendi" },
                  { no: "2", korong: "Olo", nama: "Donal Hernalves" },
                  { no: "3", korong: "Lua Parik", nama: "Rovi Supriadi" },
                  { no: "4", korong: "Surau Kariang", nama: "Deni Darmawi" },
                  { no: "5", korong: "Kampuang Tangah", nama: "Robisal" },
                  { no: "6", korong: "Kandang Gadang", nama: "Arifin Qustino Bofi" },
                ].map((k) => (
                  <div
                    key={k.no}
                    className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 text-center space-y-1.5 shadow-sm hover:shadow-md hover:border-emerald-500/40 transition-all group"
                  >
                    <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase">
                      Korong {k.korong}
                    </div>
                    <div className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-[#C5A85C] transition-colors">
                      {k.nama}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
