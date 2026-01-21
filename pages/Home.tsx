
import React, { useState, useEffect } from 'react';
import EventCard from '../components/EventCard';
import { MOCK_EVENTS, MOCK_ARTISTS, MOCK_REVIEWS } from '../constants';

interface HomeProps {
  onSelectEvent: (id: string) => void;
  onSelectArtist: (id: string) => void;
}

const Home: React.FC<HomeProps> = ({ onSelectEvent, onSelectArtist }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [timeLeft, setTimeLeft] = useState({ h: 12, m: 45, s: 30 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { h, m, s } = prev;
        if (s > 0) s--;
        else {
          s = 59;
          if (m > 0) m--;
          else {
            m = 59;
            if (h > 0) h--;
          }
        }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const filteredEvents = activeCategory === 'All' 
    ? MOCK_EVENTS 
    : MOCK_EVENTS.filter(e => e.category === activeCategory);

  return (
    <div className="space-y-24 pb-20">
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=2070" 
            alt="Concert Hero" 
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-transparent to-slate-950/20" />
        </div>

        <div className="relative z-10 text-center max-w-4xl px-6">
          <p className="text-purple-400 font-bold tracking-[0.3em] uppercase mb-6 opacity-0 animate-[fadeIn_0.8s_ease-out_forwards]">Experience The Sound</p>
          <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter text-white mb-8 leading-[1] opacity-0 animate-[fadeIn_1s_ease-out_0.2s_forwards]">
            FEEL THE MUSIC.<br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400">LIVE THE MOMENT.</span>
          </h1>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 opacity-0 animate-[fadeIn_1s_ease-out_0.4s_forwards]">
            <button 
              onClick={() => onSelectEvent(MOCK_EVENTS[0].id)}
              className="px-10 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-bold text-lg text-white hover:scale-105 hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] transition-all flex items-center gap-2"
            >
              🎟️ Mua vé ngay
            </button>
            <button className="px-10 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full font-bold text-lg text-white hover:bg-white/20 transition-all">
              📅 Xem sự kiện
            </button>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50 text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4 uppercase">Sự kiện nổi bật</h2>
            <div className="w-20 h-1.5 bg-purple-600 rounded-full" />
          </div>
          
          <div className="flex flex-wrap gap-2">
            {['All', 'Pop', 'Indie', 'EDM', 'Rap'].map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-xs font-bold transition-all border ${
                  activeCategory === cat 
                  ? 'bg-purple-600 border-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.3)]' 
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-white">
          {filteredEvents.map(event => (
            <EventCard key={event.id} event={event} onClick={onSelectEvent} />
          ))}
        </div>
      </section>

      <section className="bg-slate-900/30 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4 uppercase">Nghệ sĩ tiêu biểu</h2>
            <p className="text-slate-400 max-w-xl mx-auto">Khám phá những cái tên đang làm mưa làm gió trong cộng đồng âm nhạc hiện nay.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-10">
            {MOCK_ARTISTS.map(artist => (
              <div 
                key={artist.id} 
                className="group flex flex-col items-center cursor-pointer"
                onClick={() => onSelectArtist(artist.id)}
              >
                <div className="relative w-full aspect-square mb-4">
                  <div className="absolute inset-0 bg-purple-500/20 group-hover:bg-purple-500/40 rounded-full blur-2xl transition-all duration-500 scale-75 group-hover:scale-100 opacity-0 group-hover:opacity-100" />
                  <img 
                    src={artist.image} 
                    alt={artist.name} 
                    className="w-full h-full object-cover rounded-full border-4 border-slate-800 group-hover:border-purple-500 transition-all duration-500 z-10 relative"
                  />
                </div>
                <h4 className="text-white font-bold text-center mb-1 group-hover:text-purple-400 transition-colors">{artist.name}</h4>
                <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">{artist.genre}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Home;
