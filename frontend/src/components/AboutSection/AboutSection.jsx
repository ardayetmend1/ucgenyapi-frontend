import { useState, useEffect, useRef } from 'react';
import './AboutSection.css';
import { useSiteContent } from '../../context/SiteContentContext';
import { fetchAboutImages } from '../../services/api';

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

function AboutSection() {
  const observe = useScrollReveal();
  const [lightbox, setLightbox] = useState(null);
  const [images, setImages] = useState(fallbackImages);
  const c = useSiteContent();

  useEffect(() => {
    fetchAboutImages()
      .then((data) => {
        if (data.length > 0) {
          setImages(data.map((img) => ({ src: img.image, alt: img.alt })));
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section className="about" id="hakkimizda">
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
        <h2 className="about__heading" ref={observe}>
          {c('about_heading', '25 Yıllık Güven ve Kalite')}
        </h2>
        <span className="about__heading-line" ref={observe} />
      </div>

      {/* ── Main Content ── */}
      <div className="about__content">
        {/* Left: Image Composition */}
        <div className="about__visuals">
          {images.slice(0, 3).map((img, i) => (
            <div
              key={i}
              className={`about__image ${imageClasses[i] || ''}`}
              ref={observe}
              onClick={() => setLightbox(i)}
            >
              <img src={img.src} alt={img.alt} />
              <div className="about__image-zoom" aria-hidden="true">+</div>
            </div>
          ))}
          <div className="about__badge" ref={observe}>
            <span className="about__badge-number">{c('about_badge_number', '25')}</span>
            <span className="about__badge-text">{c('about_badge_text', 'Yıllık Tecrübe')}</span>
          </div>
        </div>

        {/* Right: Text Content */}
        <div className="about__text">
          <blockquote className="about__quote" ref={observe}>
            "{c('about_quote', 'Daha iyi bir dünya, daha yaşanılır bir çevre oluşturma yolculuğumuzda insana dokunan yapılar tasarlıyoruz.')}"
          </blockquote>

          <p className="about__paragraph" ref={observe}>
            {c('about_paragraph_1', 'Üçgen Yapı olarak 25 yılı aşkın tecrübemizle Ankara\'da inşaat sektörünün öncü firmalarından biri olmanın gururunu taşıyoruz. Geçmiş ve kültürel değerlerden ilham alarak, modern mimariyi doğanın huzuruyla birleştiren yaşam alanları inşa ediyoruz.')}
          </p>

          <p className="about__paragraph" ref={observe}>
            {c('about_paragraph_2', '300\'den fazla teslim edilmiş daire, 25\'in üzerinde tamamlanmış proje ve her biri özenle tasarlanmış sosyal tesislerimizle, sadece bina değil — yaşam inşa ediyoruz. Havuzundan fitness merkezine, çocuk oyun alanlarından peyzaj düzenlemelerine kadar her detayda kaliteyi hissedebilirsiniz.')}
          </p>

          {/* Value Pillars */}
          <div className="about__pillars" ref={observe}>
            <div className="about__pillar">
              <div className="about__pillar-icon" aria-hidden="true" />
              <div className="about__pillar-title">{c('about_pillar_1_title', 'Modern Mimari')}</div>
              <div className="about__pillar-desc">
                {c('about_pillar_1_desc', 'Çağdaş tasarım anlayışıyla işlevsel ve estetik yapılar')}
              </div>
            </div>
            <div className="about__pillar">
              <div className="about__pillar-icon" aria-hidden="true" />
              <div className="about__pillar-title">{c('about_pillar_2_title', 'Kaliteli Malzeme')}</div>
              <div className="about__pillar-desc">
                {c('about_pillar_2_desc', 'A sınıfı malzeme ve son teknoloji yapım yöntemleri')}
              </div>
            </div>
            <div className="about__pillar">
              <div className="about__pillar-icon" aria-hidden="true" />
              <div className="about__pillar-title">{c('about_pillar_3_title', 'Zamanında Teslim')}</div>
              <div className="about__pillar-desc">
                {c('about_pillar_3_desc', 'Taahhüt edilen sürede eksiksiz proje teslimatı')}
              </div>
            </div>
            <div className="about__pillar">
              <div className="about__pillar-icon" aria-hidden="true" />
              <div className="about__pillar-title">{c('about_pillar_4_title', 'Yaşam Odaklı')}</div>
              <div className="about__pillar-desc">
                {c('about_pillar_4_desc', 'İnsan merkezli, sosyal alanlarla zenginleştirilmiş projeler')}
              </div>
            </div>
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
