import { CheckCircle, Calendar, Shield, TrendingUp, Download } from 'lucide-react';
import { toast } from 'sonner';

export function PaymentsTab() {
  const payments = [
    { month: 'April 2024',    amount: 950, status: 'Pending', date: '1 Apr 2024',  method: 'Bank Transfer' },
    { month: 'March 2024',    amount: 950, status: 'Paid',    date: '1 Mar 2024',  method: 'Bank Transfer' },
    { month: 'February 2024', amount: 950, status: 'Paid',    date: '1 Feb 2024',  method: 'Bank Transfer' },
    { month: 'January 2024',  amount: 950, status: 'Paid',    date: '1 Jan 2024',  method: 'Bank Transfer' },
    { month: 'December 2023', amount: 950, status: 'Paid',    date: '1 Dec 2023',  method: 'Bank Transfer' },
  ] as const;

  return (
    <div className="p-4 sm:p-6 flex flex-col gap-5 max-w-[1100px] mx-auto w-full">

      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-bold tracking-[-0.02em] text-[1.6rem] text-jet">Payments & Billing</h1>
          <p className="text-sm text-slate-brand mt-0.5">Manage your rent payments and view transaction history.</p>
        </div>
        <button
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium text-jet transition-colors hover:bg-white shrink-0"
          style={{ border: '1px solid rgba(220,193,183,0.40)' }}
          onClick={() => toast.success('Downloading statement…')}
        >
          <Download size={14} className="text-slate-brand" />
          Download Statement
        </button>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">

        <div className="bg-white rounded-xl p-4 shadow-[0_4px_20px_rgba(23,27,43,0.09),_0_1px_4px_rgba(23,27,43,0.05)] flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-lg bg-surface-low flex items-center justify-center">
              <TrendingUp size={15} className="text-slate-brand" />
            </div>
            <span className="text-[0.7rem] font-bold uppercase tracking-[0.06em] text-slate-brand">This Year</span>
          </div>
          <div>
            <p className="font-bold text-2xl text-jet tracking-[-0.02em]">€11,400</p>
            <p className="text-sm text-slate-brand mt-0.5">Total paid in 2024</p>
          </div>
        </div>

        <div className="rounded-xl p-4 flex flex-col gap-3"
             style={{ background: 'linear-gradient(145deg, #d47550 0%, #b85530 100%)', boxShadow: '0 8px 32px rgba(180,80,40,0.30), 0 2px 8px rgba(180,80,40,0.15)' }}>
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
              <Calendar size={15} className="text-white" />
            </div>
            <span className="text-[0.7rem] font-bold uppercase tracking-[0.06em] text-white/70">Due Soon</span>
          </div>
          <div>
            <p className="font-bold text-2xl text-white tracking-[-0.02em]">1 May 2024</p>
            <p className="text-sm text-white/70 mt-0.5">Next rent due · 3 days away</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-[0_4px_20px_rgba(23,27,43,0.09),_0_1px_4px_rgba(23,27,43,0.05)] flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-lg bg-surface-low flex items-center justify-center">
              <Shield size={15} className="text-slate-brand" />
            </div>
            <span className="text-[0.7rem] font-bold uppercase tracking-[0.06em] text-slate-brand">Deposit</span>
          </div>
          <div>
            <p className="font-bold text-2xl text-jet tracking-[-0.02em]">€1,900</p>
            <p className="text-sm text-slate-brand mt-0.5">Held in RTB deposit scheme</p>
          </div>
        </div>

      </div>

      {/* Next payment hero */}
      <div className="rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center gap-5"
           style={{ background: 'linear-gradient(145deg, #2d3142 0%, #232637 100%)', boxShadow: '0 8px 32px rgba(23,27,43,0.40), 0 2px 8px rgba(23,27,43,0.15)' }}>
        <div className="flex-1">
          <p className="text-white/50 text-[0.65rem] font-bold uppercase tracking-[0.07em] mb-1">Next Payment Due</p>
          <p className="font-bold text-5xl text-white tracking-[-0.03em]">€950</p>
          <p className="text-white/60 text-sm mt-2">Due on <span className="text-white/90 font-semibold">1 May 2024</span> · Monthly Rent</p>
        </div>
        <div className="flex flex-col gap-2.5 shrink-0">
          <button
            className="px-6 py-3 rounded-xl text-white font-semibold text-sm transition-opacity hover:opacity-90"
            style={{ background: 'linear-gradient(180deg, #d47550 0%, #b85530 100%)' }}
            onClick={() => toast.success('Rent marked as paid.')}
          >
            Mark as Paid
          </button>
          <button
            className="px-6 py-2.5 rounded-xl text-sm font-medium text-white/70 hover:text-white transition-colors"
            style={{ background: 'rgba(255,255,255,0.08)' }}
            onClick={() => toast.success('Setting up direct debit…')}
          >
            Set Up Direct Debit
          </button>
        </div>
      </div>

      {/* Payment history */}
      <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(23,27,43,0.09),_0_1px_4px_rgba(23,27,43,0.05)] overflow-hidden">
        <div className="px-5 py-4 flex items-center justify-between" style={{ borderBottom: '1px solid rgba(220,193,183,0.18)' }}>
          <h3 className="font-bold text-sm text-jet">Payment History</h3>
          <span className="text-[0.65rem] font-bold uppercase tracking-[0.06em] text-slate-brand">12 transactions</span>
        </div>
        <div>
          {payments.map((payment, i) => (
            <div
              key={i}
              className="flex items-center gap-4 px-5 py-4 hover:bg-surface-low/50 transition-colors"
              style={{ borderBottom: i < payments.length - 1 ? '1px solid rgba(220,193,183,0.14)' : 'none' }}
            >
              <div className="w-10 h-10 rounded-xl bg-surface-low flex flex-col items-center justify-center shrink-0">
                <p className="text-[0.55rem] font-bold uppercase tracking-[0.04em] text-slate-brand leading-none">
                  {payment.month.split(' ')[0].slice(0, 3)}
                </p>
                <p className="text-xs font-bold text-jet leading-tight">
                  {payment.month.split(' ')[1].slice(2)}
                </p>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-jet">{payment.month}</p>
                <p className="text-xs text-slate-brand mt-0.5">{payment.date} · {payment.method}</p>
              </div>
              <p className="font-bold text-sm text-jet shrink-0">€{payment.amount.toLocaleString()}</p>
              <span className={`text-[0.65rem] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shrink-0 ${
                payment.status === 'Paid' ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'
              }`}>
                {payment.status === 'Paid' ? <CheckCircle size={9} /> : <Calendar size={9} />}
                {payment.status}
              </span>
              {payment.status === 'Paid' && (
                <button
                  className="w-7 h-7 rounded-lg bg-surface-low flex items-center justify-center shrink-0 hover:bg-surface transition-colors"
                  onClick={() => toast.success('Downloading receipt…')}
                >
                  <Download size={12} className="text-slate-brand" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
