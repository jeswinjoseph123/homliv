import { useState } from 'react';
import { Plus, MapPin, Bed, Bath, Maximize2, Eye, Pencil, X, Check } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { mockProperties } from '../../../data/mockProperties';
import type { Property } from '@/types';
import { toast } from 'sonner';

interface PropertiesTabProps {
  onListNew: () => void;
  isVerified: boolean;
}

type EditForm = { price: string; available: boolean };

export function PropertiesTab({ onListNew, isVerified }: PropertiesTabProps) {
  const navigate = useNavigate();
  const [properties, setProperties] = useState<Property[]>(() => mockProperties.slice(0, 3));
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<EditForm>({ price: '', available: true });

  function handleListNew() {
    if (!isVerified) navigate('/landlord/verify', { viewTransition: true });
    else onListNew();
  }

  function openEdit(prop: Property) {
    setEditingId(prop.id);
    setEditForm({ price: String(prop.price), available: prop.available });
  }

  function saveEdit(id: string) {
    setProperties((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, price: Number(editForm.price) || p.price, available: editForm.available }
          : p
      )
    );
    setEditingId(null);
    toast.success('Property updated.');
  }

  return (
    <div className="flex flex-col gap-5">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-bold tracking-[-0.02em] text-[1.4rem] text-jet">My Properties</h2>
          <p className="text-sm text-slate-brand mt-0.5">
            {properties.length} {properties.length === 1 ? 'property' : 'properties'} listed
          </p>
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-white text-sm font-semibold transition-opacity hover:opacity-90"
          style={{ background: 'linear-gradient(180deg, #d47550 0%, #b85530 100%)' }}
          onClick={handleListNew}
        >
          <Plus size={14} />
          List New Property
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {properties.map((prop) => (
          <div
            key={prop.id}
            className="bg-white rounded-2xl overflow-hidden group"
            style={{ boxShadow: '0 4px 20px rgba(23,27,43,0.09), 0 1px 4px rgba(23,27,43,0.05)' }}
          >
            {/* Image */}
            <div className="relative m-3 rounded-xl overflow-hidden h-48">
              <img
                src={prop.images[0]}
                alt={prop.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
                <span className="px-2 py-0.5 rounded text-[0.65rem] font-bold tracking-[0.05em] uppercase text-white bg-jet/80">
                  {prop.type}
                </span>
                {prop.isRPZ && (
                  <span className="px-2 py-0.5 rounded text-[0.6rem] font-bold tracking-widest uppercase text-white bg-coral">
                    RPZ
                  </span>
                )}
              </div>
              {!prop.available && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <span className="text-white font-bold text-xs tracking-wider uppercase bg-black/60 px-3 py-1 rounded">
                    Let Agreed
                  </span>
                </div>
              )}
            </div>

            {/* Body */}
            <div className="px-4 pb-4 pt-1">
              <h3 className="font-bold text-sm tracking-tight text-jet">{prop.title}</h3>
              <div className="flex items-center gap-1 mt-0.5 mb-3">
                <MapPin size={11} className="text-slate-brand shrink-0" />
                <span className="text-xs text-slate-brand truncate">{prop.location}</span>
              </div>
              <div className="flex items-center gap-3 mb-3 text-xs text-slate-brand">
                {prop.bedrooms > 0 && (
                  <span className="flex items-center gap-1"><Bed size={11} />{prop.bedrooms}</span>
                )}
                <span className="flex items-center gap-1"><Bath size={11} />{prop.bathrooms}</span>
                <span className="flex items-center gap-1"><Maximize2 size={11} />{prop.area}m²</span>
              </div>
              <div className="flex flex-wrap gap-1 mb-3">
                {prop.amenities.slice(0, 3).map((a) => (
                  <span key={a} className="text-[0.65rem] font-bold tracking-[0.04em] uppercase px-2 py-0.5 rounded-full bg-surface-low text-slate-brand">
                    {a}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between pt-2.5" style={{ borderTop: '1px solid rgba(220,193,183,0.2)' }}>
                <div>
                  <span className="text-lg font-bold text-coral">€{prop.price.toLocaleString()}</span>
                  <span className="text-xs text-slate-brand ml-1">/mo</span>
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    to={`/property/${prop.id}`}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-surface-low text-jet hover:bg-surface transition-colors"
                  >
                    <Eye size={11} /> View
                  </Link>
                  <button
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-white transition-opacity hover:opacity-90"
                    style={{ background: 'linear-gradient(180deg, #d47550 0%, #b85530 100%)' }}
                    onClick={() => editingId === prop.id ? setEditingId(null) : openEdit(prop)}
                  >
                    {editingId === prop.id ? <X size={11} /> : <Pencil size={11} />}
                    {editingId === prop.id ? 'Close' : 'Edit'}
                  </button>
                </div>
              </div>
            </div>

            {/* Inline edit panel */}
            {editingId === prop.id && (
              <div className="mx-4 mb-4 p-4 rounded-xl bg-surface-low flex flex-col gap-3">
                <p className="text-[0.65rem] font-bold uppercase tracking-[0.06em] text-slate-brand">Edit Listing</p>

                <div>
                  <label className="text-[0.65rem] font-bold uppercase tracking-[0.06em] text-slate-brand block mb-1.5">
                    Monthly Rent (€)
                  </label>
                  <input
                    type="number"
                    value={editForm.price}
                    onChange={(e) => setEditForm((f) => ({ ...f, price: e.target.value }))}
                    className="w-full bg-white rounded-lg px-3 py-2 text-sm text-jet outline-none transition-colors"
                    style={{ border: '1px solid rgba(220,193,183,0.40)' }}
                    onFocus={(e) => (e.target.style.borderColor = '#ef8354')}
                    onBlur={(e) => (e.target.style.borderColor = 'rgba(220,193,183,0.40)')}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-jet">Availability</p>
                    <p className="text-xs text-slate-brand mt-0.5">
                      {editForm.available ? 'Available to let' : 'Let agreed'}
                    </p>
                  </div>
                  <button
                    className="w-10 h-5 rounded-full flex items-center px-0.5 transition-colors shrink-0"
                    style={{ background: editForm.available ? 'linear-gradient(180deg, #d47550 0%, #b85530 100%)' : 'rgba(220,193,183,0.40)' }}
                    onClick={() => setEditForm((f) => ({ ...f, available: !f.available }))}
                  >
                    <div
                      className="w-4 h-4 rounded-full bg-white shadow-sm transition-transform"
                      style={{ transform: editForm.available ? 'translateX(20px)' : 'translateX(0)' }}
                    />
                  </button>
                </div>

                <div className="flex gap-2 pt-1">
                  <button
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-white text-sm font-semibold transition-opacity hover:opacity-90"
                    style={{ background: 'linear-gradient(180deg, #d47550 0%, #b85530 100%)' }}
                    onClick={() => saveEdit(prop.id)}
                  >
                    <Check size={13} /> Save changes
                  </button>
                  <button
                    className="flex-1 py-2.5 rounded-xl text-sm font-medium text-slate-brand hover:bg-surface transition-colors"
                    style={{ border: '1px solid rgba(220,193,183,0.40)' }}
                    onClick={() => setEditingId(null)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
