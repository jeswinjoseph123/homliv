import { MessageSquare } from 'lucide-react';
import { Link } from 'react-router';

export function MessagesTab() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <MessageSquare size={40} className="text-slate-brand" />
      <h3 className="font-bold text-lg mt-4 mb-2 text-jet">Go to Full Chat</h3>
      <p className="text-sm mb-6 text-slate-brand">Open the messaging centre to chat with your tenants.</p>
      <Link
        to="/chat/c1"
        className="px-6 py-3 rounded-xl text-white font-semibold text-sm transition-opacity hover:opacity-90"
        style={{ background: 'linear-gradient(180deg, #d47550 0%, #b85530 100%)' }}
      >
        Open Messages
      </Link>
    </div>
  );
}
