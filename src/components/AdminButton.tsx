import React from 'react';
import { Link } from 'react-router-dom';
import './AdminButton.css';

const AdminButton: React.FC = () => (
  <Link to="/admin" className="rwr-admin-fab" aria-label="Admin">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
    <span>Admin</span>
  </Link>
);

export default AdminButton;
