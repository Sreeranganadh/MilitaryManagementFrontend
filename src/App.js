import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import PurchaseForm from './components/PurchaseForm';
import AssignmentForm from './components/AssignmentForm';
import TransferForm from './components/TransferForm';
import Navbar from './components/Navbar';
import History from './components/History';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [role, setRole] = useState(null);

  useEffect(() => {
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setRole(payload.role);
      } catch (err) {
        console.error('Invalid token');
        setToken(null);
        setRole(null);
      }
    } else {
      setRole(null);
    }
  }, [token]);

  return (
    <Router>
      {token && <Navbar role={role} onLogout={() => setToken(null)} />}

      <Routes>
        <Route path="/" element={<Login setToken={setToken} />} />
        {token && (
          <>
            <Route path="/dashboard" element={<Dashboard />} />

            {(role === 'admin' || role === 'logistics') && (
              <Route path="/purchase" element={<PurchaseForm />} />
            )}
            {(role === 'admin' || role === 'logistics') && (
              <Route path="/transfer" element={<TransferForm />} />
            )}
            {(role === 'admin' || role === 'commander') && (
              <Route path="/assignment" element={<AssignmentForm />} />
            )}

            {role === 'admin' && (
              <Route path="/movements" element={<History />} />
            )}
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
