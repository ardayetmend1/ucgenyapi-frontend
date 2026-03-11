import { useEffect, useRef, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './MimarlikHizmetlerimiz.css';

import kapakOfis from '../../../mimarlikgorseller/kapakofis.jpeg';
import galeri1 from '../../../mimarlikgorseller/WhatsApp Image 2026-03-11 at 07.15.40.jpeg';
import galeri2 from '../../../mimarlikgorseller/WhatsApp Image 2026-03-11 at 07.15.40 (1).jpeg';
import galeri3 from '../../../mimarlikgorseller/WhatsApp Image 2026-03-11 at 07.15.41.jpeg';
import galeri4 from '../../../mimarlikgorseller/WhatsApp Image 2026-03-11 at 07.15.41 (1).jpeg';
import galeri5 from '../../../mimarlikgorseller/WhatsApp Image 2026-03-11 at 07.15.42.jpeg';

const galleryImages = [
  { src: galeri1, alt: 'Mimarlık Projesi 1' },
  { src: galeri2, alt: 'Mimarlık Projesi 2' },
  { src: galeri3, alt: 'Mimarlık Projesi 3' },
  { src: galeri4, alt: 'Mimarlık Projesi 4' },
  { src: galeri5, alt: 'Mimarlık Projesi 5' },
];

const services = [
  {
    icon: '🏛',
    title: 'Mimarlık Hizmetleri',
    description:
      'Projelerinizi hayata geçirmek için mimari tasarım, ruhsat ve uygulama süreçlerinin tamamında profesyonel destek sunuyoruz.',
  },
  {
    icon: '🏢',
    title: 'Ofis Yapımı & Tadilatı',
    description:
      'Modern ve fonksiyonel ofis alanları tasarlıyor, sıfırdan yapım ve kapsamlı tadilat hizmetleri veriyoruz.',
  },
  {
    icon: '🏗',
    title: 'Depo & Endüstriyel Yapılar',
    description:
      'Depo, atölye ve endüstriyel tesisleriniz için dayanıklı, verimli ve bütçeye uygun çözümler üretiyoruz.',
  },
  {
    icon: '🔨',
    title: 'Tadilat & Renovasyon',
    description:
      'Konut, ofis ve ticari mekânlarda kapsamlı tadilat, onarım ve yenileme işlerinizi anahtar teslim gerçekleştiriyoruz.',
  },
  {
    icon: '🛋',
    title: 'İç Dekorasyon',
    description:
      'Mekânlarınızı estetik ve işlevsel bir şekilde tasarlıyor; mobilya seçimi, renk paleti ve aydınlatma planlamasıyla bütünlüklü çözümler sunuyoruz.',
  },
  {
    icon: '📐',
    title: 'Proje & Danışmanlık',
    description:
      'Yapı projelerinizde fizibilite, maliyet analizi ve süreç yönetimi konularında uzman danışmanlık hizmeti sağlıyoruz.',
  },
];

function MimarlikHizmetlerimiz() {
  const navigate = useNavigate();
  const sectionRefs = useRef([]);
  const [activeGallery, setActiveGallery] = useState(0);
  const galleryTrackRef = useRef(null);

  const nextGallery = useCallback(() => {
    setActiveGallery((prev) => (prev + 1) % galleryImages.length);
  }, []);

  const prevGallery = useCallback(() => {
    setActiveGallery((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  }, []);

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
          {services.map((service, i) => (
            <div
              className="mh__card"
              key={i}
              ref={addRef}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className="mh__card-icon">{service.icon}</div>
              <h3 className="mh__card-title">{service.title}</h3>
              <p className="mh__card-desc">{service.description}</p>
              <div className="mh__card-line" />
            </div>
          ))}
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
