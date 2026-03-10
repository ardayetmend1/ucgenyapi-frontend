import { useState, useEffect, useCallback } from 'react';
import './ReferencesSection.css';
import { fetchReferences } from '../../services/api';

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

function ReferencesSection() {
  const [references, setReferences] = useState([]);
  const observe = useRevealRef();

  useEffect(() => {
    fetchReferences()
      .then(setReferences)
      .catch(() => {});
  }, []);

  if (references.length === 0) return null;

  return (
    <section className="references" id="referanslar">
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
          <div className="references__item" key={ref.id}>
            <img
              className="references__logo"
              src={ref.logo}
              alt={ref.name}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default ReferencesSection;
