import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import './ProjectsSection.css';
import projects from '../../data/projects';

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

function ProjectsSection() {
  const [selectedProjectId, setSelectedProjectId] = useState(projects[0].id);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dis');

  const project = projects.find((p) => p.id === selectedProjectId);
  const observe = useRevealRef();

  const handleSelectProject = (id) => {
    setSelectedProjectId(id);
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

  const statusClass = project.status === 'Tamamlandı' ? 'done' : 'building';

  return (
    <section className="projects" id="projeler">
      <div className="projects__deco-triangle projects__deco-triangle--1" />
      <div className="projects__deco-triangle projects__deco-triangle--2" />

      {/* Header */}
      <div className="projects__header">
        <span className="projects__label" ref={observe}>Projelerimiz</span>
        <h2 className="projects__heading" ref={observe}>
          {project.name.split(' ').slice(0, -1).join(' ')}{' '}
          <em>{project.name.split(' ').slice(-1)}</em>
        </h2>

        {projects.length > 1 && (
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
              {projects.map((p) => (
                <button
                  key={p.id}
                  className={`projects__dropdown-item ${p.id === selectedProjectId ? 'projects__dropdown-item--active' : ''}`}
                  onClick={() => handleSelectProject(p.id)}
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
            <img src={project.exterior.heroImage} alt={project.exterior.heroAlt} />
            <div className="projects__hero-overlay" />
            <span className="projects__hero-badge">{project.status}</span>
            <span className="projects__hero-title">{project.name}</span>
          </div>

          <div className="projects__stats-grid">
            {project.exterior.stats.map((stat, i) => (
              <div className="projects__stat-card" key={i} ref={observe}>
                <div className="projects__stat-icon" aria-hidden="true" />
                <span className="projects__stat-value">{stat.value}</span>
                <span className="projects__stat-title">{stat.title}</span>
              </div>
            ))}
          </div>

          <div className="projects__ext-gallery">
            {project.exterior.gallery.map((item, i) => (
              <div className="projects__ext-card" key={i} ref={observe}>
                <img src={item.image} alt={item.alt} />
                <div className="projects__ext-card-overlay" />
                <div className="projects__ext-card-info">
                  <div className="projects__ext-card-title">{item.title}</div>
                  <div className="projects__ext-card-desc">{item.desc}</div>
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
            {project.interior.map((room, i) => (
              <div className="projects__int-card" key={i} ref={observe}>
                <div className="projects__int-card-image">
                  <img src={room.image} alt={room.alt} />
                </div>
                <div className="projects__int-card-body">
                  <span className="projects__int-card-tag">{room.tag}</span>
                  <div className="projects__int-card-name">{room.name}</div>
                  <div className="projects__int-card-desc">{room.desc}</div>
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
                  <span className="projects__apt-card-type">{apt.type}</span>
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
                    <span className={`projects__apt-card-dot ${apt.status === 'limited' ? 'projects__apt-card-dot--limited' : ''}`} />
                    <span className="projects__apt-card-status-text">{apt.statusText}</span>
                  </div>
                  <button className="projects__apt-card-btn">Detay</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="projects__cta" ref={observe}>
        <div className="projects__cta-text">
          Hayalinizdeki daireyi birlikte <em>keşfedelim</em>
        </div>
        <Link to="/iletisim" className="projects__cta-btn">
          Randevu Alın
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}

export default ProjectsSection;
