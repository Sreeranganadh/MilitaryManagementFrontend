import React, { useEffect, useState } from 'react';
import api from '../services/api';
import '../App.css';

function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get('/dashboard')
      .then((res) => setStats(res.data))
      .catch((err) => console.log(err));
  }, []);

  if (!stats) return <p>Loading...</p>;

  return (
    <div className="container">
      <h2>Dashboard Overview</h2>
      <p><strong>Opening Balance:</strong> {stats.opening_balance}</p>
      <p><strong>Net Movement:</strong> {stats.net_movement}</p>
      <p><strong>Closing Balance:</strong> {stats.closing_balance}</p>
      <p><strong>Assigned:</strong> {stats.assigned}</p>
      <p><strong>Expended:</strong> {stats.expended}</p>
    </div>
  );
}

export default Dashboard;
