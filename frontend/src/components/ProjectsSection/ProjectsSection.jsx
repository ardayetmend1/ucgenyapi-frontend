import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import './ProjectsSection.css';
import { fetchProjects, fetchProject } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { Editable } from '../EditPopup/EditPopup';
import { updateProject } from '../../services/adminApi';

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

const projectFields = [
  { key: 'name', label: 'Proje Adı', type: 'text' },
  { key: 'status', label: 'Durum', type: 'text' },
  { key: 'location', label: 'Konum', type: 'text' },
  { key: 'hero_image', label: 'Hero Görsel URL', type: 'text' },
  { key: 'hero_alt', label: 'Hero Alt Metin', type: 'text' },
];

function ProjectsSection() {
  const [projectsList, setProjectsList] = useState([]);
  const [selectedSlug, setSelectedSlug] = useState(null);
  const [project, setProject] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dis');
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const isAdmin = user?.role === 'Admin';

  const observe = useRevealRef();

  useEffect(() => {
    fetchProjects().then((data) => {
      setProjectsList(data);
      if (data.length > 0) {
        setSelectedSlug(data[0].slug);
      }
    });
  }, []);

  const loadProject = useCallback(() => {
    if (!selectedSlug) return;
    setLoading(true);
    fetchProject(selectedSlug).then((data) => {
      setProject(data);
      setLoading(false);
    });
  }, [selectedSlug]);

  useEffect(() => { loadProject(); }, [loadProject]);

  const handleSelectProject = (slug) => {
    setSelectedSlug(slug);
    setDropdownOpen(false);
    setActiveTab('dis');
  };

  useEffect(() => {
    const handleClick = (e) => {
      if (!e.target.closest('.projects__selector')) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  const handleUpdateProject = async (form) => {
    await updateProject(project.id, form);
    loadProject();
  };

  if (loading || !project) {
    return (
      <section className="projects" id="projeler" style={{ position: "relative" }}>
        <div className="projects__loading">Yükleniyor...</div>
      </section>
    );
  }

  const statusClass = project.status === 'Tamamlandı' ? 'done' : 'building';

  return (
    <section className="projects" id="projeler" style={{ position: "relative" }}>
      <div className="projects__deco-triangle projects__deco-triangle--1" />
      <div className="projects__deco-triangle projects__deco-triangle--2" />

      {/* Header */}
      <div className="projects__header">
        <span className="projects__label" ref={observe}>Projelerimiz</span>
        <Editable
          isAdmin={isAdmin}
          fields={projectFields}
          values={{
            name: project.name,
            status: project.status,
            location: project.location || '',
            hero_image: project.hero_image,
            hero_alt: project.hero_alt,
          }}
          onSave={handleUpdateProject}
        >
          <h2 className="projects__heading" ref={observe}>
            {project.name.split(' ').slice(0, -1).join(' ')}{' '}
            <em>{project.name.split(' ').slice(-1)}</em>
          </h2>
        </Editable>

        {projectsList.length > 1 && (
          <div className="projects__selector" ref={observe}>
            <button
              className="projects__selector-btn"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <span className="projects__selector-btn-text">{project.name}</span>
              <span className="projects__selector-btn-meta">
                <span className={`projects__selector-status projects__selector-status--${statusClass}`}>
                  {project.status}
                </span>
                <span className={`projects__selector-arrow ${dropdownOpen ? 'projects__selector-arrow--open' : ''}`}>
                  ▼
                </span>
              </span>
            </button>

            <div className={`projects__dropdown ${dropdownOpen ? 'projects__dropdown--open' : ''}`}>
              {projectsList.map((p) => (
                <button
                  key={p.slug}
                  className={`projects__dropdown-item ${p.slug === selectedSlug ? 'projects__dropdown-item--active' : ''}`}
                  onClick={() => handleSelectProject(p.slug)}
                >
                  <div className="projects__dropdown-item-info">
                    <span className="projects__dropdown-item-name">{p.name}</span>
                    <span className="projects__dropdown-item-location">{p.location}</span>
                  </div>
                  <span className="projects__dropdown-item-year">{p.year}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        <span className="projects__heading-line" ref={observe} />
      </div>

      {/* Tabs */}
      <div className="projects__tabs">
        {['dis', 'ic', 'daire'].map((tab) => (
          <button
            key={tab}
            className={`projects__tab ${activeTab === tab ? 'projects__tab--active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === 'dis' ? 'Dış Alan' : tab === 'ic' ? 'İç Alan' : 'Daire Seçenekleri'}
          </button>
        ))}
      </div>

      {/* DIS ALAN */}
      {activeTab === 'dis' && (
        <div className="projects__exterior">
          <div className="projects__hero-image" ref={observe}>
            <img src={project.hero_image} alt={project.hero_alt} />
            <div className="projects__hero-overlay" />
            <span className="projects__hero-badge">{project.status}</span>
            <span className="projects__hero-title">{project.name}</span>
          </div>

          <div className="projects__stats-grid">
            {project.stats.map((stat, i) => (
              <div className="projects__stat-card" key={i} ref={observe}>
                <div className="projects__stat-icon" aria-hidden="true" />
                <span className="projects__stat-value">{stat.value}</span>
                <span className="projects__stat-title">{stat.title}</span>
              </div>
            ))}
          </div>

          <div className="projects__ext-gallery">
            {project.gallery_images.map((item, i) => (
              <div className="projects__ext-card" key={i} ref={observe}>
                <img src={item.image} alt={item.alt} />
                <div className="projects__ext-card-overlay" />
                <div className="projects__ext-card-info">
                  <div className="projects__ext-card-title">{item.title}</div>
                  <div className="projects__ext-card-desc">{item.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* IC ALAN */}
      {activeTab === 'ic' && (
        <div className="projects__interior">
          <div className="projects__interior-header" ref={observe}>
            <h3 className="projects__interior-title">
              Yaşam <em>Alanları</em>
            </h3>
            <div className="projects__interior-line" />
          </div>

          <div className="projects__int-gallery">
            {project.interior_rooms.map((room, i) => (
              <div className="projects__int-card" key={i} ref={observe}>
                <div className="projects__int-card-image">
                  <img src={room.image} alt={room.alt} />
                </div>
                <div className="projects__int-card-body">
                  <span className="projects__int-card-tag">{room.tag}</span>
                  <div className="projects__int-card-name">{room.name}</div>
                  <div className="projects__int-card-desc">{room.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* DAIRE SECENEKLERI */}
      {activeTab === 'daire' && (
        <div className="projects__apartments">
          <div className="projects__apt-header" ref={observe}>
            <h3 className="projects__apt-title">
              Daire <em>Seçenekleri</em>
            </h3>
            <div className="projects__apt-line" />
          </div>

          <div className="projects__apt-grid">
            {project.apartments.map((apt, i) => (
              <div className="projects__apt-card" key={i} ref={observe}>
                <div className="projects__apt-card-top">
                  <span className="projects__apt-card-type">{apt.type_code}</span>
                  <div className="projects__apt-card-name">{apt.name}</div>
                </div>
                <div className="projects__apt-card-body">
                  <ul className="projects__apt-card-features">
                    {apt.features.map((feat, j) => (
                      <li className="projects__apt-card-feature" key={j}>
                        <span className="projects__apt-feature-label">{feat.label}</span>
                        <span className="projects__apt-feature-value">{feat.value}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="projects__apt-card-footer">
                  <div className="projects__apt-card-status">
                    <span className={`projects__apt-card-dot projects__apt-card-dot--${apt.status}`} />
                    <span className="projects__apt-card-status-text">{apt.status_text}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </section>
  );
}

export default ProjectsSection;
