import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, useSearchParams } from 'react-router-dom';
import * as admin from '../../services/adminApi';
import ImageUpload from '../../components/ImageUpload/ImageUpload';
import './AdminPanel.css';

const SECTIONS = [
  { key: 'siteContent', label: 'Site İçerikleri' },
  { key: 'heroSlides', label: 'Hero Slaytları' },
  { key: 'aboutImages', label: 'Hakkımızda Görselleri' },
  { key: 'references', label: 'Referanslar' },
  { key: 'archGallery', label: 'Mimarlık Galeri' },
  { key: 'archServices', label: 'Mimarlık Hizmetleri' },
  { key: 'projects', label: 'Projeler' },
  { key: 'messages', label: 'Mesajlar' },
];

function AdminPanel() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialSection = searchParams.get("section") || "siteContent";
  const [activeSection, setActiveSection] = useState(initialSection);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [editItem, setEditItem] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (!authLoading && (!user || user.role !== 'Admin')) {
      navigate('/');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    loadData();
  }, [activeSection]);

  const loadData = async () => {
    setLoading(true);
    setError('');
    setEditItem(null);
    setFormData({});
    try {
      let result;
      switch (activeSection) {
        case 'siteContent': result = await admin.getSiteContent(); break;
        case 'heroSlides': result = await admin.getHeroSlides(); break;
        case 'aboutImages': result = await admin.getAboutImages(); break;
        case 'references': result = await admin.getReferences(); break;
        case 'archGallery': result = await admin.getArchGallery(); break;
        case 'archServices': result = await admin.getArchServices(); break;
        case 'projects': result = await admin.getProjects(); break;
        case 'messages': result = await admin.getContactMessages(); break;
      }
      setData(result || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Silmek istediğinize emin misiniz?')) return;
    try {
      switch (activeSection) {
        case 'heroSlides': await admin.deleteHeroSlide(id); break;
        case 'aboutImages': await admin.deleteAboutImage(id); break;
        case 'references': await admin.deleteReference(id); break;
        case 'archGallery': await admin.deleteArchGallery(id); break;
        case 'archServices': await admin.deleteArchService(id); break;
        case 'projects': await admin.deleteProject(id); break;
        case 'messages': await admin.deleteMessage(id); break;
      }
      loadData();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSave = async () => {
    try {
      if (activeSection === 'siteContent') {
        await admin.updateSiteContent(formData);
        loadData();
        return;
      }

      const saveMap = {
        heroSlides: { create: admin.createHeroSlide, update: admin.updateHeroSlide },
        aboutImages: { create: admin.createAboutImage, update: admin.updateAboutImage },
        references: { create: admin.createReference, update: admin.updateReference },
        archGallery: { create: admin.createArchGallery, update: admin.updateArchGallery },
        archServices: { create: admin.createArchService, update: admin.updateArchService },
        projects: { create: admin.createProject, update: admin.updateProject },
      };

      const fns = saveMap[activeSection];
      if (!fns) return;

      if (editItem && editItem.id) {
        await fns.update(editItem.id, formData);
      } else {
        await fns.create(formData);
      }
      setEditItem(null);
      setFormData({});
      loadData();
    } catch (err) {
      setError(err.message);
    }
  };

  const startEdit = (item) => {
    setEditItem(item);
    setFormData({ ...item });
  };

  const startNew = () => {
    setEditItem({ id: null });
    setFormData(getEmptyForm());
  };

  const getEmptyForm = () => {
    switch (activeSection) {
      case 'heroSlides': return { imageUrl: '', alt: '', order: 0 };
      case 'aboutImages': return { imageUrl: '', alt: '', order: 0 };
      case 'references': return { name: '', logoUrl: '', order: 0 };
      case 'archGallery': return { imageUrl: '', alt: '', order: 0 };
      case 'archServices': return { icon: '', title: '', description: '', order: 0 };
      case 'projects': return { name: '', slug: '', location: '', year: '', status: '', heroImageUrl: '', heroAlt: '', order: 0 };
      default: return {};
    }
  };

  const handleFieldChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  if (authLoading) return <div className="admin"><p className="admin__loading" style={{ padding: 40 }}>Yükleniyor...</p></div>;
  if (!user || user.role !== 'Admin') return null;

  return (
    <div className="admin">
      <header className="admin__header">
        <h1 className="admin__title">Yönetim Paneli</h1>
        <button className="admin__back" onClick={() => navigate('/')}>Siteye Dön</button>
      </header>

      <div className="admin__layout">
        <aside className="admin__sidebar">
          {SECTIONS.map((s) => (
            <button
              key={s.key}
              className={`admin__sidebar-btn ${activeSection === s.key ? 'admin__sidebar-btn--active' : ''}`}
              onClick={() => setActiveSection(s.key)}
            >
              {s.label}
            </button>
          ))}
        </aside>

        <main className="admin__main">
          {error && <div className="admin__error">{error}</div>}
          {loading ? (
            <p className="admin__loading">Yükleniyor...</p>
          ) : (
            <>
              {activeSection === 'siteContent' && (
                <SiteContentEditor data={data} formData={formData} setFormData={setFormData} onSave={handleSave} />
              )}

              {activeSection === 'messages' && (
                <MessagesView data={data} onDelete={handleDelete} onMarkRead={async (id) => { await admin.markMessageRead(id); loadData(); }} />
              )}

              {activeSection === 'projects' && (
                <ProjectsManager data={data} onDelete={handleDelete} onReload={loadData} />
              )}

              {!['siteContent', 'messages', 'projects'].includes(activeSection) && (
                <GenericCrud
                  section={activeSection}
                  data={data}
                  editItem={editItem}
                  formData={formData}
                  onFieldChange={handleFieldChange}
                  onEdit={startEdit}
                  onNew={startNew}
                  onSave={handleSave}
                  onCancel={() => { setEditItem(null); setFormData({}); }}
                  onDelete={handleDelete}
                />
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}

// ── Site Content Editor ──
function SiteContentEditor({ data, formData, setFormData, onSave }) {
  const entries = typeof data === 'object' && !Array.isArray(data) ? Object.entries(data) : [];
  const [localData, setLocalData] = useState({});

  useEffect(() => {
    if (typeof data === 'object' && !Array.isArray(data)) {
      setLocalData({ ...data });
      setFormData({ ...data });
    }
  }, [data]);

  const handleChange = (key, value) => {
    setLocalData((prev) => ({ ...prev, [key]: value }));
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="admin__content-editor">
      <div className="admin__toolbar">
        <h2>Site İçerikleri</h2>
        <button className="admin__btn admin__btn--save" onClick={onSave}>Kaydet</button>
      </div>
      {entries.length === 0 ? (
        <p className="admin__empty">Henüz içerik yok.</p>
      ) : (
        <div className="admin__form-grid">
          {Object.entries(localData).map(([key, value]) => (
            <div key={key} className="admin__field">
              <label>{key}</label>
              <textarea
                value={value}
                onChange={(e) => handleChange(key, e.target.value)}
                rows={2}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Messages View ──
function MessagesView({ data, onDelete, onMarkRead }) {
  if (!Array.isArray(data)) return null;
  return (
    <div>
      <h2 className="admin__section-title">Mesajlar ({data.length})</h2>
      {data.length === 0 ? (
        <p className="admin__empty">Henüz mesaj yok.</p>
      ) : (
        <div className="admin__messages">
          {data.map((msg) => (
            <div key={msg.id} className={`admin__message ${msg.isRead ? '' : 'admin__message--unread'}`}>
              <div className="admin__message-header">
                <strong>{msg.name}</strong>
                <span>{msg.phone}</span>
                <span className="admin__message-project">{msg.project}</span>
              </div>
              <p className="admin__message-body">{msg.message || '—'}</p>
              <div className="admin__message-actions">
                {!msg.isRead && <button className="admin__btn admin__btn--small" onClick={() => onMarkRead(msg.id)}>Okundu</button>}
                <button className="admin__btn admin__btn--delete admin__btn--small" onClick={() => onDelete(msg.id)}>Sil</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════════
// PROJECTS MANAGER — Detaylı Proje Yönetimi
// ══════════════════════════════════════════

const PROJECT_STATUS_OPTIONS = [
  { value: 'completed', label: 'Tamamlandı' },
  { value: 'ongoing', label: 'İnşaat Devam Ediyor' },
];

const PROJECT_TABS = [
  { key: 'info', label: 'Temel Bilgiler' },
  { key: 'stats', label: 'İstatistikler' },
  { key: 'gallery', label: 'Galeri' },
  { key: 'interiors', label: 'İç Mekan' },
  { key: 'apartments', label: 'Daireler' },
];

function ProjectsManager({ data, onDelete, onReload }) {
  const [editingProject, setEditingProject] = useState(null);
  const [projectDetail, setProjectDetail] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('info');
  const [creating, setCreating] = useState(false);
  const [newForm, setNewForm] = useState({ name: '', slug: '', location: '', year: '', status: '', heroImageUrl: '', heroAlt: '', order: 0 });

  const openProject = async (project) => {
    setDetailLoading(true);
    setActiveTab('info');
    try {
      const detail = await admin.getProjectDetail(project.id);
      setProjectDetail(detail);
      setEditingProject(project);
    } catch {
      setProjectDetail(null);
    } finally {
      setDetailLoading(false);
    }
  };

  const refreshProject = async () => {
    if (!editingProject) return;
    const detail = await admin.getProjectDetail(editingProject.id);
    setProjectDetail(detail);
  };

  const handleCreateProject = async () => {
    const created = await admin.createProject(newForm);
    setCreating(false);
    setNewForm({ name: '', slug: '', location: '', year: '', status: '', heroImageUrl: '', heroAlt: '', order: 0 });
    onReload();
    // Oluşturulan projeyi otomatik olarak detay editöründe aç
    if (created && created.id) {
      await openProject(created);
    }
  };

  if (!Array.isArray(data)) return null;

  // ── Project Detail View ──
  if (editingProject && projectDetail) {
    return (
      <div className="pe">
        <div className="pe__top">
          <button className="admin__btn admin__btn--cancel" onClick={() => { setEditingProject(null); setProjectDetail(null); onReload(); }}>
            ← Projelere Dön
          </button>
          <h2 className="pe__project-name">{projectDetail.name}</h2>
        </div>

        <div className="pe__tabs">
          {PROJECT_TABS.map((t) => (
            <button
              key={t.key}
              className={`pe__tab ${activeTab === t.key ? 'pe__tab--active' : ''}`}
              onClick={() => setActiveTab(t.key)}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="pe__content">
          {activeTab === 'info' && <ProjectInfoTab project={projectDetail} onRefresh={refreshProject} />}
          {activeTab === 'stats' && <ProjectStatsTab project={projectDetail} onRefresh={refreshProject} />}
          {activeTab === 'gallery' && <ProjectGalleryTab project={projectDetail} onRefresh={refreshProject} />}
          {activeTab === 'interiors' && <ProjectInteriorsTab project={projectDetail} onRefresh={refreshProject} />}
          {activeTab === 'apartments' && <ProjectApartmentsTab project={projectDetail} onRefresh={refreshProject} />}
        </div>
      </div>
    );
  }

  // ── Projects List View ──
  return (
    <div>
      <div className="admin__toolbar">
        <h2>Projeler ({data.length})</h2>
        {!creating && <button className="admin__btn admin__btn--new" onClick={() => setCreating(true)}>Yeni Proje</button>}
      </div>

      {creating && (
        <div className="admin__edit-form">
          <h3>Yeni Proje Oluştur</h3>
          {['name', 'slug', 'location', 'year', 'heroAlt'].map((f) => (
            <div key={f} className="admin__field">
              <label>{FIELD_LABELS[f] || f}</label>
              <input type="text" value={newForm[f] || ''} onChange={(e) => setNewForm({ ...newForm, [f]: e.target.value })} />
            </div>
          ))}
          <div className="admin__field">
            <label>Durum</label>
            <select value={newForm.status} onChange={(e) => setNewForm({ ...newForm, status: e.target.value })}>
              <option value="">Seçiniz</option>
              {PROJECT_STATUS_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
          <div className="admin__field">
            <label>Hero Görseli</label>
            <ImageUpload value={newForm.heroImageUrl || ''} onChange={(url) => setNewForm({ ...newForm, heroImageUrl: url })} />
          </div>
          <div className="admin__field">
            <label>Sıra</label>
            <input type="number" value={newForm.order} onChange={(e) => setNewForm({ ...newForm, order: parseInt(e.target.value) || 0 })} />
          </div>
          <div className="admin__edit-actions">
            <button className="admin__btn admin__btn--save" onClick={handleCreateProject}>Oluştur</button>
            <button className="admin__btn admin__btn--cancel" onClick={() => setCreating(false)}>İptal</button>
          </div>
        </div>
      )}

      {detailLoading ? (
        <p className="admin__loading">Proje yükleniyor...</p>
      ) : (
        <div className="pe__project-list">
          {data.map((p) => (
            <div key={p.id} className="pe__project-card">
              <div className="pe__project-card-info">
                <div className="pe__project-card-name">{p.name}</div>
                <div className="pe__project-card-meta">
                  <span>{p.location}</span>
                  <span>{p.year}</span>
                  <span className="pe__project-card-status">{p.status}</span>
                </div>
              </div>
              <div className="pe__project-card-actions">
                <button className="admin__btn admin__btn--small" onClick={() => openProject(p)}>Düzenle</button>
                <button className="admin__btn admin__btn--delete admin__btn--small" onClick={() => onDelete(p.id)}>Sil</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Proje Temel Bilgiler Tab ──
function ProjectInfoTab({ project, onRefresh }) {
  const [form, setForm] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setForm({
      name: project.name || '',
      slug: project.slug || '',
      location: project.location || '',
      year: project.year || '',
      status: project.status || '',
      heroImageUrl: project.heroImageUrl || '',
      heroAlt: project.heroAlt || '',
      order: project.order || 0,
    });
  }, [project]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await admin.updateProject(project.id, form);
      await onRefresh();
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="pe__section">
      <div className="pe__section-header">
        <h3>Temel Bilgiler</h3>
        <button className="admin__btn admin__btn--save" onClick={handleSave} disabled={saving}>
          {saving ? '...' : 'Kaydet'}
        </button>
      </div>
      <div className="admin__form-grid">
        {['name', 'slug', 'location', 'year', 'heroAlt'].map((f) => (
          <div key={f} className="admin__field">
            <label>{FIELD_LABELS[f] || f}</label>
            <input type="text" value={form[f] || ''} onChange={(e) => setForm({ ...form, [f]: e.target.value })} />
          </div>
        ))}
        <div className="admin__field">
          <label>Durum</label>
          <select value={form.status || ''} onChange={(e) => setForm({ ...form, status: e.target.value })}>
            <option value="">Seçiniz</option>
            {PROJECT_STATUS_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
        <div className="admin__field">
          <label>Sıra</label>
          <input type="number" value={form.order || 0} onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) || 0 })} />
        </div>
      </div>
      <ImageUpload label="Hero Görseli" value={form.heroImageUrl || ''} onChange={(url) => setForm({ ...form, heroImageUrl: url })} />
    </div>
  );
}

// ── İstatistikler Tab ──
function ProjectStatsTab({ project, onRefresh }) {
  const stats = project.stats || [];
  const [addForm, setAddForm] = useState(null);
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({});

  const handleAdd = async () => {
    await admin.createProjectStat(project.id, addForm);
    setAddForm(null);
    await onRefresh();
  };

  const handleUpdate = async (id) => {
    await admin.updateProjectStat(id, editForm);
    setEditId(null);
    await onRefresh();
  };

  const handleDelete = async (id) => {
    if (!confirm('Bu istatistiği silmek istediğinize emin misiniz?')) return;
    await admin.deleteProjectStat(id);
    await onRefresh();
  };

  return (
    <div className="pe__section">
      <div className="pe__section-header">
        <h3>İstatistikler ({stats.length})</h3>
        {!addForm && <button className="admin__btn admin__btn--new" onClick={() => setAddForm({ value: '', title: '', order: stats.length })}>Ekle</button>}
      </div>

      {addForm && (
        <div className="pe__inline-form">
          <div className="admin__field">
            <label>Değer</label>
            <input type="text" value={addForm.value} onChange={(e) => setAddForm({ ...addForm, value: e.target.value })} placeholder="ör: 12.347" />
          </div>
          <div className="admin__field">
            <label>Başlık</label>
            <input type="text" value={addForm.title} onChange={(e) => setAddForm({ ...addForm, title: e.target.value })} placeholder="ör: m² Arazi Alanı" />
          </div>
          <div className="admin__field">
            <label>Sıra</label>
            <input type="number" value={addForm.order} onChange={(e) => setAddForm({ ...addForm, order: parseInt(e.target.value) || 0 })} />
          </div>
          <div className="pe__inline-actions">
            <button className="admin__btn admin__btn--save" onClick={handleAdd}>Ekle</button>
            <button className="admin__btn admin__btn--cancel" onClick={() => setAddForm(null)}>İptal</button>
          </div>
        </div>
      )}

      <div className="pe__items">
        {stats.map((s) => (
          <div key={s.id} className="pe__item">
            {editId === s.id ? (
              <div className="pe__inline-form">
                <div className="admin__field">
                  <label>Değer</label>
                  <input type="text" value={editForm.value} onChange={(e) => setEditForm({ ...editForm, value: e.target.value })} />
                </div>
                <div className="admin__field">
                  <label>Başlık</label>
                  <input type="text" value={editForm.title} onChange={(e) => setEditForm({ ...editForm, title: e.target.value })} />
                </div>
                <div className="admin__field">
                  <label>Sıra</label>
                  <input type="number" value={editForm.order} onChange={(e) => setEditForm({ ...editForm, order: parseInt(e.target.value) || 0 })} />
                </div>
                <div className="pe__inline-actions">
                  <button className="admin__btn admin__btn--save" onClick={() => handleUpdate(s.id)}>Kaydet</button>
                  <button className="admin__btn admin__btn--cancel" onClick={() => setEditId(null)}>İptal</button>
                </div>
              </div>
            ) : (
              <>
                <div className="pe__item-info">
                  <span className="pe__item-value">{s.value}</span>
                  <span className="pe__item-label">{s.title}</span>
                </div>
                <div className="pe__item-actions">
                  <button className="admin__btn admin__btn--small" onClick={() => { setEditId(s.id); setEditForm({ value: s.value, title: s.title, order: s.order }); }}>Düzenle</button>
                  <button className="admin__btn admin__btn--delete admin__btn--small" onClick={() => handleDelete(s.id)}>Sil</button>
                </div>
              </>
            )}
          </div>
        ))}
        {stats.length === 0 && <p className="admin__empty">Henüz istatistik eklenmemiş.</p>}
      </div>
    </div>
  );
}

// ── Galeri Tab ──
function ProjectGalleryTab({ project, onRefresh }) {
  const items = project.galleryImages || [];
  const [addForm, setAddForm] = useState(null);
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({});

  const handleAdd = async () => {
    await admin.createProjectGallery(project.id, addForm);
    setAddForm(null);
    await onRefresh();
  };

  const handleUpdate = async (id) => {
    await admin.updateProjectGallery(id, editForm);
    setEditId(null);
    await onRefresh();
  };

  const handleDelete = async (id) => {
    if (!confirm('Bu görseli silmek istediğinize emin misiniz?')) return;
    await admin.deleteProjectGallery(id);
    await onRefresh();
  };

  const emptyItem = { imageUrl: '', alt: '', title: '', description: '', order: items.length };

  return (
    <div className="pe__section">
      <div className="pe__section-header">
        <h3>Galeri Görselleri ({items.length})</h3>
        {!addForm && <button className="admin__btn admin__btn--new" onClick={() => setAddForm({ ...emptyItem })}>Ekle</button>}
      </div>

      {addForm && (
        <SubItemForm
          fields={[
            { key: 'imageUrl', label: 'Görsel URL' },
            { key: 'alt', label: 'Alt Metin' },
            { key: 'title', label: 'Başlık' },
            { key: 'description', label: 'Açıklama', type: 'textarea' },
            { key: 'order', label: 'Sıra', type: 'number' },
          ]}
          form={addForm}
          setForm={setAddForm}
          onSave={handleAdd}
          onCancel={() => setAddForm(null)}
          saveLabel="Ekle"
        />
      )}

      <div className="pe__items">
        {items.map((item) => (
          <div key={item.id} className="pe__item pe__item--card">
            {editId === item.id ? (
              <SubItemForm
                fields={[
                  { key: 'imageUrl', label: 'Görsel URL' },
                  { key: 'alt', label: 'Alt Metin' },
                  { key: 'title', label: 'Başlık' },
                  { key: 'description', label: 'Açıklama', type: 'textarea' },
                  { key: 'order', label: 'Sıra', type: 'number' },
                ]}
                form={editForm}
                setForm={setEditForm}
                onSave={() => handleUpdate(item.id)}
                onCancel={() => setEditId(null)}
              />
            ) : (
              <>
                <div className="pe__item-visual">
                  {item.imageUrl && <img src={item.imageUrl} alt={item.alt} className="pe__item-thumb" />}
                  <div className="pe__item-info">
                    <span className="pe__item-value">{item.title}</span>
                    <span className="pe__item-label">{item.description}</span>
                  </div>
                </div>
                <div className="pe__item-actions">
                  <button className="admin__btn admin__btn--small" onClick={() => { setEditId(item.id); setEditForm({ imageUrl: item.imageUrl, alt: item.alt, title: item.title, description: item.description, order: item.order }); }}>Düzenle</button>
                  <button className="admin__btn admin__btn--delete admin__btn--small" onClick={() => handleDelete(item.id)}>Sil</button>
                </div>
              </>
            )}
          </div>
        ))}
        {items.length === 0 && <p className="admin__empty">Henüz galeri görseli eklenmemiş.</p>}
      </div>
    </div>
  );
}

// ── İç Mekan Tab ──
function ProjectInteriorsTab({ project, onRefresh }) {
  const items = project.interiorRooms || [];
  const [addForm, setAddForm] = useState(null);
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({});

  const handleAdd = async () => {
    await admin.createInteriorRoom(project.id, addForm);
    setAddForm(null);
    await onRefresh();
  };

  const handleUpdate = async (id) => {
    await admin.updateInteriorRoom(id, editForm);
    setEditId(null);
    await onRefresh();
  };

  const handleDelete = async (id) => {
    if (!confirm('Bu odayı silmek istediğinize emin misiniz?')) return;
    await admin.deleteInteriorRoom(id);
    await onRefresh();
  };

  const emptyItem = { imageUrl: '', alt: '', tag: '', name: '', description: '', order: items.length };
  const fields = [
    { key: 'imageUrl', label: 'Görsel URL' },
    { key: 'alt', label: 'Alt Metin' },
    { key: 'tag', label: 'Etiket (ör: Yaşam Alanı)' },
    { key: 'name', label: 'Oda Adı' },
    { key: 'description', label: 'Açıklama', type: 'textarea' },
    { key: 'order', label: 'Sıra', type: 'number' },
  ];

  return (
    <div className="pe__section">
      <div className="pe__section-header">
        <h3>İç Mekan Odaları ({items.length})</h3>
        {!addForm && <button className="admin__btn admin__btn--new" onClick={() => setAddForm({ ...emptyItem })}>Ekle</button>}
      </div>

      {addForm && (
        <SubItemForm fields={fields} form={addForm} setForm={setAddForm} onSave={handleAdd} onCancel={() => setAddForm(null)} saveLabel="Ekle" />
      )}

      <div className="pe__items">
        {items.map((item) => (
          <div key={item.id} className="pe__item pe__item--card">
            {editId === item.id ? (
              <SubItemForm fields={fields} form={editForm} setForm={setEditForm} onSave={() => handleUpdate(item.id)} onCancel={() => setEditId(null)} />
            ) : (
              <>
                <div className="pe__item-visual">
                  {item.imageUrl && <img src={item.imageUrl} alt={item.alt} className="pe__item-thumb" />}
                  <div className="pe__item-info">
                    <span className="pe__item-tag">{item.tag}</span>
                    <span className="pe__item-value">{item.name}</span>
                    <span className="pe__item-label">{item.description}</span>
                  </div>
                </div>
                <div className="pe__item-actions">
                  <button className="admin__btn admin__btn--small" onClick={() => { setEditId(item.id); setEditForm({ imageUrl: item.imageUrl, alt: item.alt, tag: item.tag, name: item.name, description: item.description, order: item.order }); }}>Düzenle</button>
                  <button className="admin__btn admin__btn--delete admin__btn--small" onClick={() => handleDelete(item.id)}>Sil</button>
                </div>
              </>
            )}
          </div>
        ))}
        {items.length === 0 && <p className="admin__empty">Henüz iç mekan odası eklenmemiş.</p>}
      </div>
    </div>
  );
}

// ── Daireler Tab ──
function ProjectApartmentsTab({ project, onRefresh }) {
  const apartments = project.apartments || [];
  const [addForm, setAddForm] = useState(null);
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [expandedApt, setExpandedApt] = useState(null);

  const handleAdd = async () => {
    await admin.createApartment(project.id, addForm);
    setAddForm(null);
    await onRefresh();
  };

  const handleUpdate = async (id) => {
    await admin.updateApartment(id, editForm);
    setEditId(null);
    await onRefresh();
  };

  const handleDelete = async (id) => {
    if (!confirm('Bu daireyi silmek istediğinize emin misiniz?')) return;
    await admin.deleteApartment(id);
    await onRefresh();
  };

  const aptFields = [
    { key: 'typeCode', label: 'Tip Kodu (ör: Tip A)' },
    { key: 'name', label: 'Daire Adı (ör: 2+1 Daire)' },
    { key: 'interiorArea', label: 'İç Alan (ör: 85 m²)' },
    { key: 'exteriorArea', label: 'Dış Alan (ör: 120 m²)' },
    { key: 'status', label: 'Durum (available/limited/sold)' },
    { key: 'statusText', label: 'Durum Metni (ör: Müsait)' },
    { key: 'order', label: 'Sıra', type: 'number' },
  ];

  const emptyApt = { typeCode: '', name: '', interiorArea: '', exteriorArea: '', status: 'available', statusText: 'Müsait', order: apartments.length };

  return (
    <div className="pe__section">
      <div className="pe__section-header">
        <h3>Daire Seçenekleri ({apartments.length})</h3>
        {!addForm && <button className="admin__btn admin__btn--new" onClick={() => setAddForm({ ...emptyApt })}>Ekle</button>}
      </div>

      {addForm && (
        <SubItemForm fields={aptFields} form={addForm} setForm={setAddForm} onSave={handleAdd} onCancel={() => setAddForm(null)} saveLabel="Ekle" />
      )}

      <div className="pe__items">
        {apartments.map((apt) => (
          <div key={apt.id} className="pe__item pe__item--apartment">
            {editId === apt.id ? (
              <SubItemForm fields={aptFields} form={editForm} setForm={setEditForm} onSave={() => handleUpdate(apt.id)} onCancel={() => setEditId(null)} />
            ) : (
              <>
                <div className="pe__apt-header" onClick={() => setExpandedApt(expandedApt === apt.id ? null : apt.id)}>
                  <div className="pe__item-info">
                    <span className="pe__item-tag">{apt.typeCode}</span>
                    <span className="pe__item-value">{apt.name}</span>
                    {(apt.interiorArea || apt.exteriorArea) && (
                      <span className="pe__item-areas">
                        {apt.interiorArea && <span>İç: {apt.interiorArea}</span>}
                        {apt.exteriorArea && <span>Dış: {apt.exteriorArea}</span>}
                      </span>
                    )}
                    <span className={`pe__apt-status pe__apt-status--${apt.status}`}>{apt.statusText}</span>
                  </div>
                  <div className="pe__item-actions">
                    <button className="admin__btn admin__btn--small" onClick={(e) => { e.stopPropagation(); setEditId(apt.id); setEditForm({ typeCode: apt.typeCode, name: apt.name, interiorArea: apt.interiorArea || '', exteriorArea: apt.exteriorArea || '', status: apt.status, statusText: apt.statusText, order: apt.order }); }}>Düzenle</button>
                    <button className="admin__btn admin__btn--delete admin__btn--small" onClick={(e) => { e.stopPropagation(); handleDelete(apt.id); }}>Sil</button>
                    <span className={`pe__apt-arrow ${expandedApt === apt.id ? 'pe__apt-arrow--open' : ''}`}>▼</span>
                  </div>
                </div>

                {expandedApt === apt.id && (
                  <ApartmentFeaturesEditor apt={apt} onRefresh={onRefresh} />
                )}
              </>
            )}
          </div>
        ))}
        {apartments.length === 0 && <p className="admin__empty">Henüz daire eklenmemiş.</p>}
      </div>
    </div>
  );
}

// ── Daire Özellikleri Editor ──
function ApartmentFeaturesEditor({ apt, onRefresh }) {
  const features = apt.features || [];
  const [addForm, setAddForm] = useState(null);
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({});

  const handleAdd = async () => {
    await admin.createAptFeature(apt.id, addForm);
    setAddForm(null);
    await onRefresh();
  };

  const handleUpdate = async (id) => {
    await admin.updateAptFeature(id, editForm);
    setEditId(null);
    await onRefresh();
  };

  const handleDelete = async (id) => {
    if (!confirm('Bu özelliği silmek istediğinize emin misiniz?')) return;
    await admin.deleteAptFeature(id);
    await onRefresh();
  };

  return (
    <div className="pe__features">
      <div className="pe__features-header">
        <span>Özellikler ({features.length})</span>
        {!addForm && (
          <button className="admin__btn admin__btn--new admin__btn--small" onClick={() => setAddForm({ label: '', value: '', order: features.length })}>
            Özellik Ekle
          </button>
        )}
      </div>

      {addForm && (
        <div className="pe__feature-form">
          <input placeholder="Etiket (ör: Brüt Alan)" value={addForm.label} onChange={(e) => setAddForm({ ...addForm, label: e.target.value })} />
          <input placeholder="Değer (ör: 125 m²)" value={addForm.value} onChange={(e) => setAddForm({ ...addForm, value: e.target.value })} />
          <input type="number" placeholder="Sıra" value={addForm.order} onChange={(e) => setAddForm({ ...addForm, order: parseInt(e.target.value) || 0 })} style={{ width: 60 }} />
          <button className="admin__btn admin__btn--save admin__btn--small" onClick={handleAdd}>Ekle</button>
          <button className="admin__btn admin__btn--cancel admin__btn--small" onClick={() => setAddForm(null)}>X</button>
        </div>
      )}

      <div className="pe__features-list">
        {features.map((f) => (
          <div key={f.id} className="pe__feature-row">
            {editId === f.id ? (
              <div className="pe__feature-form">
                <input value={editForm.label} onChange={(e) => setEditForm({ ...editForm, label: e.target.value })} />
                <input value={editForm.value} onChange={(e) => setEditForm({ ...editForm, value: e.target.value })} />
                <input type="number" value={editForm.order} onChange={(e) => setEditForm({ ...editForm, order: parseInt(e.target.value) || 0 })} style={{ width: 60 }} />
                <button className="admin__btn admin__btn--save admin__btn--small" onClick={() => handleUpdate(f.id)}>Kaydet</button>
                <button className="admin__btn admin__btn--cancel admin__btn--small" onClick={() => setEditId(null)}>X</button>
              </div>
            ) : (
              <>
                <span className="pe__feature-label">{f.label}</span>
                <span className="pe__feature-value">{f.value}</span>
                <div className="pe__feature-actions">
                  <button className="admin__btn admin__btn--small" onClick={() => { setEditId(f.id); setEditForm({ label: f.label, value: f.value, order: f.order }); }}>Düzenle</button>
                  <button className="admin__btn admin__btn--delete admin__btn--small" onClick={() => handleDelete(f.id)}>Sil</button>
                </div>
              </>
            )}
          </div>
        ))}
        {features.length === 0 && <p className="admin__empty">Henüz özellik eklenmemiş.</p>}
      </div>
    </div>
  );
}

// ── Reusable Sub-Item Form ──
function SubItemForm({ fields, form, setForm, onSave, onCancel, saveLabel = 'Kaydet' }) {
  const isImageField = (key) => key.toLowerCase().includes('imageurl') || key.toLowerCase().includes('logourl');

  return (
    <div className="pe__inline-form">
      {fields.map((f) => (
        <div key={f.key} className="admin__field">
          <label>{f.label}</label>
          {isImageField(f.key) ? (
            <ImageUpload value={form[f.key] || ''} onChange={(url) => setForm({ ...form, [f.key]: url })} />
          ) : f.type === 'textarea' ? (
            <textarea value={form[f.key] || ''} onChange={(e) => setForm({ ...form, [f.key]: e.target.value })} rows={2} />
          ) : f.type === 'number' ? (
            <input type="number" value={form[f.key] || 0} onChange={(e) => setForm({ ...form, [f.key]: parseInt(e.target.value) || 0 })} />
          ) : (
            <input type="text" value={form[f.key] || ''} onChange={(e) => setForm({ ...form, [f.key]: e.target.value })} />
          )}
        </div>
      ))}
      <div className="pe__inline-actions">
        <button className="admin__btn admin__btn--save" onClick={onSave}>{saveLabel}</button>
        <button className="admin__btn admin__btn--cancel" onClick={onCancel}>İptal</button>
      </div>
    </div>
  );
}

// ── Generic CRUD ──
const FIELD_LABELS = {
  imageUrl: 'Görsel URL',
  alt: 'Alt Metin',
  order: 'Sıra',
  name: 'İsim',
  logoUrl: 'Logo URL',
  icon: 'İkon',
  title: 'Başlık',
  description: 'Açıklama',
  slug: 'Slug',
  location: 'Konum',
  year: 'Yıl',
  status: 'Durum',
  heroImageUrl: 'Hero Görsel URL',
  heroAlt: 'Hero Alt Metin',
};

function GenericCrud({ section, data, editItem, formData, onFieldChange, onEdit, onNew, onSave, onCancel, onDelete }) {
  if (!Array.isArray(data)) return null;

  const displayFields = getDisplayFields(section);
  const sectionLabel = SECTIONS.find((s) => s.key === section)?.label || section;

  return (
    <div>
      <div className="admin__toolbar">
        <h2>{sectionLabel} ({data.length})</h2>
        {!editItem && <button className="admin__btn admin__btn--new" onClick={onNew}>Yeni Ekle</button>}
      </div>

      {editItem && (
        <div className="admin__edit-form">
          <h3>{editItem.id ? 'Düzenle' : 'Yeni Ekle'}</h3>
          {displayFields.map((field) => (
            <div key={field} className="admin__field">
              <label>{FIELD_LABELS[field] || field}</label>
              {(field.toLowerCase().includes('url')) ? (
                <ImageUpload value={formData[field] || ''} onChange={(url) => onFieldChange(field, url)} />
              ) : field === 'description' ? (
                <textarea value={formData[field] || ''} onChange={(e) => onFieldChange(field, e.target.value)} rows={3} />
              ) : field === 'order' ? (
                <input type="number" value={formData[field] || 0} onChange={(e) => onFieldChange(field, parseInt(e.target.value) || 0)} />
              ) : (
                <input type="text" value={formData[field] || ''} onChange={(e) => onFieldChange(field, e.target.value)} />
              )}
            </div>
          ))}
          <div className="admin__edit-actions">
            <button className="admin__btn admin__btn--save" onClick={onSave}>Kaydet</button>
            <button className="admin__btn admin__btn--cancel" onClick={onCancel}>İptal</button>
          </div>
        </div>
      )}

      <div className="admin__table-wrap">
        <table className="admin__table">
          <thead>
            <tr>
              <th>ID</th>
              {displayFields.slice(0, 4).map((f) => <th key={f}>{FIELD_LABELS[f] || f}</th>)}
              <th>İşlem</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                {displayFields.slice(0, 4).map((f) => (
                  <td key={f} className="admin__cell">
                    {f.toLowerCase().includes('url') && item[f] ? (
                      <img src={item[f]} alt="" className="admin__thumb" />
                    ) : (
                      String(item[f] || '').substring(0, 60)
                    )}
                  </td>
                ))}
                <td>
                  <button className="admin__btn admin__btn--small" onClick={() => onEdit(item)}>Düzenle</button>
                  <button className="admin__btn admin__btn--delete admin__btn--small" onClick={() => onDelete(item.id)}>Sil</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function getDisplayFields(section) {
  switch (section) {
    case 'heroSlides': return ['imageUrl', 'alt', 'order'];
    case 'aboutImages': return ['imageUrl', 'alt', 'order'];
    case 'references': return ['name', 'logoUrl', 'order'];
    case 'archGallery': return ['imageUrl', 'alt', 'order'];
    case 'archServices': return ['icon', 'title', 'description', 'order'];
    case 'projects': return ['name', 'slug', 'location', 'year', 'status', 'heroImageUrl', 'heroAlt', 'order'];
    default: return [];
  }
}

export default AdminPanel;
