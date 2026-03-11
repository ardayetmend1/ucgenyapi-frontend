import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './AdminEditButton.css';

function AdminEditButton({ section, label, style }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user || user.role !== 'Admin') return null;

  return (
    <button
      className="admin-edit-btn"
      style={style}
      onClick={() => navigate(`/admin?section=${section}`)}
      title={`${label} Düzenle`}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
      </svg>
      <span>{label}</span>
    </button>
  );
}

export default AdminEditButton;
