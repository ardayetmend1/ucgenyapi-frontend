import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { resetPassword } from '../../services/api';
import './ResetPassword.css';

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const email = searchParams.get('email') || '';
  const token = searchParams.get('token') || '';

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (newPassword.length < 6) {
      setError('Şifre en az 6 karakter olmalıdır.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Şifreler eşleşmiyor.');
      return;
    }

    setLoading(true);
    try {
      await resetPassword(email, token, newPassword);
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!email || !token) {
    return (
      <div className="reset-page">
        <div className="reset-card">
          <h1 className="reset-card__title">Geçersiz Bağlantı</h1>
          <p className="reset-card__text">
            Bu şifre sıfırlama bağlantısı geçersiz veya süresi dolmuş.
          </p>
          <button className="reset-card__btn" onClick={() => navigate('/')}>
            Ana Sayfaya Dön
          </button>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="reset-page">
        <div className="reset-card">
          <h1 className="reset-card__title">Şifre Değiştirildi</h1>
          <p className="reset-card__text">
            Şifreniz başarıyla değiştirildi. Artık yeni şifrenizle giriş yapabilirsiniz.
          </p>
          <button className="reset-card__btn" onClick={() => navigate('/')}>
            Ana Sayfaya Dön
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="reset-page">
      <div className="reset-card">
        <h1 className="reset-card__title">Yeni Şifre Belirle</h1>
        <p className="reset-card__text">
          <strong>{email}</strong> hesabı için yeni şifrenizi girin.
        </p>

        <form className="reset-card__form" onSubmit={handleSubmit}>
          <div className="reset-card__field">
            <label>Yeni Şifre</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="En az 6 karakter"
              minLength={6}
              required
            />
          </div>

          <div className="reset-card__field">
            <label>Şifre Tekrar</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Şifrenizi tekrar girin"
              required
            />
          </div>

          {error && <p className="reset-card__error">{error}</p>}

          <button className="reset-card__btn" type="submit" disabled={loading}>
            {loading ? 'Değiştiriliyor...' : 'Şifreyi Değiştir'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
