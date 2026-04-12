import { Instagram, MessageCircle, Music2 } from "lucide-react"; // Import ikon

export default function Location() {
  return (
    <section className="bg-black text-white py-20 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* INFO LOKASI */}
        <div className="space-y-10">
          <div>
            <h2 className="text-[10px] font-black tracking-[0.5em] text-[#BA9963] uppercase mb-4">
              Find Our Space
            </h2>
            <h3 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter leading-none">
              STREET <br /> HEADQUARTERS
            </h3>
          </div>

          <div className="space-y-6 font-jakarta">
            {/* ADDRESS & HOURS */}
            <div className="space-y-4">
              <p className="text-zinc-400 text-sm md:text-base leading-relaxed max-w-sm">
                Jl. Streetwear No. 123, <br />
                Denpasar, Bali - Indonesia
              </p>
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">
                  Opening Hours:
                </span>
                <p className="text-sm font-bold italic">10:00 AM — 09:00 PM</p>
              </div>
            </div>

            {/* SOCIAL MEDIA LINKS */}
            <div className="pt-4 flex flex-col gap-4">
              <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">
                Connect With Us:
              </span>
              <div className="flex gap-6">
                <a
                  href="#"
                  className="group flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
                >
                  <Instagram
                    size={18}
                    className="group-hover:text-[#BA9963] transition-colors"
                  />
                  <span className="text-[10px] font-black uppercase tracking-widest hidden md:block">
                    Instagram
                  </span>
                </a>
                <a
                  href="#"
                  className="group flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
                >
                  <MessageCircle
                    size={18}
                    className="group-hover:text-[#BA9963] transition-colors"
                  />
                  <span className="text-[10px] font-black uppercase tracking-widest hidden md:block">
                    WhatsApp
                  </span>
                </a>
                <a
                  href="#"
                  className="group flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
                >
                  <Music2
                    size={18}
                    className="group-hover:text-[#BA9963] transition-colors"
                  />
                  <span className="text-[10px] font-black uppercase tracking-widest hidden md:block">
                    TikTok
                  </span>
                </a>
              </div>
            </div>
          </div>

          <button className="border-b-2 border-[#BA9963] pb-2 text-[10px] font-black uppercase tracking-[0.3em] hover:text-[#BA9963] transition-all pt-4">
            Get Directions
          </button>
        </div>

        {/* VISUAL MAP/PHOTO */}
        <div className="relative group">
          <div className="absolute -inset-4 border border-zinc-800 rounded-[2rem] group-hover:border-[#BA9963]/30 transition-all duration-500" />
          <div className="relative h-[400px] md:h-[500px] bg-zinc-900 rounded-[2rem] overflow-hidden">
            <img
              src="/store/interior.jpg"
              className="w-full h-full object-cover opacity-70 group-hover:scale-110 transition-transform duration-1000"
              alt="NAVE Store Interior"
            />
            <div className="absolute bottom-8 left-8 bg-black/80 backdrop-blur-md p-4 rounded-xl border border-white/10">
              <p className="text-[10px] font-black tracking-widest uppercase italic">
                NAVE Flagship Store — BALI
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
