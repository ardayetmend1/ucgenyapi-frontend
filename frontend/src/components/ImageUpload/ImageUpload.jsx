import { useState, useRef, useEffect } from 'react';
import { uploadFile } from '../../services/adminApi';
import './ImageUpload.css';

function ImageUpload({ value, onChange, label }) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(value || '');
  const fileRef = useRef();

  useEffect(() => { setPreview(value || ''); }, [value]);

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Local preview
    const localUrl = URL.createObjectURL(file);
    setPreview(localUrl);

    setUploading(true);
    try {
      const { url } = await uploadFile(file);
      setPreview(url);
      onChange(url);
    } catch {
      setPreview(value || '');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="img-upload">
      {label && <label className="img-upload__label">{label}</label>}
      <div className="img-upload__area" onClick={() => fileRef.current?.click()}>
        {preview ? (
          <img src={preview} alt="" className="img-upload__preview" />
        ) : (
          <div className="img-upload__placeholder">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
            <span>Görsel Seç</span>
          </div>
        )}
        {uploading && <div className="img-upload__loading">Yükleniyor...</div>}
      </div>
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        onChange={handleFile}
        style={{ display: 'none' }}
      />
      <input
        type="text"
        className="img-upload__url"
        value={value}
        onChange={(e) => { onChange(e.target.value); setPreview(e.target.value); }}
        placeholder="veya URL yapıştır"
      />
    </div>
  );
}

export default ImageUpload;
