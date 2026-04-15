import { X, Plus } from 'lucide-react';
import { toast } from 'sonner';
import { type TicketForm, CATEGORY_STYLE, PRIORITY_STYLE } from './types';

interface RaiseTicketModalProps {
  open: boolean;
  onClose: () => void;
  form: TicketForm;
  onFormChange: (form: TicketForm) => void;
}

export function RaiseTicketModal({ open, onClose, form, onFormChange }: RaiseTicketModalProps) {
  if (!open) return null;

  const handleSubmit = () => {
    onClose();
    onFormChange({ title: '', category: 'Heating', description: '', priority: 'Medium' });
    toast.success('Ticket submitted — your landlord will respond shortly.');
  };

  const handleDiscard = () => {
    onClose();
    onFormChange({ title: '', category: 'Heating', description: '', priority: 'Medium' });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-ink/40" onClick={handleDiscard} />
      <div className="relative bg-white rounded-2xl w-full max-w-md shadow-[0_20px_60px_rgba(23,27,43,0.22)] overflow-hidden"
           style={{ border: '1px solid rgba(220,193,183,0.18)' }}>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: '1px solid rgba(220,193,183,0.20)' }}>
          <h3 className="font-bold text-base text-jet">Raise Maintenance Request</h3>
          <button onClick={handleDiscard} className="text-slate-brand hover:text-jet transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 flex flex-col gap-4 max-h-[70vh] overflow-y-auto">

          {/* Title */}
          <div>
            <label className="text-[0.65rem] font-bold uppercase tracking-[0.06em] block mb-1.5 text-slate-brand">Issue Title</label>
            <input
              className="w-full px-4 py-2.5 rounded-lg text-sm text-jet outline-none transition-colors bg-surface-low"
              style={{ border: '1px solid rgba(220,193,183,0.40)' }}
              placeholder="e.g. Heating not working"
              value={form.title}
              onChange={(e) => onFormChange({ ...form, title: e.target.value })}
              onFocus={(e) => (e.target.style.borderColor = '#ef8354')}
              onBlur={(e) => (e.target.style.borderColor = 'rgba(220,193,183,0.40)')}
            />
          </div>

          {/* Category */}
          <div>
            <label className="text-[0.65rem] font-bold uppercase tracking-[0.06em] block mb-1.5 text-slate-brand">Category</label>
            <div className="flex gap-2 flex-wrap">
              {(['Heating', 'Plumbing', 'Electricity', 'Other'] as const).map((cat) => (
                <button
                  key={cat}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${
                    form.category === cat
                      ? (CATEGORY_STYLE[cat] ?? 'bg-surface-low text-slate-brand') + ' ring-2 ring-offset-1 ring-current'
                      : 'bg-surface-low text-slate-brand hover:bg-surface'
                  }`}
                  onClick={() => onFormChange({ ...form, category: cat })}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Priority */}
          <div>
            <label className="text-[0.65rem] font-bold uppercase tracking-[0.06em] block mb-1.5 text-slate-brand">Priority</label>
            <div className="flex gap-2">
              {(['High', 'Medium', 'Low'] as const).map((p) => (
                <button
                  key={p}
                  className={`flex-1 py-2 rounded-lg text-xs font-bold uppercase tracking-[0.04em] transition-colors ${
                    form.priority === p
                      ? PRIORITY_STYLE[p]
                      : 'bg-surface-low text-slate-brand hover:bg-surface'
                  }`}
                  onClick={() => onFormChange({ ...form, priority: p })}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-[0.65rem] font-bold uppercase tracking-[0.06em] text-slate-brand">Description</label>
              <span className="text-[0.65rem] text-slate-brand/60">{form.description.length}/500</span>
            </div>
            <textarea
              className="w-full px-4 py-2.5 rounded-lg text-sm text-jet outline-none transition-colors resize-none bg-surface-low"
              style={{ border: '1px solid rgba(220,193,183,0.40)', minHeight: 90 }}
              placeholder="Describe the issue in detail — when it started, what you've noticed…"
              maxLength={500}
              value={form.description}
              onChange={(e) => onFormChange({ ...form, description: e.target.value })}
              onFocus={(e) => (e.target.style.borderColor = '#ef8354')}
              onBlur={(e) => (e.target.style.borderColor = 'rgba(220,193,183,0.40)')}
            />
          </div>

          {/* Photo upload */}
          <div
            className="rounded-xl flex flex-col items-center justify-center gap-1.5 py-6 cursor-pointer transition-colors hover:bg-surface"
            style={{ border: '2px dashed rgba(220,193,183,0.40)' }}
          >
            <div className="w-10 h-10 rounded-full bg-surface-low flex items-center justify-center mb-0.5">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-slate-brand">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                <circle cx="12" cy="13" r="4" />
              </svg>
            </div>
            <p className="text-sm font-medium text-slate-brand">Attach a photo</p>
            <p className="text-xs text-slate-brand/60">PNG or JPG up to 5 MB · optional</p>
          </div>

        </div>

        {/* Footer */}
        <div className="flex items-center gap-3 px-6 py-4" style={{ borderTop: '1px solid rgba(220,193,183,0.20)' }}>
          <button
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-jet bg-surface-low hover:bg-surface transition-colors"
            onClick={handleDiscard}
          >
            Discard
          </button>
          <button
            className="flex-1 py-2.5 rounded-xl text-white text-sm font-semibold transition-opacity hover:opacity-90 flex items-center justify-center gap-1.5"
            style={{ background: 'linear-gradient(180deg, #d47550 0%, #b85530 100%)' }}
            onClick={handleSubmit}
          >
            <Plus size={13} /> Submit Request
          </button>
        </div>

      </div>
    </div>
  );
}
