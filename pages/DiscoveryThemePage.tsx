
import React from 'react';
import { DiscoveryTheme, Event } from '../types';
import { MOCK_EVENTS } from '../constants';
import EventCard from '../components/EventCard';

interface DiscoveryThemePageProps {
  theme: DiscoveryTheme;
  onSelectEvent: (id: string) => void;
}

const DiscoveryThemePage: React.FC<DiscoveryThemePageProps> = ({ theme, onSelectEvent }) => {
  const filteredEvents = MOCK_EVENTS.filter(e => e.category === theme.category);

  return (
    <div className="pb-24 animate-[fadeIn_0.5s_ease-out]">
      {/* Navigation Breadcrumb */}
      <nav className="max-w-7xl mx-auto px-6 py-6 flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-500">
        <a href="#discovery" className="hover:text-white transition-colors">Discovery</a>
        <span>/</span>
        <span className={`${theme.colors.primary}`}>{theme.title}</span>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden mb-24">
        <div className="absolute inset-0">
          <img src={theme.image} alt={theme.title} className="w-full h-full object-cover grayscale-[30%]" />
          <div className="absolute inset-0 bg-slate-950/40" />
          <div className={`absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80`} />
        </div>
        
        <div className="relative z-10 text-center px-6">
           <p className={`font-black uppercase tracking-[0.4em] text-xs mb-6 ${theme.colors.primary} animate-pulse`}>
             {theme.subtitle}
           </p>
           <h1 className="text-6xl md:text-9xl font-black text-white tracking-tighter uppercase italic leading-none mb-8 drop-shadow-2xl">
             {theme.title}
           </h1>
           <p className="text-xl text-slate-300 max-w-xl mx-auto font-medium">
             {theme.description}
           </p>
        </div>
      </section>

      {/* Featured Events */}
      <section className="max-w-7xl mx-auto px-6 mb-32">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl font-black text-white uppercase tracking-tighter italic">Sự kiện nổi bật</h2>
            <div className={`w-12 h-1.5 bg-gradient-to-r ${theme.colors.gradient} rounded-full mt-2`} />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredEvents.map(event => (
            <EventCard key={event.id} event={event} onClick={onSelectEvent} />
          ))}
          {filteredEvents.length === 0 && (
            <div className="col-span-full py-20 text-center bg-white/5 rounded-3xl border border-dashed border-white/10">
              <p className="text-slate-500 italic">Đang cập nhật thêm sự kiện mới cho chủ đề này...</p>
            </div>
          )}
        </div>
      </section>

      {/* Playlist & Recommendations Grid */}
      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12 mb-32">
        {/* Playlist Component */}
        <div className="lg:col-span-2 bg-slate-900/50 rounded-[3rem] p-10 border border-white/5 flex flex-col md:flex-row gap-10 hover:border-purple-500/20 transition-all">
          <div className="w-full md:w-48 h-48 flex-shrink-0 relative group">
             <img src={theme.playlistImg} className="w-full h-full object-cover rounded-2xl shadow-2xl group-hover:scale-105 transition-transform" />
             <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 rounded-2xl">
               <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-black">▶</div>
             </div>
          </div>
          <div className="flex-grow">
            <h3 className={`text-2xl font-black uppercase italic mb-4 ${theme.colors.primary}`}>Playlist Gợi Ý</h3>
            <p className="text-slate-400 mb-8 leading-relaxed">
              Những bản nhạc được chọn lọc kỹ lưỡng bởi curator của BeatSync để đưa bạn vào đúng tâm trạng cho chuyến hành trình {theme.title.toLowerCase()}.
            </p>
            <div className="flex flex-wrap gap-4">
               {['Pop', 'Synth', 'Deep'].map(tag => (
                 <span key={tag} className="px-4 py-1.5 bg-white/5 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-500 border border-white/5">#{tag}</span>
               ))}
            </div>
          </div>
        </div>

        {/* Rapid Recommendations / Vibe check */}
        <div className={`p-10 bg-gradient-to-br ${theme.colors.gradient} rounded-[3rem] text-white`}>
           <h3 className="text-xl font-black uppercase italic mb-6">Phù hợp với:</h3>
           <div className="space-y-4">
              {theme.vibes.map(vibe => (
                <div key={vibe} className="flex items-center gap-4 p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 hover:bg-white/20 transition-all cursor-default">
                  <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  <span className="font-bold tracking-tight">{vibe}</span>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Inspiring Quote Section */}
      <section className="py-32 border-y border-white/5 bg-slate-900/20">
         <div className="max-w-4xl mx-auto px-6 text-center">
            <div className={`text-6xl mb-8 opacity-20 ${theme.colors.primary}`}>“</div>
            <h2 className="text-4xl md:text-6xl font-black text-white italic leading-tight mb-12">
               {theme.quote}
            </h2>
            <div className={`w-24 h-1 bg-gradient-to-r ${theme.colors.gradient} mx-auto`} />
         </div>
      </section>

      {/* Footer CTA */}
      <section className="max-w-4xl mx-auto px-6 py-32 text-center">
         <h3 className="text-4xl font-black text-white uppercase tracking-tighter italic mb-12">
           Khám phá show diễn <span className={`${theme.colors.primary}`}>Tiếp Theo</span>
         </h3>
         <button className={`px-16 py-6 bg-gradient-to-r ${theme.colors.gradient} rounded-2xl font-black uppercase tracking-widest text-sm text-white hover:scale-105 transition-all shadow-2xl`}>
           Săn vé ngay
         </button>
      </section>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default DiscoveryThemePage;
