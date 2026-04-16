import { useState } from 'react';
import { X } from 'lucide-react';
import { toast } from 'sonner';
import { mockReports } from '@/data/mockProperties';

const REASONS = [
  'Scam or fraud',
  'Misleading listing',
  'Inappropriate content',
  'Other',
];

interface ReportModalProps {
  open: boolean;
  onClose: () => void;
  listingId: string;
}

export function ReportModal({ open, onClose, listingId }: ReportModalProps) {
  const [reason, setReason] = useState('');
  const [details, setDetails] = useState('');

  function handleSubmit() {
    mockReports.push({
      id: `rep-${Date.now()}`,
      listingId,
      reportedBy: 'tenant-mock',
      reason,
      ...(details.trim() ? { details: details.trim() } : {}),
      timestamp: new Date().toISOString(),
    });
    toast.success('Report submitted. Our team will review this listing.');
    setReason('');
    setDetails('');
    onClose();
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-ink/40" onClick={onClose} />
      <div className="relative bg-white rounded-2xl w-full max-w-md"
           style={{ boxShadow: '0 20px 60px rgba(23,27,43,0.2)' }}>
        <div className="flex items-center justify-between p-6 pb-4">
          <h3 className="font-bold text-base text-jet" style={{ letterSpacing: '-0.01em' }}>
            Report this listing
          </h3>
          <button type="button" onClick={onClose} className="p-1 hover:bg-surface-low rounded-lg transition-colors">
            <X size={18} className="text-slate-brand" />
          </button>
        </div>

        <div className="px-6 pb-6">
          <p className="text-xs text-slate-brand mb-4">
            Select a reason to help our team review this listing.
          </p>

          <div className="flex flex-col gap-2 mb-4">
            {REASONS.map((r) => (
              <label
                key={r}
                className="flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors hover:bg-surface-low"
                style={{ background: reason === r ? '#fef3e2' : undefined }}
              >
                <input
                  type="radio"
                  name="report-reason"
                  value={r}
                  checked={reason === r}
                  onChange={() => setReason(r)}
                  className="accent-coral"
                />
                <span className="text-sm font-medium text-jet">{r}</span>
              </label>
            ))}
          </div>

          <textarea
            rows={3}
            placeholder="Tell us more (optional)..."
            className="w-full bg-[#f0f1f3] rounded-xl px-4 py-3 text-sm text-jet outline-none focus:bg-[#e8e9ec] transition-colors placeholder:text-slate-brand/40 resize-none mb-5"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          />

          <div className="flex gap-3">
            <button
              type="button"
              className="flex-1 py-3 rounded-xl text-sm font-medium border border-ghost/40 text-slate-brand hover:bg-surface-low transition-colors"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className="flex-1 py-3 rounded-xl text-white font-semibold text-sm transition-opacity hover:opacity-90 disabled:opacity-40"
              style={{ background: 'linear-gradient(180deg, #d47550 0%, #b85530 100%)' }}
              disabled={!reason}
              onClick={handleSubmit}
            >
              Submit report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
