const API_URL = import.meta.env.VITE_API_URL || 'https://localhost:7109/api';

export async function fetchProjects() {
  const res = await fetch(`${API_URL}/projects/`);
  if (!res.ok) throw new Error('Projeler yüklenemedi');
  return res.json();
}

export async function fetchProject(slug) {
  const res = await fetch(`${API_URL}/projects/${slug}/`);
  if (!res.ok) throw new Error('Proje bulunamadı');
  return res.json();
}

export async function submitContact(data) {
  const res = await fetch(`${API_URL}/contact/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Form gönderilemedi');
  return res.json();
}

export async function fetchSiteContent() {
  const res = await fetch(`${API_URL}/site-content/`);
  if (!res.ok) throw new Error('Site içerikleri yüklenemedi');
  return res.json();
}

export async function fetchHeroSlides() {
  const res = await fetch(`${API_URL}/hero-slides/`);
  if (!res.ok) throw new Error('Hero slaytları yüklenemedi');
  return res.json();
}

export async function fetchAboutImages() {
  const res = await fetch(`${API_URL}/about-images/`);
  if (!res.ok) throw new Error('Hakkımızda görselleri yüklenemedi');
  return res.json();
}

export async function fetchReferences() {
  const res = await fetch(`${API_URL}/references/`);
  if (!res.ok) throw new Error('Referanslar yüklenemedi');
  return res.json();
}

export async function fetchArchitectureGalleryImages() {
  const res = await fetch(`${API_URL}/architecture-gallery-images/`);
  if (!res.ok) throw new Error('Mimarlık görselleri yüklenemedi');
  return res.json();
}

export async function fetchArchitectureServices() {
  const res = await fetch(`${API_URL}/architecture-services/`);
  if (!res.ok) throw new Error('Mimarlık hizmetleri yüklenemedi');
  return res.json();
}

// ── Auth ──
export async function registerUser(data) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.errors?.join(', ') || 'Kayıt başarısız');
  return json;
}

export async function loginUser(data) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || 'Giriş başarısız');
  return json;
}

export async function fetchMe(token) {
  const res = await fetch(`${API_URL}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Oturum doğrulanamadı');
  return res.json();
}
