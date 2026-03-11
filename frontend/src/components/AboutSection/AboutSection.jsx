import { useState, useEffect, useRef } from 'react';
import './AboutSection.css';
import { useSiteContent, useSiteContentReload } from '../../context/SiteContentContext';
import { fetchAboutImages } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { Editable } from '../EditPopup/EditPopup';
import { updateAboutImage, deleteAboutImage, updateSiteContent } from '../../services/adminApi';

import blokDetail from '../../assets/images/blok-detail.jpg';
import sosyalTesis from '../../assets/images/sosyal-tesis.jpg';
import mutfak from '../../assets/images/mutfak.jpg';

function useScrollReveal() {
  const refs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    refs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const addRef = (el) => {
    if (el && !refs.current.includes(el)) {
      refs.current.push(el);
    }
  };

  return addRef;
}

const fallbackImages = [
  { src: blokDetail, alt: 'Üçgen Yapı — Modern Bina Cephesi' },
  { src: sosyalTesis, alt: 'Üçgen Yapı — Sosyal Tesis Alanı' },
  { src: mutfak, alt: 'Üçgen Yapı — Modern Mutfak Tasarımı' },
];

const imageClasses = ['about__image--main', 'about__image--secondary', 'about__image--accent'];

const imgFields = [
  { key: 'image', label: 'Görsel URL', type: 'text' },
  { key: 'alt', label: 'Alt Metin', type: 'text' },
];

function AboutSection() {
  const observe = useScrollReveal();
  const [lightbox, setLightbox] = useState(null);
  const [images, setImages] = useState(fallbackImages);
  const [dbImages, setDbImages] = useState([]);
  const c = useSiteContent();
  const reloadContent = useSiteContentReload();
  const { user } = useAuth();
  const isAdmin = user?.role === 'Admin';

  const loadImages = () => {
    fetchAboutImages()
      .then((data) => {
        if (data.length > 0) {
          setDbImages(data);
          setImages(data.map((img) => ({ src: img.image, alt: img.alt })));
        }
      })
      .catch(() => {});
  };

  useEffect(() => { loadImages(); }, []);

  const handleUpdateImage = async (dbImg, form) => {
    await updateAboutImage(dbImg.id, form);
    loadImages();
  };

  const handleDeleteImage = async (dbImg) => {
    if (!confirm('Bu görseli silmek istediğinize emin misiniz?')) return;
    await deleteAboutImage(dbImg.id);
    loadImages();
  };

  const handleUpdateContent = async (key, value) => {
    await updateSiteContent({ [key]: value });
    reloadContent();
  };

  // Fallback'li değer döndürür - hem ekranda hem popup'ta aynı değeri gösterir
  const d = (key) => {
    const val = c(key, '');
    if (val) return val;
    const defaults = {
      about_heading: 'Güven, Kalite ve Estetik',
      about_quote: 'Her projede kaliteyi, güveni ve estetik mükemmelliği bir arada sunuyoruz.',
      about_paragraph_1: 'Üçgen Yapı olarak İstanbul merkezli inşaat ve mimarlık hizmetleri sunuyoruz. Konut projelerinden ofis, depo ve ticari alanlara kadar geniş bir yelpazede anahtar teslim çözümler üretiyoruz. İç mimarlık, tadilat ve dekorasyon hizmetlerimizle projelerinizi baştan sona yönetiyoruz.',
      about_paragraph_2: 'Müşterilerimize komple tadilat, kısmi yenileme, ofis tadilatı ve depo dönüşümü gibi hizmetler sunarak her ölçekteki projeye profesyonel çözümler getiriyoruz. Mimarlık ve iç mimarlık ekibimizle tasarımdan uygulamaya kadar tüm süreçlerde yanınızdayız.',
      about_pillar_1_title: 'İç Mimarlık Hizmetleri',
      about_pillar_1_desc: 'Profesyonel iç mimarlık ve dekorasyon çözümleri',
      about_pillar_2_title: 'Kaliteli Malzeme',
      about_pillar_2_desc: 'A sınıfı malzeme ve son teknoloji yapım yöntemleri',
      about_pillar_3_title: 'Zamanında Teslim',
      about_pillar_3_desc: 'Taahhüt edilen sürede eksiksiz proje teslimatı',
      about_pillar_4_title: 'Tadilat Hizmetleri',
      about_pillar_4_desc: 'Komple ve kısmi tadilat, yenileme ve restorasyon işleri',
    };
    return defaults[key] || '';
  };

  return (
    <section className="about" id="hakkimizda" style={{ position: "relative" }}>
      {/* ── Background Decorations ── */}
      <div className="about__bg-triangle" />
      <div className="about__bg-triangle about__bg-triangle--2" />
      <div className="about__glow-line" />
      <div className="about__glow-orb" />
      <div className="about__particle about__particle--1" />
      <div className="about__particle about__particle--2" />
      <div className="about__particle about__particle--3" />
      <div className="about__particle about__particle--4" />
      <div className="about__particle about__particle--5" />

      {/* ── Section Header ── */}
      <div className="about__header">
        <span className="about__label" ref={observe}>Hakkımızda</span>
        <Editable
          isAdmin={isAdmin}
          fields={[{ key: 'about_heading', label: 'Başlık', type: 'text' }]}
          values={{ about_heading: d('about_heading') }}
          onSave={(form) => handleUpdateContent('about_heading', form.about_heading)}
        >
          <h2 className="about__heading visible">
            {d('about_heading')}
          </h2>
        </Editable>
        <span className="about__heading-line" ref={observe} />
      </div>

      {/* ── Main Content ── */}
      <div className="about__content">
        {/* Left: Image Composition */}
        <div className="about__visuals">
          {images.slice(0, 3).map((img, i) => {
            const dbImg = dbImages[i];
            const imageContent = (
              <div
                className={`about__image ${imageClasses[i] || ''}`}
                ref={observe}
                onClick={() => !isAdmin && setLightbox(i)}
              >
                <img src={img.src} alt={img.alt} />
                {isAdmin ? (
                  <div className="about__image-edit-hint">Düzenle</div>
                ) : (
                  <div className="about__image-zoom" aria-hidden="true">+</div>
                )}
              </div>
            );

            if (isAdmin && dbImg) {
              return (
                <Editable
                  key={dbImg.id}
                  isAdmin={isAdmin}
                  fields={imgFields}
                  values={{ image: dbImg.image, alt: dbImg.alt }}
                  onSave={(form) => handleUpdateImage(dbImg, form)}
                  onDelete={() => handleDeleteImage(dbImg)}
                  className="about__editable-image"
                >
                  {imageContent}
                </Editable>
              );
            }
            return <div key={i}>{imageContent}</div>;
          })}
          <div className="about__badge" ref={observe}>
            <span className="about__badge-number">{c('about_badge_number', 'A+')}</span>
            <span className="about__badge-text">{c('about_badge_text', 'Kalite Güvencesi')}</span>
          </div>
        </div>

        {/* Right: Text Content */}
        <div className="about__text">
          <Editable
            isAdmin={isAdmin}
            fields={[{ key: 'about_quote', label: 'Alıntı', type: 'textarea' }]}
            values={{ about_quote: d('about_quote') }}
            onSave={(form) => handleUpdateContent('about_quote', form.about_quote)}
          >
            <blockquote className="about__quote visible">
              "{d('about_quote')}"
            </blockquote>
          </Editable>

          <Editable
            isAdmin={isAdmin}
            fields={[{ key: 'about_paragraph_1', label: 'Paragraf 1', type: 'textarea' }]}
            values={{ about_paragraph_1: d('about_paragraph_1') }}
            onSave={(form) => handleUpdateContent('about_paragraph_1', form.about_paragraph_1)}
          >
            <p className="about__paragraph visible">
              {d('about_paragraph_1')}
            </p>
          </Editable>

          <Editable
            isAdmin={isAdmin}
            fields={[{ key: 'about_paragraph_2', label: 'Paragraf 2', type: 'textarea' }]}
            values={{ about_paragraph_2: d('about_paragraph_2') }}
            onSave={(form) => handleUpdateContent('about_paragraph_2', form.about_paragraph_2)}
          >
            <p className="about__paragraph visible">
              {d('about_paragraph_2')}
            </p>
          </Editable>

          {/* Value Pillars */}
          <div className="about__pillars visible">
            {[1, 2, 3, 4].map((n) => (
              <Editable
                key={n}
                isAdmin={isAdmin}
                fields={[
                  { key: `about_pillar_${n}_title`, label: 'Başlık', type: 'text' },
                  { key: `about_pillar_${n}_desc`, label: 'Açıklama', type: 'textarea' },
                ]}
                values={{
                  [`about_pillar_${n}_title`]: d(`about_pillar_${n}_title`),
                  [`about_pillar_${n}_desc`]: d(`about_pillar_${n}_desc`),
                }}
                onSave={async (form) => {
                  await updateSiteContent(form);
                  reloadContent();
                }}
              >
                <div className="about__pillar">
                  <div className="about__pillar-icon" aria-hidden="true" />
                  <div className="about__pillar-title">{d(`about_pillar_${n}_title`)}</div>
                  <div className="about__pillar-desc">{d(`about_pillar_${n}_desc`)}</div>
                </div>
              </Editable>
            ))}
          </div>
        </div>
      </div>

      {/* ── Process Timeline ── */}
      <div className="about__process">
        <div className="about__process-title" ref={observe}>
          Proje Sürecimiz
        </div>
        <div className="about__timeline">
          {[
            { num: '01', label: 'Fikir & Başlangıç', desc: 'Arazi analizi ve konsept geliştirme' },
            { num: '02', label: 'Plan & Tasarım', desc: 'Mimari proje ve mühendislik çalışmaları' },
            { num: '03', label: 'Yapım & Montaj', desc: 'Kalite kontrolü eşliğinde inşaat süreci' },
            { num: '04', label: 'Proje Teslimatı', desc: 'Detaylı kontrol ve anahtar teslim' },
            { num: '05', label: 'Müşteri Memnuniyeti', desc: 'Satış sonrası destek ve garanti' },
          ].map((step) => (
            <div className="about__step" key={step.num} ref={observe}>
              <span className="about__step-number">{step.num}</span>
              <div className="about__step-dot" />
              <span className="about__step-label">{step.label}</span>
              <span className="about__step-desc">{step.desc}</span>
            </div>
          ))}
        </div>
      </div>
      {/* ── Lightbox ── */}
      {lightbox !== null && (
        <div className="about__lightbox" onClick={() => setLightbox(null)}>
          <button
            className="about__lightbox-close"
            onClick={() => setLightbox(null)}
            aria-label="Kapat"
          >
            ×
          </button>
          <button
            className="about__lightbox-arrow about__lightbox-arrow--prev"
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((lightbox - 1 + images.length) % images.length);
            }}
            aria-label="Önceki"
          >
            ‹
          </button>
          <img
            className="about__lightbox-img"
            src={images[lightbox].src}
            alt={images[lightbox].alt}
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="about__lightbox-arrow about__lightbox-arrow--next"
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((lightbox + 1) % images.length);
            }}
            aria-label="Sonraki"
          >
            ›
          </button>
          <div className="about__lightbox-counter">
            {lightbox + 1} / {images.length}
          </div>
        </div>
      )}
    </section>
  );
}

export default AboutSection;
