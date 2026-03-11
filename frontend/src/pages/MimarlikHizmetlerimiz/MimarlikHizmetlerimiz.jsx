import { useEffect, useRef, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './MimarlikHizmetlerimiz.css';
import { fetchArchitectureGalleryImages, fetchArchitectureServices } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { Editable } from '../../components/EditPopup/EditPopup';
import {
  updateArchGallery, deleteArchGallery, createArchGallery,
  updateArchService, deleteArchService, createArchService,
} from '../../services/adminApi';

import kapakOfis from '../../../mimarlikgorseller/kapakofis.jpeg';
import galeri1 from '../../../mimarlikgorseller/WhatsApp Image 2026-03-11 at 07.15.40.jpeg';
import galeri2 from '../../../mimarlikgorseller/WhatsApp Image 2026-03-11 at 07.15.40 (1).jpeg';
import galeri3 from '../../../mimarlikgorseller/WhatsApp Image 2026-03-11 at 07.15.41.jpeg';
import galeri4 from '../../../mimarlikgorseller/WhatsApp Image 2026-03-11 at 07.15.41 (1).jpeg';
import galeri5 from '../../../mimarlikgorseller/WhatsApp Image 2026-03-11 at 07.15.42.jpeg';

const fallbackGalleryImages = [
  { src: galeri1, alt: 'Mimarlık Projesi 1' },
  { src: galeri2, alt: 'Mimarlık Projesi 2' },
  { src: galeri3, alt: 'Mimarlık Projesi 3' },
  { src: galeri4, alt: 'Mimarlık Projesi 4' },
  { src: galeri5, alt: 'Mimarlık Projesi 5' },
];

const fallbackServices = [
  { icon: '🏛', title: 'Mimarlık Hizmetleri', description: 'Projelerinizi hayata geçirmek için mimari tasarım, ruhsat ve uygulama süreçlerinin tamamında profesyonel destek sunuyoruz.' },
  { icon: '🏢', title: 'Ofis Yapımı & Tadilatı', description: 'Modern ve fonksiyonel ofis alanları tasarlıyor, sıfırdan yapım ve kapsamlı tadilat hizmetleri veriyoruz.' },
  { icon: '🏗', title: 'Depo & Endüstriyel Yapılar', description: 'Depo, atölye ve endüstriyel tesisleriniz için dayanıklı, verimli ve bütçeye uygun çözümler üretiyoruz.' },
  { icon: '🔨', title: 'Tadilat & Renovasyon', description: 'Konut, ofis ve ticari mekânlarda kapsamlı tadilat, onarım ve yenileme işlerinizi anahtar teslim gerçekleştiriyoruz.' },
  { icon: '🛋', title: 'İç Dekorasyon', description: 'Mekânlarınızı estetik ve işlevsel bir şekilde tasarlıyor; mobilya seçimi, renk paleti ve aydınlatma planlamasıyla bütünlüklü çözümler sunuyoruz.' },
  { icon: '📐', title: 'Proje & Danışmanlık', description: 'Yapı projelerinizde fizibilite, maliyet analizi ve süreç yönetimi konularında uzman danışmanlık hizmeti sağlıyoruz.' },
];

const galleryFields = [
  { key: 'imageUrl', label: 'Görsel URL', type: 'text' },
  { key: 'alt', label: 'Alt Metin', type: 'text' },
];

const serviceFields = [
  { key: 'icon', label: 'İkon (emoji)', type: 'text' },
  { key: 'title', label: 'Başlık', type: 'text' },
  { key: 'description', label: 'Açıklama', type: 'textarea' },
];

function MimarlikHizmetlerimiz() {
  const navigate = useNavigate();
  const sectionRefs = useRef([]);
  const [activeGallery, setActiveGallery] = useState(0);
  const galleryTrackRef = useRef(null);
  const [galleryImages, setGalleryImages] = useState(fallbackGalleryImages);
  const [dbGallery, setDbGallery] = useState([]);
  const [services, setServices] = useState(fallbackServices);
  const [dbServices, setDbServices] = useState([]);
  const [addServiceOpen, setAddServiceOpen] = useState(false);
  const [addServiceForm, setAddServiceForm] = useState({ icon: '', title: '', description: '' });
  const { user } = useAuth();
  const isAdmin = user?.role === 'Admin';

  const loadGallery = () => {
    fetchArchitectureGalleryImages()
      .then((data) => {
        if (data.length > 0) {
          setDbGallery(data);
          setGalleryImages(data.map((img) => ({ src: img.imageUrl, alt: img.alt })));
          setActiveGallery(0);
        }
      })
      .catch(() => {});
  };

  const loadServices = () => {
    fetchArchitectureServices()
      .then((data) => {
        if (data.length > 0) {
          setDbServices(data);
          setServices(data);
        }
      })
      .catch(() => {});
  };

  useEffect(() => {
    loadGallery();
    loadServices();
  }, []);

  const nextGallery = useCallback(() => {
    setActiveGallery((prev) => (prev + 1) % galleryImages.length);
  }, [galleryImages.length]);

  const prevGallery = useCallback(() => {
    setActiveGallery((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  }, [galleryImages.length]);

  useEffect(() => {
    const timer = setInterval(nextGallery, 4000);
    return () => clearInterval(timer);
  }, [nextGallery]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('mh-visible');
          }
        });
      },
      { threshold: 0.15 }
    );

    sectionRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const addRef = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  const handleUpdateGallery = async (dbImg, form) => {
    await updateArchGallery(dbImg.id, form);
    loadGallery();
  };

  const handleDeleteGallery = async (dbImg) => {
    if (!confirm('Bu görseli silmek istediğinize emin misiniz?')) return;
    await deleteArchGallery(dbImg.id);
    loadGallery();
  };

  const handleUpdateService = async (dbSvc, form) => {
    await updateArchService(dbSvc.id, form);
    loadServices();
  };

  const handleDeleteService = async (dbSvc) => {
    if (!confirm('Bu hizmeti silmek istediğinize emin misiniz?')) return;
    await deleteArchService(dbSvc.id);
    loadServices();
  };

  const handleAddService = async () => {
    await createArchService(addServiceForm);
    setAddServiceForm({ icon: '', title: '', description: '' });
    setAddServiceOpen(false);
    loadServices();
  };

  return (
    <div className="mh">
      {/* ── Hero Section ── */}
      <section className="mh__hero">
        <img className="mh__hero-img" src={kapakOfis} alt="Mimarlık Hizmetlerimiz" />
        <div className="mh__hero-overlay" />
        <div className="mh__hero-grain" />

        <div className="mh__hero-line mh__hero-line--top" />
        <div className="mh__hero-triangle" />

        <button className="mh__back" onClick={() => navigate('/')}>
          <span aria-hidden="true">←</span> Ana Sayfa
        </button>

        <div className="mh__hero-content">
          <span className="mh__hero-label">Üçgen Yapı</span>
          <h1 className="mh__hero-title">
            Mimarlık <em>Hizmetlerimiz</em>
          </h1>
          <p className="mh__hero-desc">
            Ofis, depo yapımlarından tadilatına, iç dekorasyondan mimari projelere kadar
            geniş bir yelpazede profesyonel ve estetik çözümler sunuyoruz.
          </p>
          <a href="#hizmetler" className="mh__hero-btn">
            Hizmetlerimizi Keşfedin
            <span aria-hidden="true">↓</span>
          </a>
        </div>

        <div className="mh__hero-scroll">
          <div className="mh__hero-scroll-line" />
        </div>
      </section>

      {/* ── Gallery Slider ── */}
      <section className="mh__gallery" ref={addRef}>
        <div className="mh__gallery-header">
          <span className="mh__gallery-label">Portfolyo</span>
          <h2 className="mh__gallery-title">
            Projelerimizden <em>Kareler</em>
          </h2>
        </div>

        <div className="mh__gallery-slider">
          <button className="mh__gallery-arrow mh__gallery-arrow--prev" onClick={prevGallery} aria-label="Önceki">
            &#8249;
          </button>

          <div className="mh__gallery-viewport">
            <div
              className="mh__gallery-track"
              ref={galleryTrackRef}
              style={{ transform: `translateX(-${activeGallery * 100}%)` }}
            >
              {galleryImages.map((img, i) => (
                <div className="mh__gallery-slide" key={i}>
                  <img src={img.src} alt={img.alt} loading="lazy" />
                </div>
              ))}
            </div>
          </div>

          <button className="mh__gallery-arrow mh__gallery-arrow--next" onClick={nextGallery} aria-label="Sonraki">
            &#8250;
          </button>
        </div>

        <div className="mh__gallery-dots">
          {galleryImages.map((_, i) => (
            <button
              key={i}
              className={`mh__gallery-dot ${i === activeGallery ? 'mh__gallery-dot--active' : ''}`}
              onClick={() => setActiveGallery(i)}
              aria-label={`Görsel ${i + 1}`}
            />
          ))}
        </div>

        {/* Admin: edit current gallery slide */}
        {isAdmin && dbGallery.length > 0 && dbGallery[activeGallery] && (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 12 }}>
            <Editable
              isAdmin={isAdmin}
              fields={galleryFields}
              values={{ imageUrl: dbGallery[activeGallery].imageUrl, alt: dbGallery[activeGallery].alt }}
              onSave={(form) => handleUpdateGallery(dbGallery[activeGallery], form)}
              onDelete={() => handleDeleteGallery(dbGallery[activeGallery])}
            >
              <button className="admin-edit-btn" style={{ position: 'relative' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
                <span>Görseli Düzenle</span>
              </button>
            </Editable>
          </div>
        )}
      </section>

      {/* ── Services Section ── */}
      <section className="mh__services" id="hizmetler">
        <div className="mh__services-header" ref={addRef}>
          <span className="mh__services-label">Ne Yapıyoruz</span>
          <h2 className="mh__services-title">
            Hizmet <em>Alanlarımız</em>
          </h2>
          <p className="mh__services-subtitle">
            İnşaat ve mimarlık alanında sunduğumuz kapsamlı hizmetlerimizle
            projelerinize değer katıyoruz.
          </p>
        </div>

        <div className="mh__services-grid">
          {services.map((service, i) => {
            const dbSvc = dbServices[i];
            const card = (
              <div
                className="mh__card"
                ref={addRef}
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div className="mh__card-icon">{service.icon}</div>
                <h3 className="mh__card-title">{service.title}</h3>
                <p className="mh__card-desc">{service.description}</p>
                <div className="mh__card-line" />
              </div>
            );

            if (isAdmin && dbSvc) {
              return (
                <Editable
                  key={dbSvc.id}
                  isAdmin={isAdmin}
                  fields={serviceFields}
                  values={{ icon: dbSvc.icon, title: dbSvc.title, description: dbSvc.description }}
                  onSave={(form) => handleUpdateService(dbSvc, form)}
                  onDelete={() => handleDeleteService(dbSvc)}
                >
                  {card}
                </Editable>
              );
            }
            return <div key={i}>{card}</div>;
          })}

          {isAdmin && (
            <div className="mh__card mh__card--add">
              {addServiceOpen ? (
                <div className="inline-add-form">
                  <input placeholder="İkon (emoji)" value={addServiceForm.icon} onChange={(e) => setAddServiceForm({...addServiceForm, icon: e.target.value})} />
                  <input placeholder="Başlık" value={addServiceForm.title} onChange={(e) => setAddServiceForm({...addServiceForm, title: e.target.value})} />
                  <textarea placeholder="Açıklama" value={addServiceForm.description} onChange={(e) => setAddServiceForm({...addServiceForm, description: e.target.value})} rows={3} />
                  <div className="inline-add-form__actions">
                    <button className="inline-add-form__save" onClick={handleAddService}>Ekle</button>
                    <button className="inline-add-form__cancel" onClick={() => setAddServiceOpen(false)}>X</button>
                  </div>
                </div>
              ) : (
                <button className="references__add-btn" onClick={() => setAddServiceOpen(true)} title="Yeni Hizmet Ekle" style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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

      {/* ── CTA Section ── */}
      <section className="mh__cta" ref={addRef}>
        <div className="mh__cta-content">
          <h2 className="mh__cta-title">
            Projenizi Birlikte <em>Hayata Geçirelim</em>
          </h2>
          <p className="mh__cta-desc">
            Mimarlık ve inşaat ihtiyaçlarınız için bizimle iletişime geçin.
            Ücretsiz keşif ve danışmanlık hizmeti sunuyoruz.
          </p>
          <button className="mh__cta-btn" onClick={() => navigate('/iletisim')}>
            İletişime Geçin
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </section>

      {/* ── Footer Strip ── */}
      <div className="mh__footer">
        <span>Üçgen Yapı — Mimarlık & İnşaat</span>
      </div>
    </div>
  );
}

export default MimarlikHizmetlerimiz;
