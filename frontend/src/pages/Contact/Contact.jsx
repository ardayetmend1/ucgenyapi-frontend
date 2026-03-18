import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from '../../components/SEO/SEO';
import './Contact.css';
import { fetchProjects, submitContact } from '../../services/api';
import blokHavuz from '../../assets/images/blok-havuz.jpg';

function Contact() {
  const navigate = useNavigate();
  const [projectsList, setProjectsList] = useState([]);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    project: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProjects().then(setProjectsList);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await submitContact(form);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setForm({ name: '', phone: '', project: '', message: '' });
      }, 3000);
    } catch {
      setError('Form gönderilemedi. Lütfen tekrar deneyin.');
    }
  };

  return (
    <div className="contact">
      <SEO path="/iletisim" />
      <img className="contact__bg" src={blokHavuz} alt="" />
      <div className="contact__overlay" />

      {/* Back Button */}
      <button className="contact__back" onClick={() => navigate('/')}>
        <span aria-hidden="true">←</span> Ana Sayfa
      </button>

      {/* Card */}
      <div className="contact__card">
        <div className="contact__card-deco" />

        <div className="contact__header">
          <span className="contact__label">İletişim</span>
          <h1 className="contact__title">
            Bizimle <em>İletişime Geçin</em>
          </h1>
          <p className="contact__subtitle">
            Hayalinizdeki evi birlikte planlayalım. Formu doldurun, size en kısa sürede dönüş yapalım.
          </p>
        </div>

        {submitted ? (
          <div className="contact__success">
            <div className="contact__success-icon">✓</div>
            <h3 className="contact__success-title">Mesajınız Alındı</h3>
            <p className="contact__success-text">
              En kısa sürede sizinle iletişime geçeceğiz.
            </p>
          </div>
        ) : (
          <form className="contact__form" onSubmit={handleSubmit}>
            {error && <div className="contact__error">{error}</div>}

            <div className="contact__field">
              <label className="contact__field-label" htmlFor="name">
                Ad Soyad
              </label>
              <input
                className="contact__field-input"
                type="text"
                id="name"
                name="name"
                placeholder="Adınız ve soyadınız"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="contact__field">
              <label className="contact__field-label" htmlFor="phone">
                Telefon Numarası
              </label>
              <input
                className="contact__field-input"
                type="tel"
                id="phone"
                name="phone"
                placeholder="0 (5XX) XXX XX XX"
                value={form.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="contact__field">
              <label className="contact__field-label" htmlFor="project">
                İlgilendiğiniz Proje
              </label>
              <select
                className="contact__field-input contact__field-select"
                id="project"
                name="project"
                value={form.project}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Proje seçiniz
                </option>
                {projectsList.map((p) => (
                  <option key={p.slug} value={p.name}>
                    {p.name} — {p.location}
                  </option>
                ))}
              </select>
            </div>

            <div className="contact__field">
              <label className="contact__field-label" htmlFor="message">
                Açıklama
              </label>
              <textarea
                className="contact__field-input contact__field-textarea"
                id="message"
                name="message"
                placeholder="Mesajınızı yazın..."
                rows="4"
                value={form.message}
                onChange={handleChange}
              />
            </div>

            <button className="contact__submit" type="submit">
              Gönder
              <span className="contact__submit-arrow" aria-hidden="true">→</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Contact;
