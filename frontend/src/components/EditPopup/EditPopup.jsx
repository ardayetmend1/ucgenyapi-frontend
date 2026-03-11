import { useState, useEffect, useRef } from 'react';
import './EditPopup.css';

function EditPopup({ fields, values, onSave, onDelete, onClose }) {
  const [form, setForm] = useState(values || {});
  const [saving, setSaving] = useState(false);
  const ref = useRef();

  useEffect(() => {
    setForm(values || {});
  }, [values]);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    };
    setTimeout(() => document.addEventListener('mousedown', handler), 0);
    return () => document.removeEventListener('mousedown', handler);
  }, [onClose]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await onSave(form);
      onClose();
    } catch {
      setSaving(false);
    }
  };

  return (
    <div className="edit-popup" ref={ref}>
      {fields.map((f) => (
        <div key={f.key} className="edit-popup__field">
          <label>{f.label}</label>
          {f.type === 'textarea' ? (
            <textarea
              value={form[f.key] || ''}
              onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
              rows={3}
            />
          ) : f.type === 'number' ? (
            <input
              type="number"
              value={form[f.key] || 0}
              onChange={(e) => setForm({ ...form, [f.key]: parseInt(e.target.value) || 0 })}
            />
          ) : (
            <input
              type="text"
              value={form[f.key] || ''}
              onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
            />
          )}
        </div>
      ))}
      <div className="edit-popup__actions">
        <button className="edit-popup__btn edit-popup__btn--save" onClick={handleSave} disabled={saving}>
          {saving ? '...' : 'Kaydet'}
        </button>
        {onDelete && (
          <button className="edit-popup__btn edit-popup__btn--delete" onClick={onDelete}>Sil</button>
        )}
        <button className="edit-popup__btn edit-popup__btn--cancel" onClick={onClose}>X</button>
      </div>
    </div>
  );
}

// Wrapper: admin hover'da kalem ikonu, tıklayınca popup
function Editable({ children, fields, values, onSave, onDelete, isAdmin, style, className }) {
  const [open, setOpen] = useState(false);

  if (!isAdmin) return children;

  return (
    <div className={`editable-wrap ${className || ''}`} style={style}>
      {children}
      <button className="editable-icon" onClick={(e) => { e.stopPropagation(); setOpen(true); }} title="Düzenle">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
          <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
        </svg>
      </button>
      {open && (
        <EditPopup
          fields={fields}
          values={values}
          onSave={onSave}
          onDelete={onDelete}
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  );
}

export { EditPopup, Editable };
export default EditPopup;
