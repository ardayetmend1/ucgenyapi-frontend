import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import './HeroSection.css';

import blokHavuz from '../../assets/images/blok-havuz.jpg';
import blokDetail from '../../assets/images/blok-detail.jpg';
import arazi from '../../assets/images/arazi.jpg';
import salon from '../../assets/images/salon.jpg';
import sosyalTesis from '../../assets/images/sosyal-tesis.jpg';

const slides = [
  { src: blokHavuz, alt: 'Üçgen Yapı — Havuz ve Yaşam Alanı' },
  { src: arazi, alt: 'Üçgen Yapı — Proje Kuşbakışı' },
  { src: blokDetail, alt: 'Üçgen Yapı — Bina Detay' },
  { src: salon, alt: 'Üçgen Yapı — Modern Salon' },
  { src: sosyalTesis, alt: 'Üçgen Yapı — Sosyal Tesis' },
];

function HeroSection() {
  const [activeSlide, setActiveSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section className="hero">
      {/* ── Background Slider ── */}
      <div className="hero__slider">
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`hero__slide ${i === activeSlide ? 'hero__slide--active' : ''}`}
          >
            <img src={slide.src} alt={slide.alt} loading={i === 0 ? 'eager' : 'lazy'} />
          </div>
        ))}
      </div>

      {/* ── Overlays ── */}
      <div className="hero__overlay" />
      <div className="hero__grain" />

      {/* ── Decorative Elements ── */}
      <div className="hero__triangle hero__triangle--main" />
      <div className="hero__triangle hero__triangle--accent" />
      <div className="hero__triangle hero__triangle--accent2" />
      <div className="hero__line hero__line--top" />
      <div className="hero__line hero__line--left" />

      {/* ── Navigation ── */}
      <nav className="hero__nav">
        <div className="hero__logo">
          <div className="hero__logo-icon" aria-hidden="true" />
          <div className="hero__logo-text">
            <span>Üçgen</span> Yapı
          </div>
        </div>

        <ul className="hero__nav-links">
          <li><a href="#projeler">Projeler</a></li>
          <li><a href="#hakkimizda">Hakkımızda</a></li>
          <li><a href="#galeri">Galeri</a></li>
          <li><Link to="/iletisim">İletişim</Link></li>
        </ul>

        <Link to="/iletisim" className="hero__nav-cta">Randevu Al</Link>
      </nav>

      {/* ── Main Content ── */}
      <div className="hero__content">
        <p className="hero__subtitle">Mimari Mükemmellik · 2024</p>

        <h1 className="hero__title">
          Yaşamın Yeni
          <span className="hero__title-bold">
            <em>Geometrisi</em>
          </span>
        </h1>

        <p className="hero__description">
          Üçgen Yapı olarak, modern mimariyi doğanın huzuruyla birleştiriyoruz.
          Havuzdan sosyal tesislere, her detayda kaliteyi ve konforu
          hissedebileceğiniz yaşam alanları inşa ediyoruz.
        </p>

        <div className="hero__actions">
          <a href="#projeler" className="hero__btn hero__btn--primary">
            Projeyi Keşfet
            <span className="hero__btn-arrow" aria-hidden="true">→</span>
          </a>
          <Link to="/iletisim" className="hero__btn hero__btn--secondary">
            Bize Ulaşın
          </Link>
        </div>
      </div>

      {/* ── Slide Indicators ── */}
      <div className="hero__indicators">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`hero__indicator ${i === activeSlide ? 'hero__indicator--active' : ''}`}
            onClick={() => setActiveSlide(i)}
            aria-label={`Görsel ${i + 1}`}
          />
        ))}
      </div>

      {/* ── Scroll Indicator ── */}
      <div className="hero__scroll">
        <div className="hero__scroll-line" />
        <span className="hero__scroll-text">Keşfet</span>
      </div>

      {/* ── Stats Bar ── */}
      <div className="hero__stats">
        <div className="hero__stat">
          <span className="hero__stat-number">4</span>
          <span className="hero__stat-label">Konut Bloğu</span>
        </div>
        <div className="hero__stat">
          <span className="hero__stat-number">120+</span>
          <span className="hero__stat-label">Modern Daire</span>
        </div>
        <div className="hero__stat">
          <span className="hero__stat-number">5★</span>
          <span className="hero__stat-label">Sosyal Tesis</span>
        </div>
        <div className="hero__stat">
          <span className="hero__stat-number">Hemen</span>
          <span className="hero__stat-label">Teslim</span>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
