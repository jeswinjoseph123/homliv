import { useState, useRef, useEffect } from 'react';
import {
  Search, Send, CheckCheck, Calendar as CalendarIcon, Phone, MoreVertical,
  Paperclip, BadgeCheck, X, ChevronLeft, ChevronRight, Flag,
} from 'lucide-react';
import { toast } from 'sonner';
import { mockConversations } from '@/data/mockProperties';
import { ReportModal } from './ReportModal';

type Message = { id: string; sender: string; text: string; time: string; read: boolean };
type Conversation = (typeof mockConversations)[0];

/* ─── helpers ─── */
function getInitials(name: string) {
  return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
}

const AVATAR_COLORS = [
  'linear-gradient(135deg, #d47550 0%, #b85530 100%)',
  'linear-gradient(135deg, #4f5d75 0%, #3d4d63 100%)',
  'linear-gradient(135deg, #2d3142 0%, #1e2235 100%)',
];

/* ─── April 2026 calendar ─── */
const WEEKDAYS = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'];
const APRIL_DAYS: (number | null)[] = [
  null, null,  1,  2,  3,  4,  5,
     6,  7,  8,  9, 10, 11, 12,
    13, 14, 15, 16, 17, 18, 19,
    20, 21, 22, 23, 24, 25, 26,
    27, 28, 29, 30, null, null, null,
];
const TIME_SLOTS = [
  '9:00am', '10:00am', '11:00am',
  '12:00pm',  '2:00pm',  '3:00pm',
   '4:00pm',  '5:00pm',  '6:00pm',
];
const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

/* ─── Inline viewing-request card ─── */
function ViewingRequestCard({ onAccept, onDecline }: { onAccept: () => void; onDecline: () => void }) {
  const [confirmed, setConfirmed] = useState(false);
  return (
    <div className="flex justify-center my-2">
      <div
        className="bg-white rounded-2xl overflow-hidden w-[300px]"
        style={{ border: '1px solid rgba(220,193,183,0.25)', boxShadow: '0 4px 24px rgba(23,27,43,0.10)' }}
      >
        <div className="p-4 flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-surface-low flex items-center justify-center shrink-0">
            <CalendarIcon size={18} className="text-coral" />
          </div>
          <div>
            <p className="font-semibold text-sm text-jet">Viewing request</p>
            <p className="text-sm text-slate-brand mt-0.5">Thursday 10 Apr at 2:00pm</p>
          </div>
        </div>
        {!confirmed ? (
          <div className="px-4 pb-4 flex gap-2">
            <button
              className="flex-1 py-2.5 rounded-xl text-white text-sm font-semibold bg-green-600 hover:bg-green-700 transition-colors"
              onClick={() => { setConfirmed(true); onAccept(); }}
            >
              Accept
            </button>
            <button
              className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-colors"
              style={{ border: '1px solid rgba(239,68,68,0.30)', color: '#ef4444' }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(239,68,68,0.05)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = '')}
              onClick={onDecline}
            >
              Decline
            </button>
          </div>
        ) : (
          <p className="text-center text-xs text-slate-brand/60 pb-4 italic">
            Viewing confirmed for 10 Apr at 2:00pm
          </p>
        )}
      </div>
    </div>
  );
}

/* ─── Suggest-a-viewing panel ─── */
function SuggestViewingPanel({ onSend, onClose }: { onSend: () => void; onClose: () => void }) {
  const [selectedDay, setSelectedDay] = useState<number | null>(10);
  const [selectedSlot, setSelectedSlot] = useState<string | null>('2:00pm');

  const dayOfWeek = selectedDay ? DAY_NAMES[new Date(2026, 3, selectedDay).getDay()] : '';
  const selectedLabel = selectedDay && selectedSlot ? `${dayOfWeek} ${selectedDay} Apr at ${selectedSlot}` : null;

  return (
    <div className="bg-white">
      <div className="flex items-center justify-between px-5 pt-4 pb-2">
        <p className="font-semibold text-sm text-jet">Suggest a viewing time</p>
        <button className="text-slate-brand hover:text-jet transition-colors" onClick={onClose}>
          <X size={16} />
        </button>
      </div>

      <div className="flex gap-6 px-5 pb-2">
        {/* Calendar */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <p className="font-semibold text-sm text-jet">April 2026</p>
            <div className="flex items-center gap-0.5">
              <button className="w-6 h-6 rounded flex items-center justify-center text-slate-brand hover:bg-surface-low transition-colors">
                <ChevronLeft size={14} />
              </button>
              <button className="w-6 h-6 rounded flex items-center justify-center text-slate-brand hover:bg-surface-low transition-colors">
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-px">
            {WEEKDAYS.map((d) => (
              <div key={d} className="text-center text-[0.58rem] font-bold uppercase tracking-[0.05em] text-slate-brand/60 py-1">
                {d}
              </div>
            ))}
            {APRIL_DAYS.map((day, i) => {
              const isPast = day !== null && day < 11;
              const isToday = day === 11;
              const isSelected = day !== null && day === selectedDay;
              return (
                <button
                  key={i}
                  disabled={!day || isPast}
                  className={`aspect-square rounded-md text-xs font-medium flex items-center justify-center transition-colors ${
                    !day ? 'invisible'
                    : isPast ? 'text-slate-brand/25 cursor-default'
                    : isSelected ? 'text-white font-semibold'
                    : isToday ? 'bg-surface-low text-jet font-bold ring-1 ring-coral/30'
                    : 'text-jet hover:bg-surface-low'
                  }`}
                  style={isSelected ? { background: 'linear-gradient(180deg, #d47550 0%, #b85530 100%)' } : {}}
                  onClick={() => day && !isPast && setSelectedDay(day)}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>

        {/* Time slots */}
        <div className="w-[196px] shrink-0">
          <p className="text-[0.58rem] font-bold uppercase tracking-[0.08em] text-slate-brand/60 mb-2">
            Available Slots
          </p>
          <div className="grid grid-cols-3 gap-1.5">
            {TIME_SLOTS.map((slot) => {
              const active = selectedSlot === slot;
              return (
                <button
                  key={slot}
                  className={`py-1.5 rounded-lg text-[0.68rem] font-semibold text-center transition-colors ${active ? 'text-white' : 'bg-surface-low text-slate-brand'}`}
                  style={active ? { background: 'linear-gradient(180deg, #d47550 0%, #b85530 100%)' } : undefined}
                  onClick={() => setSelectedSlot(slot)}
                >
                  {slot}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between px-5 py-3">
        <div>
          {selectedLabel ? (
            <>
              <p className="text-[0.58rem] font-bold uppercase tracking-[0.08em] text-coral">Selected Slot</p>
              <p className="text-sm font-semibold text-jet mt-0.5">{selectedLabel}</p>
            </>
          ) : (
            <p className="text-xs text-slate-brand/50">Pick a day and time</p>
          )}
        </div>
        <button
          disabled={!selectedDay || !selectedSlot}
          className="px-5 py-2.5 rounded-xl text-white text-sm font-semibold transition-opacity hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
          style={{ background: 'linear-gradient(180deg, #d47550 0%, #b85530 100%)' }}
          onClick={onSend}
        >
          Send suggestion
        </button>
      </div>
    </div>
  );
}

/* ─── Date separator ─── */
function DateSeparator({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 my-2">
      <div className="flex-1 h-px bg-ghost/25" />
      <span className="text-[0.6rem] font-bold uppercase tracking-[0.1em] text-slate-brand/50 shrink-0">{label}</span>
      <div className="flex-1 h-px bg-ghost/25" />
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   ChatInterface — embeddable, no outer layout
════════════════════════════════════════════════════════ */
export function ChatInterface({ perspective = 'tenant' }: { perspective?: 'tenant' | 'landlord' }) {
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [activeConv, setActiveConv] = useState<Conversation>(mockConversations[0]);
  const [inputText, setInputText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showViewingCard, setShowViewingCard] = useState(true);
  const [showSuggestPanel, setShowSuggestPanel] = useState(false);
  const [mobileShowList, setMobileShowList] = useState(true);
  const [showReport, setShowReport] = useState(false);
  const [reportListingId, setReportListingId] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeConv.messages, showViewingCard, showSuggestPanel]);

  const sendMessage = () => {
    if (!inputText.trim()) return;
    const newMsg: Message = {
      id: Date.now().toString(),
      sender: perspective,
      text: inputText.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: true,
    };
    const updated = conversations.map((c) => {
      if (c.id !== activeConv.id) return c;
      const u = { ...c, messages: [...c.messages, newMsg], lastMessage: newMsg.text, time: newMsg.time };
      setActiveConv(u);
      return u;
    });
    setConversations(updated);
    setInputText('');

    setTimeout(() => {
      const reply: Message = {
        id: (Date.now() + 1).toString(),
        sender: perspective === 'landlord' ? 'tenant' : 'landlord',
        text: perspective === 'landlord' ? 'Thanks, looking forward to it!' : 'Thanks for reaching out! Happy to help.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        read: false,
      };
      setConversations((prev) =>
        prev.map((c) => {
          if (c.id !== activeConv.id) return c;
          const u = { ...c, messages: [...c.messages, reply], lastMessage: reply.text, time: reply.time };
          setActiveConv(u);
          return u;
        })
      );
    }, 1500);
  };

  const filteredConvs = conversations.filter(
    (c) =>
      c.tenantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.property.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const yesterdayMsgs = activeConv.messages.slice(0, 2);
  const todayMsgs = activeConv.messages.slice(2);

  return (
    <div className="flex h-full w-full overflow-hidden">

      {/* ─── CONVERSATION LIST (white) ─── */}
      <aside
        className={`shrink-0 flex flex-col bg-white ${mobileShowList ? 'flex' : 'hidden'} md:flex`}
        style={{
          width: 272,
          borderRight: '1px solid rgba(220,193,183,0.20)',
          boxShadow: '4px 0 16px rgba(23,27,43,0.06)',
        }}
      >
        {/* Search */}
        <div className="px-4 pt-4 pb-3 shrink-0">
          <p className="font-bold text-sm text-jet mb-3">Messages</p>
          <div className="relative">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-brand/50" />
            <input
              className="w-full pl-8 pr-3 py-2 rounded-lg text-sm outline-none text-jet placeholder:text-slate-brand/50 bg-surface-low"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Conversations */}
        <div className="flex-1 overflow-y-auto">
          {filteredConvs.map((conv, idx) => {
            const isActive = conv.id === activeConv.id;
            return (
              <div
                key={conv.id}
                className="flex items-start gap-3 px-4 py-3.5 cursor-pointer transition-colors"
                style={{
                  background: isActive ? 'rgba(239,131,84,0.06)' : undefined,
                  borderLeft: isActive ? '2px solid #ef8354' : '2px solid transparent',
                }}
                onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.background = '#fafafa'; }}
                onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.background = ''; }}
                onClick={() => { setActiveConv(conv); setMobileShowList(false); }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                  style={{ background: AVATAR_COLORS[idx % AVATAR_COLORS.length] }}
                >
                  {getInitials(conv.tenantName)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <span className="font-semibold text-sm text-jet truncate">{conv.tenantName}</span>
                    <span className="text-[0.65rem] text-slate-brand/60 shrink-0">{conv.time}</span>
                  </div>
                  <p className="text-xs text-coral/80 truncate mt-0.5">{conv.property}</p>
                  <p className="text-xs text-slate-brand/60 truncate mt-0.5">{conv.lastMessage}</p>
                </div>
                {conv.unread > 0 && (
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[0.6rem] font-bold shrink-0 mt-0.5"
                    style={{ background: 'linear-gradient(180deg, #d47550 0%, #b85530 100%)' }}
                  >
                    {conv.unread}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </aside>

      {/* ─── CHAT AREA ─── */}
      <main className={`flex-1 flex flex-col min-w-0 relative ${!mobileShowList ? 'flex' : 'hidden'} md:flex`}>

        {/* Header */}
        <div
          className="flex items-center gap-3 px-5 py-3 shrink-0 bg-white"
          style={{ borderBottom: '1px solid rgba(220,193,183,0.15)', boxShadow: '0 2px 12px rgba(23,27,43,0.06)' }}
        >
          <button className="md:hidden mr-1 text-slate-brand" onClick={() => setMobileShowList(true)}>
            <ChevronLeft size={20} />
          </button>
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
            style={{ background: AVATAR_COLORS[conversations.findIndex((c) => c.id === activeConv.id) % AVATAR_COLORS.length] }}
          >
            {getInitials(activeConv.tenantName)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="font-semibold text-sm text-jet">{activeConv.tenantName}</p>
              <span className="flex items-center gap-1 text-[0.6rem] font-bold uppercase tracking-[0.05em] px-2 py-0.5 rounded-full bg-green-50 text-green-600">
                <BadgeCheck size={10} /> {perspective === 'landlord' ? 'Verified Tenant' : 'Verified Landlord'}
              </span>
            </div>
            <p className="text-xs text-slate-brand truncate">{activeConv.property}</p>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            {activeConv.senderRole === 'roommate' && (
              <button
                type="button"
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors hover:bg-red-50"
                style={{ color: '#b91c1c' }}
                onClick={() => { setReportListingId(activeConv.id); setShowReport(true); }}
              >
                <Flag size={12} />
                Report user
              </button>
            )}
            <button type="button" className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-brand hover:bg-surface-low transition-colors">
              <Phone size={15} />
            </button>
            <button type="button" className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-brand hover:bg-surface-low transition-colors">
              <MoreVertical size={15} />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-1.5 bg-surface">
          {yesterdayMsgs.length > 0 && (
            <>
              <DateSeparator label="Yesterday" />
              {yesterdayMsgs.map((msg) => {
                const isSelf = msg.sender === perspective;
                return (
                  <div key={msg.id} className={`flex ${isSelf ? 'justify-end' : 'justify-start'} mb-1`}>
                    <div
                      className={`max-w-[65%] px-4 py-2.5 text-sm ${
                        isSelf ? 'text-white rounded-[18px_18px_4px_18px]' : 'text-jet rounded-[18px_18px_18px_4px]'
                      }`}
                      style={
                        isSelf
                          ? { background: 'linear-gradient(180deg, #d47550 0%, #b85530 100%)', boxShadow: '0 2px 8px rgba(180,80,40,0.25)' }
                          : { background: '#fff', border: '1px solid rgba(220,193,183,0.25)', boxShadow: '0 1px 4px rgba(23,27,43,0.05)' }
                      }
                    >
                      <p className="leading-relaxed">{msg.text}</p>
                      <div className={`flex items-center gap-1 mt-1 ${isSelf ? 'justify-end' : 'justify-start'}`}>
                        <span className={`text-[10px] font-medium ${isSelf ? 'text-white/60' : 'text-slate-brand/60'}`}>{msg.time}</span>
                        {isSelf && <CheckCheck size={11} className="text-white/60" />}
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          )}

          {todayMsgs.length > 0 && (
            <>
              <DateSeparator label="Today" />
              {todayMsgs.map((msg) => {
                const isSelf = msg.sender === perspective;
                return (
                  <div key={msg.id} className={`flex ${isSelf ? 'justify-end' : 'justify-start'} mb-1`}>
                    <div
                      className={`max-w-[65%] px-4 py-2.5 text-sm ${
                        isSelf ? 'text-white rounded-[18px_18px_4px_18px]' : 'text-jet rounded-[18px_18px_18px_4px]'
                      }`}
                      style={
                        isSelf
                          ? { background: 'linear-gradient(180deg, #d47550 0%, #b85530 100%)', boxShadow: '0 2px 8px rgba(180,80,40,0.25)' }
                          : { background: '#fff', border: '1px solid rgba(220,193,183,0.25)', boxShadow: '0 1px 4px rgba(23,27,43,0.05)' }
                      }
                    >
                      <p className="leading-relaxed">{msg.text}</p>
                      <div className={`flex items-center gap-1 mt-1 ${isSelf ? 'justify-end' : 'justify-start'}`}>
                        <span className={`text-[10px] font-medium ${isSelf ? 'text-white/60' : 'text-slate-brand/60'}`}>{msg.time}</span>
                        {isSelf && <CheckCheck size={11} className="text-white/60" />}
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          )}

          {showViewingCard && (
            <ViewingRequestCard
              onAccept={() => toast.success('Viewing confirmed — Thursday 10 Apr at 2:00pm')}
              onDecline={() => setShowViewingCard(false)}
            />
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggest panel — floating card, bottom-right */}
        {showSuggestPanel && (
          <div className="absolute bottom-[68px] left-4 z-20 w-[520px] rounded-2xl overflow-hidden"
               style={{ boxShadow: '0 8px 40px rgba(23,27,43,0.18), 0 2px 8px rgba(23,27,43,0.10)', border: '1px solid rgba(220,193,183,0.20)' }}>
            <SuggestViewingPanel
              onClose={() => setShowSuggestPanel(false)}
              onSend={() => { setShowSuggestPanel(false); toast.success('Viewing suggestion sent!'); }}
            />
          </div>
        )}

        <ReportModal open={showReport} onClose={() => setShowReport(false)} listingId={reportListingId} />

        {/* Input bar */}
        <div
          className="shrink-0 bg-white px-4 py-3"
          style={{ borderTop: '1px solid rgba(220,193,183,0.15)', boxShadow: '0 -4px 16px rgba(23,27,43,0.05)' }}
        >
          <div className="flex items-center gap-2">
            <button
              className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${showSuggestPanel ? 'bg-coral/10 text-coral' : 'text-slate-brand hover:bg-surface-low'}`}
              onClick={() => setShowSuggestPanel(!showSuggestPanel)}
            >
              <CalendarIcon size={17} />
            </button>
            <button className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-slate-brand hover:bg-surface-low transition-colors">
              <Paperclip size={17} />
            </button>
            <input
              className="flex-1 px-4 py-2.5 rounded-xl text-sm outline-none text-jet placeholder:text-slate-brand/50 transition-colors bg-surface-low"
              style={{ border: '1px solid transparent' }}
              onFocus={(e) => (e.currentTarget.style.borderColor = '#ef8354')}
              onBlur={(e) => (e.currentTarget.style.borderColor = 'transparent')}
              placeholder={`Message ${activeConv.tenantName.split(' ')[0]}…`}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-opacity hover:opacity-90"
              style={{ background: 'linear-gradient(180deg, #d47550 0%, #b85530 100%)', boxShadow: '0 4px 12px rgba(180,80,40,0.30)' }}
              onClick={sendMessage}
            >
              <Send size={16} className="text-white" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
