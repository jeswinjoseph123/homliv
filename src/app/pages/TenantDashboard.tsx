import { useState } from 'react';
import { Link } from 'react-router';
import {
  Home, MessageSquare, Wrench, CreditCard, AlertTriangle,
  CheckCircle, Plus, FileText, X, Calendar
} from 'lucide-react';
import { toast } from 'sonner';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { StatusBadge } from '../components/shared/StatusBadge';
import { mockMessages } from '../../data/mockProperties';

type Tab = 'overview' | 'property' | 'messages' | 'tickets' | 'payments';

const TABS: { id: Tab; icon: React.ReactNode; label: string }[] = [
  { id: 'overview', icon: <Home size={16} />, label: 'Overview' },
  { id: 'property', icon: <FileText size={16} />, label: 'My Property' },
  { id: 'messages', icon: <MessageSquare size={16} />, label: 'Messages' },
  { id: 'tickets', icon: <Wrench size={16} />, label: 'Tickets' },
  { id: 'payments', icon: <CreditCard size={16} />, label: 'Payments' },
];

const mockTickets = [
  { id: 'tk1', title: 'Heating not working', category: 'Heating', status: 'Open' as const, date: '25 Jan 2024', image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=200', response: null },
  { id: 'tk2', title: 'Leaking tap in bathroom', category: 'Plumbing', status: 'In Progress' as const, date: '22 Jan 2024', image: null, response: 'Engineer scheduled for Thursday 29 Jan.' },
  { id: 'tk3', title: 'Window latch broken', category: 'Other', status: 'Resolved' as const, date: '10 Jan 2024', image: null, response: 'Repaired on 14 Jan. Issue closed.' },
];

export function TenantDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [showRaiseTicket, setShowRaiseTicket] = useState(false);
  const [ticketForm, setTicketForm] = useState({ title: '', category: 'Heating', description: '' });

  return (
    <div className="bg-surface min-h-screen">
      <Navbar />

      {/* Tab nav */}
      <div className="sticky top-16 z-10 overflow-x-auto bg-white border-b border-ghost/20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex gap-1">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              className={`flex items-center gap-2 px-4 py-3.5 text-sm font-medium whitespace-nowrap transition-colors border-b-2 -mb-px ${
                activeTab === tab.id
                  ? 'text-jet border-coral'
                  : 'text-slate-brand border-transparent hover:text-jet'
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* ── OVERVIEW ── */}
        {activeTab === 'overview' && (
          <div className="flex flex-col gap-5">
            {/* Welcome card */}
            <div className="bg-white rounded-xl p-6 shadow-[0_2px_8px_rgba(23,27,43,0.04)]">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="font-bold text-xl mb-1 text-jet" style={{ letterSpacing: '-0.01em' }}>
                    Welcome back, Arun
                  </h2>
                  <p className="text-sm text-slate-brand">
                    📍 Double room in Ranelagh, Dublin 6
                  </p>
                  <div className="flex gap-4 mt-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.05em] font-bold text-slate-brand">Landlord</p>
                      <p className="text-sm font-medium text-jet">The Curator</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.05em] font-bold text-slate-brand">Lease Start</p>
                      <p className="text-sm font-medium text-jet">1 Feb 2024</p>
                    </div>
                  </div>
                </div>
                <img
                  src="https://images.unsplash.com/photo-1657639754502-3c138cb24b4c?w=120"
                  alt="Your room"
                  className="w-20 h-14 rounded-lg object-cover shrink-0"
                />
              </div>
            </div>

            {/* Rent reminder */}
            <div className="rounded-xl p-5 flex items-center justify-between gap-4 bg-coral">
              <div className="flex items-start gap-3">
                <AlertTriangle size={20} className="text-white shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white text-sm">Rent Due in 3 Days</p>
                  <p className="text-white/80 text-xs mt-0.5">€950 due on 1 Feb 2024</p>
                </div>
              </div>
              <button className="px-4 py-2 rounded-lg text-sm font-semibold bg-white/20 text-white shrink-0 hover:bg-white/30 transition-colors">
                Mark as Paid
              </button>
            </div>

            {/* Quick grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Recent messages */}
              <div className="bg-white rounded-xl p-5 shadow-[0_2px_8px_rgba(23,27,43,0.04)]">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-sm text-jet">Recent Messages</h3>
                  <Link to="/chat/c1" className="text-xs font-semibold text-coral">Open Chat →</Link>
                </div>
                {mockMessages.slice(-2).map((msg) => (
                  <div key={msg.id} className="py-2 border-b border-ghost/15">
                    <p className="text-xs font-medium capitalize mb-0.5 text-slate-brand">{msg.sender}</p>
                    <p className="text-sm text-jet">{msg.text}</p>
                  </div>
                ))}
              </div>

              {/* Open tickets */}
              <div className="bg-white rounded-xl p-5 shadow-[0_2px_8px_rgba(23,27,43,0.04)]">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-sm text-jet">Open Tickets</h3>
                  <button className="text-xs font-semibold text-coral" onClick={() => setActiveTab('tickets')}>
                    View All →
                  </button>
                </div>
                {mockTickets.filter((t) => t.status !== 'Resolved').map((ticket) => (
                  <div key={ticket.id} className="flex items-center justify-between py-2 border-b border-ghost/15">
                    <p className="text-sm text-jet">{ticket.title}</p>
                    <StatusBadge status={ticket.status} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── MY PROPERTY ── */}
        {activeTab === 'property' && (
          <div className="flex flex-col gap-5">
            <div className="bg-white rounded-xl p-6 shadow-[0_2px_8px_rgba(23,27,43,0.04)]">
              <h2 className="font-bold text-xl mb-4 text-jet">My Property</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5">
                {[
                  'https://images.unsplash.com/photo-1657639754502-3c138cb24b4c?w=400',
                  'https://images.unsplash.com/photo-1738748444676-113d30c9a25b?w=400',
                  'https://images.unsplash.com/photo-1758448756350-3d0eec02ba37?w=400',
                ].map((img, i) => (
                  <div key={i} className="aspect-video rounded-xl overflow-hidden">
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
                {[
                  { label: 'Lease Start', value: '1 Feb 2024' },
                  { label: 'Lease End', value: '31 Jan 2025' },
                  { label: 'Monthly Rent', value: '€950' },
                  { label: 'Notice Period', value: '28 days' },
                ].map((item) => (
                  <div key={item.label}>
                    <p className="text-xs font-bold uppercase tracking-[0.05em] mb-0.5 text-slate-brand">{item.label}</p>
                    <p className="text-sm font-semibold text-jet">{item.value}</p>
                  </div>
                ))}
              </div>
              <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border border-ghost/40 text-jet">
                <FileText size={14} />
                Download Lease Document
              </button>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-[0_2px_8px_rgba(23,27,43,0.04)]">
              <div className="flex items-center gap-2 mb-4">
                <Calendar size={16} className="text-coral" />
                <h3 className="font-bold text-base text-jet">Upcoming Viewings</h3>
              </div>
              <p className="text-sm text-slate-brand">No upcoming viewings scheduled.</p>
            </div>
          </div>
        )}

        {/* ── MESSAGES ── */}
        {activeTab === 'messages' && (
          <div className="bg-white rounded-xl p-6 flex flex-col items-center justify-center py-16 shadow-[0_2px_8px_rgba(23,27,43,0.04)]">
            <MessageSquare size={40} className="text-coral" />
            <h3 className="font-bold text-lg mt-4 mb-2 text-jet">Open Chat</h3>
            <p className="text-sm mb-6 text-slate-brand">Chat directly with your landlord.</p>
            <Link
              to="/chat/c1"
              className="px-6 py-3 rounded-xl text-white font-semibold text-sm transition-opacity hover:opacity-90"
              style={{ background: 'linear-gradient(180deg, #d47550 0%, #b85530 100%)' }}
            >
              Open Messages
            </Link>
          </div>
        )}

        {/* ── TICKETS ── */}
        {activeTab === 'tickets' && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-xl text-jet" style={{ letterSpacing: '-0.01em' }}>Maintenance Tickets</h2>
              <button
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-white text-sm font-semibold transition-opacity hover:opacity-90"
                style={{ background: 'linear-gradient(180deg, #d47550 0%, #b85530 100%)' }}
                onClick={() => setShowRaiseTicket(true)}
              >
                <Plus size={14} />
                Raise New Ticket
              </button>
            </div>
            {mockTickets.map((ticket) => (
              <div key={ticket.id} className="bg-white rounded-xl p-5 flex gap-4 shadow-[0_2px_8px_rgba(23,27,43,0.04)]">
                {ticket.image && (
                  <img src={ticket.image} alt="" className="w-16 h-12 rounded-lg object-cover shrink-0" />
                )}
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-semibold text-sm text-jet">{ticket.title}</p>
                    <StatusBadge status={ticket.status} />
                  </div>
                  <p className="text-xs mt-1 text-slate-brand">{ticket.category} · {ticket.date}</p>
                  {ticket.response && (
                    <p className="text-sm mt-2 p-2 rounded-lg bg-surface-low text-slate-brand">
                      💬 {ticket.response}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── PAYMENTS ── */}
        {activeTab === 'payments' && (
          <div className="flex flex-col gap-5">
            <div className="rounded-xl p-5 bg-coral">
              <p className="text-white text-xs font-bold uppercase tracking-[0.06em] mb-1">Next Payment</p>
              <p className="text-white font-bold text-3xl" style={{ letterSpacing: '-0.02em' }}>€950</p>
              <p className="text-white/80 text-sm mt-1">Due on 1 Feb 2024</p>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-[0_2px_8px_rgba(23,27,43,0.04)]">
              <h3 className="font-bold text-base mb-4 text-jet">Payment History</h3>
              {[
                { month: 'January 2024', amount: '€950', status: 'Paid', date: '1 Jan 2024' },
                { month: 'December 2023', amount: '€950', status: 'Paid', date: '1 Dec 2023' },
                { month: 'November 2023', amount: '€950', status: 'Paid', date: '1 Nov 2023' },
              ].map((payment, i) => (
                <div key={i} className="flex items-center justify-between py-3 border-b border-ghost/15">
                  <div>
                    <p className="text-sm font-medium text-jet">{payment.month}</p>
                    <p className="text-xs text-slate-brand">{payment.date}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-sm text-jet">{payment.amount}</span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-green-50 text-green-600">
                      <CheckCircle size={10} className="inline mr-1" />{payment.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Raise Ticket Modal */}
      {showRaiseTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-ink/40" onClick={() => setShowRaiseTicket(false)} />
          <div className="relative bg-white rounded-2xl p-6 w-full max-w-md shadow-[0_20px_60px_rgba(23,27,43,0.2)]">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-lg text-jet">Raise New Ticket</h3>
              <button onClick={() => setShowRaiseTicket(false)}>
                <X size={20} className="text-slate-brand" />
              </button>
            </div>
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-[0.06em] block mb-1.5 text-slate-brand">Title</label>
                <input
                  className="w-full px-4 py-2.5 rounded-lg text-sm text-jet outline-none border border-ghost/40 focus:border-coral transition-colors"
                  placeholder="Brief description of issue"
                  value={ticketForm.title}
                  onChange={(e) => setTicketForm({ ...ticketForm, title: e.target.value })}
                />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-[0.06em] block mb-1.5 text-slate-brand">Category</label>
                <select
                  className="w-full px-4 py-2.5 rounded-lg text-sm text-jet outline-none border border-ghost/40 focus:border-coral transition-colors"
                  value={ticketForm.category}
                  onChange={(e) => setTicketForm({ ...ticketForm, category: e.target.value })}
                >
                  {['Heating', 'Plumbing', 'Electricity', 'Other'].map((cat) => (
                    <option key={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-[0.06em] block mb-1.5 text-slate-brand">Description</label>
                <textarea
                  className="w-full px-4 py-2.5 rounded-lg text-sm text-jet outline-none border border-ghost/40 focus:border-coral transition-colors resize-none"
                  style={{ minHeight: 80 }}
                  placeholder="Please describe the issue in detail..."
                  value={ticketForm.description}
                  onChange={(e) => setTicketForm({ ...ticketForm, description: e.target.value })}
                />
              </div>
              <div className="rounded-lg flex flex-col items-center justify-center py-6 cursor-pointer border-2 border-dashed border-ghost/40 hover:border-coral/40 transition-colors">
                <p className="text-sm text-slate-brand">📎 Attach photo (optional)</p>
                <p className="text-xs mt-1 text-slate-brand">PNG, JPG up to 5MB</p>
              </div>
              <button
                className="w-full py-3 rounded-xl text-white font-semibold text-sm transition-opacity hover:opacity-90"
                style={{ background: 'linear-gradient(180deg, #d47550 0%, #b85530 100%)' }}
                onClick={() => {
                  setShowRaiseTicket(false);
                  setTicketForm({ title: '', category: 'Heating', description: '' });
                  toast.success('Ticket submitted — your landlord will respond shortly.');
                }}
              >
                Submit Ticket
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
