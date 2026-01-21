import React from "react";
import { Artist, Event } from "../types";
import { MOCK_EVENTS } from "../constants";
import EventCard from "../components/EventCard";

interface ArtistDetailProps {
  artist: Artist;
  onSelectEvent: (id: string) => void;
}

const ArtistDetail: React.FC<ArtistDetailProps> = ({
  artist,
  onSelectEvent,
}) => {
  const upcomingEvents = MOCK_EVENTS.filter((e) => e.artistId === artist.id);

  return (
    <div className="pb-24 text-white">
      {/* 1. Artist Hero Section */}
      <section className="relative h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={artist.image}
            alt={artist.name}
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-transparent to-transparent" />
          <div
            className={`absolute inset-0 bg-gradient-to-br ${artist.accentColor} mix-blend-overlay opacity-30`}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-3xl">
            <span
              className={`inline-block px-4 py-1.5 bg-gradient-to-r ${artist.accentColor} rounded-full text-[10px] font-black uppercase tracking-widest mb-6`}
            >
              {artist.genre}
            </span>
            <h1 className="text-7xl md:text-9xl font-black tracking-tighter uppercase italic leading-none mb-8 animate-[slideIn_0.8s_ease-out]">
              {artist.name}
            </h1>
            <p className="text-2xl md:text-3xl font-light italic text-slate-200 mb-10 max-w-2xl border-l-4 border-white/20 pl-6">
              "{artist.quote}"
            </p>
            <div className="flex gap-4">
              <button
                onClick={() =>
                  document
                    .getElementById("upcoming-shows")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className={`px-10 py-4 bg-gradient-to-r ${artist.accentColor} rounded-full font-black text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-xl`}
              >
                🎟 Xem Show Sắp Tới
              </button>
              <button className="px-10 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full font-black text-sm uppercase tracking-widest hover:bg-white/20 transition-all">
                ▶ Nghe Nhạc
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Bio & About */}
      <section className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2">
          <h2 className="text-3xl font-black mb-8 uppercase tracking-tighter flex items-center gap-4">
            CÂU CHUYỆN CỦA NGHỆ SĨ
            <div
              className={`h-1.5 w-12 bg-gradient-to-r ${artist.accentColor} rounded-full`}
            />
          </h2>
          <div className="text-xl text-slate-400 leading-relaxed space-y-6">
            <p>{artist.bio}</p>
          </div>

          <div className="mt-12 flex flex-wrap gap-4">
            {artist.socials.map((social) => (
              <a
                key={social.platform}
                href={social.url}
                className="px-6 py-3 bg-slate-900 border border-white/5 rounded-2xl text-xs font-bold uppercase tracking-widest hover:border-purple-500 hover:text-purple-400 transition-all"
              >
                {social.platform}
              </a>
            ))}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div
            className={`p-8 bg-gradient-to-br ${artist.accentColor} rounded-[2.5rem] relative overflow-hidden group`}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-[60px] rounded-full" />
            <h3 className="text-xl font-black mb-4 uppercase italic">
              Top Tracks
            </h3>
            <ul className="space-y-4">
              {["Midnight Sun", "Eclipse Pulse", "Neon Dreams"].map(
                (track, i) => (
                  <li
                    key={track}
                    className="flex items-center justify-between p-3 bg-black/20 rounded-xl hover:bg-black/40 transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-bold opacity-50">
                        0{i + 1}
                      </span>
                      <span className="font-bold">{track}</span>
                    </div>
                    <span className="text-xs opacity-50">3:45</span>
                  </li>
                ),
              )}
            </ul>
            <button className="w-full mt-6 py-3 bg-white text-black font-black uppercase text-[10px] tracking-widest rounded-xl">
              View All on Spotify
            </button>
          </div>
        </div>
      </section>

      {/* 3. Upcoming Shows Grid */}
      <section id="upcoming-shows" className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-4xl font-black uppercase tracking-tighter italic">
              Lịch Biểu Diễn Sắp Tới
            </h2>
            <p className="text-slate-500 mt-2">
              Đừng bỏ lỡ khoảnh khắc cháy hết mình cùng {artist.name}.
            </p>
          </div>
        </div>

        {upcomingEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} onClick={onSelectEvent} />
            ))}
          </div>
        ) : (
          <div className="bg-slate-900/50 p-16 rounded-[2rem] text-center border border-dashed border-white/10">
            <p className="text-slate-500 italic">
              Hiện tại chưa có show diễn nào sắp tới. Hãy theo dõi để nhận thông
              báo mới nhất!
            </p>
          </div>
        )}
      </section>

      {/* 4. Gallery Section */}
      <section className="bg-slate-900/30 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-black uppercase tracking-tighter italic mb-12 text-center">
            Moments On Stage
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {artist.gallery.map((img, i) => (
              <div
                key={i}
                className="group relative aspect-[4/5] rounded-[2rem] overflow-hidden cursor-pointer"
              >
                <img
                  src={img}
                  alt={`${artist.name} Gallery ${i}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Final CTA */}
      <section className="max-w-4xl mx-auto px-6 py-24 text-center">
        <h3 className="text-4xl md:text-6xl font-black italic uppercase leading-none mb-12">
          Bạn đã sẵn sàng cho một đêm{" "}
          <span className="text-purple-500">Bùng Nổ</span>?
        </h3>
        <button
          onClick={() => {
            if (upcomingEvents.length > 0) onSelectEvent(upcomingEvents[0].id);
          }}
          className={`px-16 py-6 bg-gradient-to-r ${artist.accentColor} rounded-2xl font-black uppercase tracking-widest text-lg hover:scale-105 transition-all shadow-2xl`}
        >
          Đặt Vé Ngay Hôm Nay
        </button>
      </section>

      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};

export default ArtistDetail;
