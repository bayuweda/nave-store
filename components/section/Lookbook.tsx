export default function Lookbook() {
  return (
    <section className="bg-black py-24 px-6 md:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-2">
            <h2 className="text-[10px] font-black tracking-[0.6em] text-[#BA9963] uppercase">
              Editorial / 2026
            </h2>
            <h3 className="text-4xl md:text-6xl font-black italic uppercase text-white tracking-tighter">
              THE <br /> SILENT <span className="text-zinc-800">STREET</span>
            </h3>
          </div>
          <p className="text-zinc-500 text-[10px] md:text-xs uppercase tracking-[0.3em] max-w-[200px] leading-relaxed italic">
            Capturing the raw essence of urban movement.
          </p>
        </div>

        {/* LOOKBOOK GRID */}
        <div className="grid grid-cols-12 gap-4 md:gap-6">
          {/* 1. MAIN FEATURE (Besar di kiri) */}
          <div className="col-span-12 md:col-span-7 group relative overflow-hidden bg-zinc-900 rounded-sm">
            <img
              src="/editorial/foto 11.jpg"
              alt="NAVE Lookbook"
              className="w-full h-[400px] md:h-[700px] object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 ease-out"
            />
            <div className="absolute bottom-6 left-6 text-white">
              <span className="text-[9px] font-bold tracking-[0.4em] uppercase py-1 px-2 bg-[#BA9963]">
                Featured
              </span>
            </div>
          </div>

          {/* 2. SIDE COLUMN (Dua foto vertikal) */}
          <div className="col-span-12 md:col-span-5 flex flex-col gap-4 md:gap-6">
            {/* Foto Atas */}
            <div className="relative h-[300px] md:h-[338px] overflow-hidden bg-zinc-900 rounded-sm group">
              <img
                src="/editorial/foto 12.jpg"
                alt="NAVE Lookbook"
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000"
              />
            </div>

            {/* Foto Bawah dengan Overlay Teks */}
            <div className="relative h-[300px] md:h-[338px] overflow-hidden bg-[#BA9963] rounded-sm group">
              <img
                src="/editorial/foto 13.jpg"
                alt="NAVE Lookbook"
                className="w-full h-full object-cover mix-blend-multiply opacity-70 group-hover:opacity-100 transition-all duration-700"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white text-4xl md:text-6xl font-black italic opacity-20 group-hover:opacity-40 transition-opacity">
                  MOVEMENT
                </span>
              </div>
            </div>
          </div>

          {/* 3. WIDE BOTTOM (Foto memanjang) */}
          <div className="col-span-12 mt-2 md:mt-0 relative h-[250px] md:h-[400px] overflow-hidden bg-zinc-900 rounded-sm group">
            <img
              src="/editorial/foto 14.jpg"
              alt="NAVE Lookbook"
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-[2000ms]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-8 right-8 text-right">
              <p className="text-white text-[10px] font-black tracking-[0.4em] uppercase mb-2">
                Winter Series
              </p>
              <div className="h-[2px] w-12 bg-[#BA9963] ml-auto" />
            </div>
          </div>
        </div>

        {/* CALL TO ACTION */}
        <div className="mt-12 flex justify-center">
          <button className="group flex items-center gap-4 text-white hover:text-[#BA9963] transition-colors">
            <span className="text-[10px] font-black uppercase tracking-[0.5em]">
              View Full Lookbook
            </span>
            <div className="w-12 h-[1px] bg-zinc-800 group-hover:w-20 group-hover:bg-[#BA9963] transition-all duration-500" />
          </button>
        </div>
      </div>
    </section>
  );
}
