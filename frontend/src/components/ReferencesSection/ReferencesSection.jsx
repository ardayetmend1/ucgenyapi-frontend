import { useState, useEffect, useCallback } from 'react';
import './ReferencesSection.css';
import { fetchReferences } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { Editable } from '../EditPopup/EditPopup';
import { updateReference, deleteReference, createReference } from '../../services/adminApi';
import ucgenLogoBg from '../../assets/images/ucgen-logo-bg.jpeg';
import kftLogo from '../../assets/images/kft-logo.jpg';
import vakifKatilimLogo from '../../assets/images/vakif-katilim-logo.jpg';

const fallbackReferences = [
  { id: 'f1', name: 'Vakıf Katılım', logo: vakifKatilimLogo },
  { id: 'f2', name: 'KFT', logo: kftLogo },
];

function useRevealRef() {
  const ref = useCallback((el) => {
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
  }, []);
  return ref;
}

const refFields = [
  { key: 'name', label: 'İsim', type: 'text' },
  { key: 'logo', label: 'Logo URL', type: 'text' },
  { key: 'order', label: 'Sıra', type: 'number' },
];

function ReferencesSection() {
  const [references, setReferences] = useState([]);
  const [addOpen, setAddOpen] = useState(false);
  const [addForm, setAddForm] = useState({ name: '', logo: '', order: 0 });
  const observe = useRevealRef();
  const { user } = useAuth();
  const isAdmin = user?.role === 'Admin';

  const loadRefs = () => {
    fetchReferences()
      .then((data) => {
        setReferences(data.length > 0 ? data : fallbackReferences);
      })
      .catch(() => {
        setReferences(fallbackReferences);
      });
  };

  useEffect(() => { loadRefs(); }, []);

  const handleUpdate = async (ref, form) => {
    await updateReference(ref.id, form);
    loadRefs();
  };

  const handleDelete = async (ref) => {
    if (!confirm('Bu referansı silmek istediğinize emin misiniz?')) return;
    await deleteReference(ref.id);
    loadRefs();
  };

  const handleAdd = async () => {
    const maxOrder = references.reduce((max, r) => Math.max(max, r.order || 0), 0);
    await createReference({ ...addForm, order: addForm.order || maxOrder + 1 });
    setAddForm({ name: '', logo: '', order: 0 });
    setAddOpen(false);
    loadRefs();
  };

  if (references.length === 0 && !isAdmin) return null;

  return (
    <section className="references" id="referanslar" style={{ position: "relative" }}>
      <div className="references__bg-logo">
        <img src={ucgenLogoBg} alt="" aria-hidden="true" />
      </div>
      <div className="references__glow" />

      <div className="references__header">
        <span className="references__label" ref={observe}>Referanslar</span>
        <h2 className="references__heading" ref={observe}>
          Güvenilir <em>İş Ortaklarımız</em>
        </h2>
        <span className="references__line" ref={observe} />
      </div>

      <div className="references__grid" ref={observe}>
        {references.map((ref) => (
          <Editable
            key={ref.id}
            isAdmin={isAdmin}
            fields={refFields}
            values={{ name: ref.name, logo: ref.logo, order: ref.order || 0 }}
            onSave={(form) => handleUpdate(ref, form)}
            onDelete={() => handleDelete(ref)}
          >
            <div className="references__item">
              <img className="references__logo" src={ref.logo} alt={ref.name} />
            </div>
          </Editable>
        ))}

        {isAdmin && (
          <div className="references__item references__item--add">
            {addOpen ? (
              <div className="inline-add-form">
                <input placeholder="İsim" value={addForm.name} onChange={(e) => setAddForm({...addForm, name: e.target.value})} />
                <input placeholder="Logo URL" value={addForm.logo} onChange={(e) => setAddForm({...addForm, logo: e.target.value})} />
                <input type="number" placeholder="Sıra" value={addForm.order} onChange={(e) => setAddForm({...addForm, order: parseInt(e.target.value) || 0})} />
                <div className="inline-add-form__actions">
                  <button className="inline-add-form__save" onClick={handleAdd}>Ekle</button>
                  <button className="inline-add-form__cancel" onClick={() => setAddOpen(false)}>X</button>
                </div>
              </div>
            ) : (
              <button className="references__add-btn" onClick={() => setAddOpen(true)} title="Yeni Referans Ekle">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default ReferencesSection;
