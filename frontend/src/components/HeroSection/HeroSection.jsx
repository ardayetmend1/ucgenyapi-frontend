import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import './HeroSection.css';
import { useSiteContent, useSiteContentReload } from '../../context/SiteContentContext';
import { useAuth } from '../../context/AuthContext';
import { fetchHeroSlides } from '../../services/api';
import AuthModal from '../AuthModal/AuthModal';
import { Editable } from '../EditPopup/EditPopup';
import { updateHeroSlide, deleteHeroSlide, createHeroSlide, updateSiteContent } from '../../services/adminApi';

import blokHavuz from '../../assets/images/blok-havuz.jpg';
import blokDetail from '../../assets/images/blok-detail.jpg';
import arazi from '../../assets/images/arazi.jpg';
import salon from '../../assets/images/salon.jpg';
import sosyalTesis from '../../assets/images/sosyal-tesis.jpg';
import ucgenLogo from '../../assets/images/ucgenlogom.jpg';

const fallbackSlides = [
  { src: blokHavuz, alt: 'Üçgen Yapı — Havuz ve Yaşam Alanı' },
  { src: arazi, alt: 'Üçgen Yapı — Proje Kuşbakışı' },
  { src: blokDetail, alt: 'Üçgen Yapı — Bina Detay' },
  { src: salon, alt: 'Üçgen Yapı — Modern Salon' },
  { src: sosyalTesis, alt: 'Üçgen Yapı — Sosyal Tesis' },
];

const slideFields = [
  { key: 'image', label: 'Görsel URL', type: 'text' },
  { key: 'alt', label: 'Alt Metin', type: 'text' },
];

function HeroSection() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [slides, setSlides] = useState(fallbackSlides);
  const [dbSlides, setDbSlides] = useState([]);
  const [authOpen, setAuthOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const c = useSiteContent();
  const reloadContent = useSiteContentReload();
  const { user, logout } = useAuth();
  const isAdmin = user?.role === 'Admin';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const loadSlides = () => {
    fetchHeroSlides()
      .then((data) => {
        if (data.length > 0) {
          setDbSlides(data);
          setSlides(data.map((s) => ({ src: s.image, alt: s.alt })));
          setActiveSlide(0);
        }
      })
      .catch(() => {});
  };

  useEffect(() => { loadSlides(); }, []);

  const nextSlide = useCallback(() => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const handleUpdateSlide = async (dbSlide, form) => {
    await updateHeroSlide(dbSlide.id, form);
    loadSlides();
  };

  const handleDeleteSlide = async (dbSlide) => {
    if (!confirm('Bu slaytı silmek istediğinize emin misiniz?')) return;
    await deleteHeroSlide(dbSlide.id);
    loadSlides();
  };

  const handleUpdateContent = async (key, value) => {
    await updateSiteContent({ [key]: value });
    reloadContent();
  };

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
      <nav className={`hero__nav ${scrolled ? 'hero__nav--scrolled' : ''}`}>
        <div className="hero__logo">
          <img className="hero__logo-img" src={ucgenLogo} alt="Üçgen Yapı" />
          <div className="hero__logo-text">
            <span className="hero__logo-green">Üçgen</span> <span className="hero__logo-blue">Yapı</span>
          </div>
        </div>

        <ul className="hero__nav-links">
          <li><a href="#projeler">Projeler</a></li>
          <li><a href="#hakkimizda">Hakkımızda</a></li>
          <li><Link to="/mimarlik-hizmetlerimiz">Mimarlık Hizmetlerimiz</Link></li>
          <li><Link to="/iletisim">İletişim</Link></li>
        </ul>

        <div className="hero__nav-right">
          {user ? (
            <div className="hero__user-menu">
              <button className="hero__user-btn hero__user-btn--logged" onClick={() => setUserMenuOpen(!userMenuOpen)} title={user.firstName}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </button>
              {userMenuOpen && <div className="hero__user-dropdown hero__user-dropdown--open">
                <span className="hero__user-name">{user.firstName} {user.lastName}</span>
                <span className="hero__user-role">{user.role === 'Admin' ? 'Admin' : 'Kullanıcı'}</span>
                {user.role === "Admin" && <Link to="/admin" className="hero__user-admin">Yönetim Paneli</Link>}
                <button className="hero__user-logout" onClick={() => { logout(); setUserMenuOpen(false); }}>Çıkış Yap</button>
              </div>}
            </div>
          ) : (
            <button className="hero__user-btn" onClick={() => setAuthOpen(true)} title="Giriş Yap">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </button>
          )}
          <Link to="/iletisim" className="hero__nav-cta">Randevu Al</Link>
        </div>
      </nav>

      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />

      {/* ── Slide Edit (admin: edit current slide) ── */}
      {isAdmin && dbSlides.length > 0 && dbSlides[activeSlide] && (
        <div style={{ position: 'absolute', top: 100, right: 20, zIndex: 60 }}>
          <Editable
            isAdmin={isAdmin}
            fields={slideFields}
            values={{ image: dbSlides[activeSlide].image, alt: dbSlides[activeSlide].alt }}
            onSave={(form) => handleUpdateSlide(dbSlides[activeSlide], form)}
            onDelete={() => handleDeleteSlide(dbSlides[activeSlide])}
          >
            <button className="admin-edit-btn" style={{ position: 'relative' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
              <span>Slayt Düzenle</span>
            </button>
          </Editable>
        </div>
      )}

      {/* ── Main Content ── */}
      <div className="hero__content">
        <Editable
          isAdmin={isAdmin}
          fields={[{ key: 'hero_subtitle', label: 'Alt Başlık', type: 'text' }]}
          values={{ hero_subtitle: c('hero_subtitle', 'İnşaat · Mimarlık · Tadilat') }}
          onSave={(form) => handleUpdateContent('hero_subtitle', form.hero_subtitle)}
        >
          <p className="hero__subtitle">{c('hero_subtitle', 'İnşaat · Mimarlık · Tadilat')}</p>
        </Editable>

        <Editable
          isAdmin={isAdmin}
          fields={[
            { key: 'hero_title_1', label: 'Başlık Satır 1', type: 'text' },
            { key: 'hero_title_2', label: 'Başlık Satır 2', type: 'text' },
          ]}
          values={{
            hero_title_1: c('hero_title_1', 'Anahtar Teslim'),
            hero_title_2: c('hero_title_2', 'Çözümler'),
          }}
          onSave={async (form) => { await updateSiteContent(form); reloadContent(); }}
        >
          <h1 className="hero__title">
            {c('hero_title_1', 'Anahtar Teslim')}
            <span className="hero__title-bold">
              <em>{c('hero_title_2', 'Çözümler')}</em>
            </span>
          </h1>
        </Editable>

        <Editable
          isAdmin={isAdmin}
          fields={[{ key: 'hero_description', label: 'Açıklama', type: 'textarea' }]}
          values={{ hero_description: c('hero_description', '') }}
          onSave={(form) => handleUpdateContent('hero_description', form.hero_description)}
        >
          <p className="hero__description">
            {c('hero_description', 'Üçgen Yapı olarak anahtar teslim inşaat projelerinden iç mimarlık, tadilat ve dekorasyon hizmetlerine kadar geniş bir yelpazede profesyonel çözümler sunuyoruz.')}
          </p>
        </Editable>

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

    </section>
  );
}

export default HeroSection;
