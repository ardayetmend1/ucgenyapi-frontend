import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { registerUser, loginUser } from '../../services/api';
import './AuthModal.css';

function AuthModal({ isOpen, onClose }) {
  const { login } = useAuth();
  const [tab, setTab] = useState('login');
  const [form, setForm] = useState({ email: '', password: '', firstName: '', lastName: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (tab === 'register' && !agreed) {
      setError('Kullanım koşullarını kabul etmelisiniz.');
      return;
    }

    setLoading(true);
    try {
      let result;
      if (tab === 'login') {
        result = await loginUser({ email: form.email, password: form.password });
      } else {
        result = await registerUser(form);
      }
      login(result.token, result.user);
      onClose();
      setForm({ email: '', password: '', firstName: '', lastName: '' });
      setTab('login');
      setAgreed(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const switchTab = (newTab) => {
    setTab(newTab);
    setError('');
    setForm({ email: '', password: '', firstName: '', lastName: '' });
    setAgreed(false);
  };

  return (
    <div className="auth-overlay" onClick={onClose}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <button className="auth-modal__close" onClick={onClose} aria-label="Kapat">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <div className="auth-modal__header">
          <h2 className="auth-modal__title">
            {tab === 'login' ? 'Giriş Yap' : 'Üye Ol'}
          </h2>
          <div className="auth-modal__tabs">
            <button
              className={`auth-modal__tab ${tab === 'login' ? 'auth-modal__tab--active' : ''}`}
              onClick={() => switchTab('login')}
            >
              Giriş
            </button>
            <button
              className={`auth-modal__tab ${tab === 'register' ? 'auth-modal__tab--active' : ''}`}
              onClick={() => switchTab('register')}
            >
              Kayıt
            </button>
          </div>
        </div>

        <form className="auth-modal__form" onSubmit={handleSubmit}>
          {tab === 'register' && (
            <div className="auth-modal__row">
              <div className="auth-modal__field">
                <label>Ad</label>
                <input
                  type="text"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  placeholder="Adınız"
                  required
                />
              </div>
              <div className="auth-modal__field">
                <label>Soyad</label>
                <input
                  type="text"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  placeholder="Soyadınız"
                  required
                />
              </div>
            </div>
          )}

          <div className="auth-modal__field">
            <label>E-posta</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="ornek@email.com"
              required
            />
          </div>

          <div className="auth-modal__field">
            <label>Şifre</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="En az 6 karakter"
              minLength={6}
              required
            />
          </div>

          {tab === 'register' && (
            <label className="auth-modal__checkbox">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
              />
              <span>Kullanım koşullarını ve gizlilik politikasını kabul ediyorum.</span>
            </label>
          )}

          {error && <p className="auth-modal__error">{error}</p>}

          <button className="auth-modal__submit" type="submit" disabled={loading}>
            {loading ? 'Yükleniyor...' : tab === 'login' ? 'Giriş Yap' : 'Üye Ol'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AuthModal;
