import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar({ role, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    onLogout();
    navigate('/');
  };

  return (
    <div className="navbar">
      <div className="nav-left">🛡️ Military Asset Manager</div>
      <div className="nav-right">
        <Link to="/dashboard">Dashboard</Link>

        {(role === 'admin' || role === 'logistics') && (
          <Link to="/purchase">Purchase</Link>
        )}

        {(role === 'admin' || role === 'logistics') && (
          <Link to="/transfer">Transfer</Link>
        )}

        {(role === 'admin' || role === 'commander') && (
          <Link to="/assignment">Assignment</Link>
        )}

        {role === 'admin' && (
          <Link to="/movements">Movements</Link>
        )}

        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default Navbar;
