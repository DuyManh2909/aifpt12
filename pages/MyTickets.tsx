import React, { useState } from "react";
import { MOCK_USER_TICKETS, MOCK_EVENTS } from "../constants";
import { UserTicket } from "../types";
import EventCard from "../components/EventCard";

interface MyTicketsProps {
  onSelectEvent: (id: string) => void;
}

const MyTickets: React.FC<MyTicketsProps> = ({ onSelectEvent }) => {
  const [filter, setFilter] = useState<"Upcoming" | "Past">("Upcoming");
  const [selectedTicket, setSelectedTicket] = useState<UserTicket | null>(null);

  const tickets = MOCK_USER_TICKETS.filter((t) =>
    filter === "Upcoming"
      ? t.status === "Upcoming" || t.status === "Pending"
      : t.status === "Attended",
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-16 animate-[fadeIn_0.5s_ease-out]">
      {/* Header Profile */}
      <section className="flex flex-col md:flex-row items-center gap-10 bg-gradient-to-br from-slate-900 to-slate-950 p-10 rounded-[3rem] border border-white/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative group">
          <div className="absolute inset-0 bg-purple-500 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity" />
          <img
            src="https://tse2.mm.bing.net/th/id/OIP.JHicrcPTxcYi-Uo-FkpPQQHaHa?rs=1&pid=ImgDetMain&o=7&rm=3://i.pravatar.cc/150?u=alex"
            alt="User"
            className="w-32 h-32 rounded-full border-4 border-slate-800 z-10 relative"
          />
        </div>

        <div className="flex-grow text-center md:text-left z-10">
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase mb-2 italic">
            Duy Manh
          </h1>
          <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-xs">
            abcxyz 299171199
          </p>
          <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-4">
            <div className="px-6 py-3 bg-white/5 rounded-2xl border border-white/10">
              <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">
                Upcoming
              </p>
              <p className="text-2xl font-black text-purple-400">2</p>
            </div>
            <div className="px-6 py-3 bg-white/5 rounded-2xl border border-white/10">
              <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">
                Total Spent
              </p>
              <p className="text-2xl font-black text-white">
                4.5M <span className="text-xs font-normal">VNĐ</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ticket Management */}
      <section>
        <div className="flex items-center justify-between mb-12">
          <div className="flex gap-4 p-1.5 bg-slate-900 rounded-2xl border border-white/5">
            <button
              onClick={() => setFilter("Upcoming")}
              className={`px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${filter === "Upcoming" ? "bg-purple-600 text-white shadow-lg shadow-purple-600/20" : "text-slate-500 hover:text-white"}`}
            >
              Vé sắp diễn ra
            </button>
            <button
              onClick={() => setFilter("Past")}
              className={`px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${filter === "Past" ? "bg-purple-600 text-white shadow-lg shadow-purple-600/20" : "text-slate-500 hover:text-white"}`}
            >
              Lịch sử vé
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tickets.map((ticket) => (
            <div
              key={ticket.ticketId}
              className="group bg-slate-900/50 rounded-3xl border border-white/5 overflow-hidden hover:border-purple-500/50 transition-all cursor-pointer relative"
              onClick={() => setSelectedTicket(ticket)}
            >
              <div className="h-40 overflow-hidden relative">
                <img
                  src={ticket.image}
                  alt={ticket.title}
                  className="w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent" />
                <div className="absolute top-4 right-4">
                  <span
                    className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                      ticket.status === "Upcoming"
                        ? "bg-emerald-500 text-white animate-pulse"
                        : ticket.status === "Pending"
                          ? "bg-amber-500 text-white"
                          : "bg-slate-700 text-slate-400"
                    }`}
                  >
                    {ticket.status}
                  </span>
                </div>
              </div>

              <div className="p-8 space-y-4">
                <p className="text-purple-400 text-[10px] font-black uppercase tracking-[0.2em]">
                  {ticket.artist}
                </p>
                <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors leading-none">
                  {ticket.title}
                </h3>

                <div className="space-y-2 text-xs text-slate-400 font-medium">
                  <div className="flex justify-between">
                    <span>📅 {ticket.date}</span>
                    <span className="text-slate-600">
                      ID: {ticket.ticketId}
                    </span>
                  </div>
                  <p>📍 {ticket.location}</p>
                </div>

                <div className="pt-6 flex justify-between items-center border-t border-white/5">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-500 uppercase font-black">
                      Chỗ ngồi
                    </span>
                    <span className="text-white font-bold">{ticket.seat}</span>
                  </div>
                  <button className="p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}

          {tickets.length === 0 && (
            <div className="col-span-full py-24 text-center bg-slate-900/30 rounded-[3rem] border border-dashed border-white/10">
              <p className="text-slate-500 text-lg italic">
                Bạn chưa có vé nào trong mục này.
              </p>
              <button
                onClick={() => onSelectEvent(MOCK_EVENTS[0].id)}
                className="mt-6 px-10 py-4 bg-purple-600 rounded-2xl text-white font-black uppercase text-xs tracking-widest hover:bg-purple-700 transition-all"
              >
                Khám phá show ngay
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Recommendations */}
      <section className="pt-12">
        <h2 className="text-3xl font-black text-white uppercase tracking-tighter mb-8 italic">
          Dành riêng cho bạn
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {MOCK_EVENTS.slice(0, 4).map((e) => (
            <EventCard key={e.id} event={e} onClick={onSelectEvent} />
          ))}
        </div>
      </section>

      {/* Ticket Modal (Detail view) */}
      {selectedTicket && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/90 backdrop-blur-xl animate-[fadeIn_0.3s_ease-out]">
          <div className="relative bg-slate-900 border border-white/10 rounded-[3rem] w-full max-w-md overflow-hidden shadow-2xl">
            <button
              onClick={() => setSelectedTicket(null)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-black/40 flex items-center justify-center text-white hover:bg-black transition-all z-10"
            >
              ✕
            </button>

            <div className="h-48 overflow-hidden">
              <img
                src={selectedTicket.image}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-10 space-y-8 text-center">
              <div>
                <h3 className="text-3xl font-black text-white uppercase tracking-tighter italic leading-none mb-4">
                  {selectedTicket.title}
                </h3>
                <p className="text-purple-400 font-bold uppercase tracking-widest text-xs">
                  {selectedTicket.artist} • {selectedTicket.date}
                </p>
              </div>

              <div className="bg-white p-6 rounded-[2rem] inline-block mx-auto shadow-[0_0_40px_rgba(255,255,255,0.1)]">
                <img
                  src={selectedTicket.qrCode}
                  alt="QR Code"
                  className="w-48 h-48 mx-auto"
                />
                <p className="text-black font-mono font-black text-sm mt-4 tracking-widest uppercase">
                  {selectedTicket.ticketId}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-left">
                <div className="p-4 bg-white/5 rounded-2xl">
                  <p className="text-[9px] text-slate-500 uppercase font-black mb-1">
                    Cửa / Lối vào
                  </p>
                  <p className="text-white font-bold">Gate B4</p>
                </div>
                <div className="p-4 bg-white/5 rounded-2xl">
                  <p className="text-[9px] text-slate-500 uppercase font-black mb-1">
                    Seat info
                  </p>
                  <p className="text-white font-bold">
                    {selectedTicket.seat.split(" - ").pop()}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <button className="flex-grow py-4 bg-purple-600 text-white font-black uppercase text-xs tracking-widest rounded-2xl hover:bg-purple-700 transition-all">
                  Tải vé PDF
                </button>
                <button className="flex-grow py-4 bg-white/10 text-white font-black uppercase text-xs tracking-widest rounded-2xl hover:bg-white/20 transition-all">
                  Chia sẻ
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default MyTickets;
