import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import { useSiteContent } from '../../context/SiteContentContext';
import { fetchProjects } from '../../services/api';
import ucgenLogo from '../../../mimarlikgorseller/IMG_2158.svg';
import l1aImg from '../../../mimarlikgorseller/l1a (1).png';

function Footer() {
  const c = useSiteContent();
  const [projectsList, setProjectsList] = useState([]);

  useEffect(() => {
    fetchProjects().then(setProjectsList).catch(() => {});
  }, []);

  return (
    <footer className="footer">
      <div className="footer__glow" />

      <div className="footer__top">
        {/* Logo & Slogan */}
        <div className="footer__brand">
          <div className="footer__logo">
            <img src={ucgenLogo} alt="3Gen Yapı" className="footer__logo-img" />
          </div>
          <p className="footer__slogan">
            {c('footer_slogan', 'Modern mimariyi doğanın huzuruyla birleştiriyoruz. 25 yılı aşkın tecrübemizle yaşam alanları inşa ediyoruz.')}
          </p>
          <div className="footer__socials">
            <a href={c('social_instagram', 'https://instagram.com')} target="_blank" rel="noopener noreferrer" className="footer__social" aria-label="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a href={c('social_youtube', 'https://youtube.com')} target="_blank" rel="noopener noreferrer" className="footer__social" aria-label="YouTube">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.13C5.12 19.56 12 19.56 12 19.56s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.43z" />
                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
              </svg>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer__col">
          <h4 className="footer__col-title">Hızlı Erişim</h4>
          <ul className="footer__links">
            <li><a href="#hizmetlerimiz">Hizmetlerimiz</a></li>
            <li><a href="#hakkimizda">Hakkımızda</a></li>
            <li><Link to="/insaat-hizmetlerimiz">İnşaat Hizmetlerimiz</Link></li>
            <li><Link to="/iletisim">İletişim</Link></li>
            <li><Link to="/iletisim">Randevu Al</Link></li>
          </ul>
        </div>

        {/* Projects */}
        <div className="footer__col">
          <h4 className="footer__col-title">Projelerimiz</h4>
          <ul className="footer__links">
            {projectsList.length > 0 ? (
              projectsList.map((p) => (
                <li key={p.slug}><Link to="/insaat-hizmetlerimiz">{p.name}</Link></li>
              ))
            ) : (
              <>
                <li><Link to="/insaat-hizmetlerimiz">Üçgen Yaşam Konutları</Link></li>
                <li><Link to="/insaat-hizmetlerimiz">Üçgen Yaşam Konutları 2</Link></li>
              </>
            )}
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer__col">
          <h4 className="footer__col-title">İletişim</h4>
          <ul className="footer__contact">
            <li>
              <span className="footer__contact-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </span>
              <span>{c('footer_address', 'İstanbul / Pendik')}</span>
            </li>
            <li>
              <span className="footer__contact-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </span>
              <a href={`tel:${c('footer_phone', '0  532 313 5289').replace(/\s/g, '')}`}>
                {c('footer_phone', '0  532 313 5289')}
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer__bottom">
        <div className="footer__bottom-line" />
        <div className="footer__bottom-content">
          <p className="footer__copyright">
            &copy; {new Date().getFullYear()} {c('footer_copyright', 'Üçgen Yapı. Tüm hakları saklıdır.')}
          </p>
          <p className="footer__credits">
            {c('footer_credits', 'Kalite ve güvenin adresi.')}
          </p>
        </div>
      </div>

      {/* L1A Badge */}
      <div className="footer__l1a">
        <img src={l1aImg} alt="L1A" className="footer__l1a-img" />
      </div>
    </footer>
  );
}

export default Footer;
