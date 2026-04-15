import { Plus, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router';
import { StatusBadge } from '../shared/StatusBadge';
import { mockProperties } from '../../../data/mockProperties';

interface PropertiesTabProps {
  onListNew: () => void;
  isVerified: boolean;
}

const landlordProps = mockProperties.slice(0, 3);

export function PropertiesTab({ onListNew, isVerified }: PropertiesTabProps) {
  const navigate = useNavigate();

  function handleListNew() {
    if (!isVerified) {
      navigate('/landlord/verify');
    } else {
      onListNew();
    }
  }

  return (
    <>
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-bold text-xl text-jet" style={{ letterSpacing: '-0.01em' }}>My Properties</h2>
        <button
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-white text-sm font-semibold transition-opacity hover:opacity-90"
          style={{ background: 'linear-gradient(180deg, #d47550 0%, #b85530 100%)' }}
          onClick={handleListNew}
        >
          <Plus size={14} />
          List New Property
        </button>
      </div>
      <div className="flex flex-col gap-3">
        {landlordProps.map((prop) => (
          <div key={prop.id} className="bg-white rounded-xl p-4 flex items-center gap-4 shadow-[0_4px_20px_rgba(23,27,43,0.09),_0_1px_4px_rgba(23,27,43,0.05)]">
            <img src={prop.images[0]} alt={prop.title} className="w-16 h-12 rounded-lg object-cover shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm truncate text-jet">{prop.title}</p>
              <p className="text-xs truncate text-slate-brand">{prop.location}</p>
            </div>
            <div className="text-right shrink-0">
              <p className="font-bold text-sm text-coral">€{prop.price}/mo</p>
              <StatusBadge status={prop.available ? 'Active' : 'Resolved'} />
            </div>
            <button className="text-xs font-semibold shrink-0 ml-2 flex items-center gap-1 text-coral">
              Edit <ChevronRight size={12} />
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
