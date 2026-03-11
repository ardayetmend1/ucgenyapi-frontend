const API_URL = import.meta.env.VITE_API_URL || 'https://localhost:7109/api';

function authHeaders() {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
}

async function request(url, options = {}) {
  const res = await fetch(url, { ...options, headers: authHeaders() });
  if (res.status === 401) throw new Error('Oturum süresi dolmuş. Tekrar giriş yapın.');
  if (res.status === 403) throw new Error('Bu işlem için yetkiniz yok.');
  if (!res.ok) throw new Error('İşlem başarısız.');
  if (res.status === 200) {
    const text = await res.text();
    return text ? JSON.parse(text) : null;
  }
  return null;
}

// ── File Upload ──
export const uploadFile = async (file) => {
  const token = localStorage.getItem('token');
  const formData = new FormData();
  formData.append('file', file);
  const res = await fetch(`${API_URL}/upload`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
  if (!res.ok) throw new Error('Yükleme başarısız.');
  return res.json();
};
// ── Site Content ──
export const getSiteContent = () => request(`${API_URL}/site-content`);
export const updateSiteContent = (data) => request(`${API_URL}/site-content`, { method: 'PUT', body: JSON.stringify(data) });

// ── Hero Slides ──
export const getHeroSlides = () => request(`${API_URL}/hero-slides/admin/all`);
export const createHeroSlide = (data) => request(`${API_URL}/hero-slides`, { method: 'POST', body: JSON.stringify(data) });
export const updateHeroSlide = (id, data) => request(`${API_URL}/hero-slides/${id}`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteHeroSlide = (id) => request(`${API_URL}/hero-slides/${id}`, { method: 'DELETE' });

// ── About Images ──
export const getAboutImages = () => request(`${API_URL}/about-images/admin/all`);
export const createAboutImage = (data) => request(`${API_URL}/about-images`, { method: 'POST', body: JSON.stringify(data) });
export const updateAboutImage = (id, data) => request(`${API_URL}/about-images/${id}`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteAboutImage = (id) => request(`${API_URL}/about-images/${id}`, { method: 'DELETE' });

// ── References ──
export const getReferences = () => request(`${API_URL}/references/admin/all`);
export const createReference = (data) => request(`${API_URL}/references`, { method: 'POST', body: JSON.stringify(data) });
export const updateReference = (id, data) => request(`${API_URL}/references/${id}`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteReference = (id) => request(`${API_URL}/references/${id}`, { method: 'DELETE' });

// ── Architecture Gallery ──
export const getArchGallery = () => request(`${API_URL}/architecture-gallery-images/admin/all`);
export const createArchGallery = (data) => request(`${API_URL}/architecture-gallery-images`, { method: 'POST', body: JSON.stringify(data) });
export const updateArchGallery = (id, data) => request(`${API_URL}/architecture-gallery-images/${id}`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteArchGallery = (id) => request(`${API_URL}/architecture-gallery-images/${id}`, { method: 'DELETE' });

// ── Architecture Services ──
export const getArchServices = () => request(`${API_URL}/architecture-services/admin/all`);
export const createArchService = (data) => request(`${API_URL}/architecture-services`, { method: 'POST', body: JSON.stringify(data) });
export const updateArchService = (id, data) => request(`${API_URL}/architecture-services/${id}`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteArchService = (id) => request(`${API_URL}/architecture-services/${id}`, { method: 'DELETE' });

// ── Contact Messages ──
export const getContactMessages = () => request(`${API_URL}/contact`);
export const markMessageRead = (id) => request(`${API_URL}/contact/${id}/read`, { method: 'PUT' });
export const deleteMessage = (id) => request(`${API_URL}/contact/${id}`, { method: 'DELETE' });

// ── Projects ──
export const getProjects = () => request(`${API_URL}/projects/admin/all`);
export const getProjectDetail = (id) => request(`${API_URL}/projects/admin/${id}`);
export const createProject = (data) => request(`${API_URL}/projects`, { method: 'POST', body: JSON.stringify(data) });
export const updateProject = (id, data) => request(`${API_URL}/projects/${id}`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteProject = (id) => request(`${API_URL}/projects/${id}`, { method: 'DELETE' });

// ── Project Stats ──
export const createProjectStat = (projectId, data) => request(`${API_URL}/projects/${projectId}/stats`, { method: 'POST', body: JSON.stringify(data) });
export const updateProjectStat = (id, data) => request(`${API_URL}/projects/stats/${id}`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteProjectStat = (id) => request(`${API_URL}/projects/stats/${id}`, { method: 'DELETE' });

// ── Project Gallery ──
export const createProjectGallery = (projectId, data) => request(`${API_URL}/projects/${projectId}/gallery`, { method: 'POST', body: JSON.stringify(data) });
export const updateProjectGallery = (id, data) => request(`${API_URL}/projects/gallery/${id}`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteProjectGallery = (id) => request(`${API_URL}/projects/gallery/${id}`, { method: 'DELETE' });

// ── Interior Rooms ──
export const createInteriorRoom = (projectId, data) => request(`${API_URL}/projects/${projectId}/interiors`, { method: 'POST', body: JSON.stringify(data) });
export const updateInteriorRoom = (id, data) => request(`${API_URL}/projects/interiors/${id}`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteInteriorRoom = (id) => request(`${API_URL}/projects/interiors/${id}`, { method: 'DELETE' });

// ── Apartments ──
export const createApartment = (projectId, data) => request(`${API_URL}/projects/${projectId}/apartments`, { method: 'POST', body: JSON.stringify(data) });
export const updateApartment = (id, data) => request(`${API_URL}/projects/apartments/${id}`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteApartment = (id) => request(`${API_URL}/projects/apartments/${id}`, { method: 'DELETE' });

// ── Apartment Features ──
export const createAptFeature = (aptId, data) => request(`${API_URL}/projects/apartments/${aptId}/features`, { method: 'POST', body: JSON.stringify(data) });
export const updateAptFeature = (id, data) => request(`${API_URL}/projects/features/${id}`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteAptFeature = (id) => request(`${API_URL}/projects/features/${id}`, { method: 'DELETE' });
