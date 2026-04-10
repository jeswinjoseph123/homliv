import { useState, useRef, useEffect } from 'react';
import { Search, Send, Plus, ChevronLeft, CheckCheck, Calendar as CalendarIcon } from 'lucide-react';
import { toast } from 'sonner';
import { Navbar } from '../components/layout/Navbar';
import { Calendar } from '../components/ui/calendar';
import { mockConversations } from '../../data/mockProperties';

type Message = { id: string; sender: string; text: string; time: string; read: boolean };
type Conversation = (typeof mockConversations)[0];

const TIME_SLOTS = ['9:00 AM', '11:00 AM', '2:00 PM', '4:00 PM'];

function ViewingRequestWidget({
  onConfirm,
  onDecline,
}: {
  onConfirm: () => void;
  onDecline: () => void;
}) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  return (
    <div className="my-3 mx-auto max-w-xs w-full bg-white rounded-2xl overflow-hidden shadow-[0_4px_40px_rgba(23,27,43,0.08)] border border-ghost/20">
      <div className="px-4 py-3 bg-coral flex items-center gap-2">
        <CalendarIcon size={14} className="text-white" />
        <span className="text-white font-semibold text-sm">Schedule a Viewing</span>
      </div>
      <div className="p-4">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          disabled={{ before: new Date() }}
          className="rounded-md"
        />
        <div className="mt-4">
          <p className="text-xs font-bold tracking-[0.05em] uppercase text-slate-brand mb-2">
            Select Time
          </p>
          <div className="grid grid-cols-2 gap-2">
            {TIME_SLOTS.map((slot) => (
              <button
                key={slot}
                className={`py-2 rounded-lg text-xs font-semibold transition-colors ${
                  selectedSlot === slot
                    ? 'bg-coral text-white'
                    : 'bg-surface-low text-jet hover:bg-surface-low/70'
                }`}
                onClick={() => setSelectedSlot(slot)}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <button
            className="flex-1 py-2.5 rounded-lg text-white text-sm font-semibold transition-opacity hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ background: 'linear-gradient(180deg, #d47550 0%, #b85530 100%)' }}
            disabled={!selectedDate || !selectedSlot}
            onClick={onConfirm}
          >
            Confirm Viewing
          </button>
          <button
            className="px-4 py-2.5 rounded-lg border border-ghost/20 text-jet text-sm font-medium hover:bg-surface-low transition-colors"
            onClick={onDecline}
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
}

export function ChatPage() {
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [activeConv, setActiveConv] = useState<Conversation>(mockConversations[0]);
  const [inputText, setInputText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileListVisible, setIsMobileListVisible] = useState(true);
  const [showViewingWidget, setShowViewingWidget] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeConv.messages, showViewingWidget]);

  const sendMessage = () => {
    if (!inputText.trim()) return;
    const newMsg: Message = {
      id: Date.now().toString(),
      sender: 'landlord',
      text: inputText.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: true,
    };

    const updatedConvs = conversations.map((c) => {
      if (c.id === activeConv.id) {
        const updated = {
          ...c,
          messages: [...c.messages, newMsg],
          lastMessage: newMsg.text,
          time: newMsg.time,
        };
        setActiveConv(updated);
        return updated;
      }
      return c;
    });
    setConversations(updatedConvs);
    setInputText('');

    setTimeout(() => {
      const reply: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'tenant',
        text: 'Thanks for getting back to me! That works great.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        read: false,
      };
      setConversations((prev) =>
        prev.map((c) => {
          if (c.id === activeConv.id) {
            const updated = {
              ...c,
              messages: [...c.messages, newMsg, reply],
              lastMessage: reply.text,
              time: reply.time,
            };
            setActiveConv(updated);
            return updated;
          }
          return c;
        })
      );
    }, 1500);
  };

  const filteredConvs = conversations.filter(
    (c) =>
      c.tenantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.property.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-screen flex flex-col" style={{ fontFamily: "'Inter', sans-serif" }}>
      <Navbar />
      <div className="flex-1 flex overflow-hidden bg-surface">
        {/* Conversation list */}
        <aside
          className={`shrink-0 flex flex-col border-r border-ghost/20 bg-white ${
            isMobileListVisible ? 'flex' : 'hidden'
          } md:flex`}
          style={{ width: 300 }}
        >
          <div className="p-4 border-b border-ghost/20">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-bold text-base text-jet">Messages</h2>
              <button className="w-8 h-8 rounded-lg flex items-center justify-center bg-surface-low hover:bg-surface-low/70 transition-colors">
                <Plus size={14} className="text-jet" />
              </button>
            </div>
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-brand" />
              <input
                className="w-full pl-8 pr-3 py-2 rounded-lg text-sm outline-none bg-surface-low text-jet placeholder:text-slate-brand/60"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {filteredConvs.map((conv) => (
              <div
                key={conv.id}
                className={`flex items-start gap-3 p-4 cursor-pointer transition-colors border-l-2 ${
                  conv.id === activeConv.id
                    ? 'bg-surface-low border-coral'
                    : 'border-transparent hover:bg-surface'
                }`}
                onClick={() => {
                  setActiveConv(conv);
                  setIsMobileListVisible(false);
                }}
              >
                <img
                  src={conv.tenantAvatar}
                  alt={conv.tenantName}
                  className="w-10 h-10 rounded-full object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm truncate text-jet">{conv.tenantName}</span>
                    <span className="text-xs shrink-0 ml-2 text-slate-brand">{conv.time}</span>
                  </div>
                  <p className="text-xs truncate mt-0.5 text-slate-brand">{conv.property}</p>
                  <p className="text-xs truncate mt-0.5 text-slate-brand">{conv.lastMessage}</p>
                </div>
                {conv.unread > 0 && (
                  <div className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 bg-coral">
                    {conv.unread}
                  </div>
                )}
              </div>
            ))}
          </div>
        </aside>

        {/* Chat area */}
        <main className={`flex-1 flex flex-col ${!isMobileListVisible ? 'flex' : 'hidden'} md:flex`}>
          {/* Header */}
          <div className="flex items-center gap-3 px-5 py-3.5 shrink-0 bg-white border-b border-ghost/20">
            <button className="md:hidden mr-1" onClick={() => setIsMobileListVisible(true)}>
              <ChevronLeft size={20} className="text-slate-brand" />
            </button>
            <img
              src={activeConv.tenantAvatar}
              alt={activeConv.tenantName}
              className="w-9 h-9 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold text-sm text-jet">{activeConv.tenantName}</p>
              <p className="text-xs text-slate-brand">{activeConv.property}</p>
            </div>
            <div className="ml-auto">
              <span className="text-xs font-bold tracking-[0.04em] uppercase px-2.5 py-1 rounded-full bg-surface-low text-slate-brand">
                Active Tenant
              </span>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-3">
            {activeConv.messages.map((msg) => {
              const isLandlord = msg.sender === 'landlord';
              return (
                <div key={msg.id} className={`flex ${isLandlord ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-xs px-4 py-2.5 text-sm shadow-[0_1px_4px_rgba(23,27,43,0.04)] ${
                      isLandlord
                        ? 'bg-coral text-white rounded-[16px_16px_4px_16px]'
                        : 'bg-white text-jet border border-ghost/25 rounded-[16px_16px_16px_4px]'
                    }`}
                  >
                    <p className="leading-relaxed">{msg.text}</p>
                    <div
                      className={`flex items-center gap-1 mt-1 ${
                        isLandlord ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <span className="text-[10px] font-medium opacity-70">{msg.time}</span>
                      {isLandlord && <CheckCheck size={12} className="opacity-70" />}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Viewing Request Widget — inline in message stream */}
            {showViewingWidget && (
              <ViewingRequestWidget
                onConfirm={() => {
                  setShowViewingWidget(false);
                  toast.success('Viewing confirmed — added to Google Calendar');
                }}
                onDecline={() => setShowViewingWidget(false)}
              />
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="px-5 py-4 shrink-0 bg-white border-t border-ghost/20">
            <div className="flex items-center gap-3">
              <input
                className="flex-1 px-4 py-3 rounded-xl text-sm outline-none bg-surface-low text-jet border border-transparent focus:border-coral transition-colors placeholder:text-slate-brand/60"
                placeholder="Type a message..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              />
              <button
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-opacity hover:opacity-90"
                style={{ background: 'linear-gradient(180deg, #d47550 0%, #b85530 100%)' }}
                onClick={sendMessage}
              >
                <Send size={16} className="text-white" />
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
