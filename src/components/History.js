import React, { useEffect, useState } from 'react';
import api from '../services/api';
import './History.css'; // 👈 Import custom styles

function History() {
  const [purchases, setPurchases] = useState([]);
  const [transfers, setTransfers] = useState([]);
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [purchaseRes, transferRes, assignRes] = await Promise.all([
          api.get('/purchases'),
          api.get('/transfers'),
          api.get('/assignments'),
        ]);
        setPurchases(purchaseRes.data);
        setTransfers(transferRes.data);
        setAssignments(assignRes.data);
      } catch (err) {
        console.error('Failed to fetch movement data:', err);
      }
    };
    fetchData();
  }, []);

  const renderTable = (data, headers) => (
    <table className="data-table">
      <thead>
        <tr>{headers.map((h, i) => <th key={i}>{h}</th>)}</tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr><td colSpan={headers.length}>No records found.</td></tr>
        ) : (
          data.map((row, i) => (
            <tr key={i}>
              {Object.values(row).map((cell, j) => (
                <td key={j}>{cell}</td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );

  return (
    <div className="movements-container">
      <h2>📦 Asset Movement History</h2>

      <section>
        <h3>🛒 Purchases</h3>
        {renderTable(purchases.map(p => ({
          ID: p.id,
          'Base ID': p.base_id,
          'Equipment ID': p.equipment_id,
          Quantity: p.quantity,
          'Purchase Date': new Date(p.purchase_date).toLocaleDateString(),
        })), ['ID', 'Base ID', 'Equipment ID', 'Quantity', 'Purchase Date'])}
      </section>

      <section>
        <h3>🔁 Transfers</h3>
        {renderTable(transfers.map(t => ({
          ID: t.id,
          'From Base': t.from_base_id,
          'To Base': t.to_base_id,
          'Equipment ID': t.equipment_id,
          Quantity: t.quantity,
          'Transfer Date': new Date(t.transfer_date).toLocaleDateString(),
        })), ['ID', 'From Base', 'To Base', 'Equipment ID', 'Quantity', 'Transfer Date'])}
      </section>

      <section>
        <h3>🎯 Assignments / Expended</h3>
        {renderTable(assignments.map(a => ({
          ID: a.id,
          'Base ID': a.base_id,
          'Equipment ID': a.equipment_id,
          Personnel: a.personnel_name || 'N/A',
          Quantity: a.quantity,
          Status: a.status,
          'Assigned Date': new Date(a.assigned_date).toLocaleDateString(),
        })), ['ID', 'Base ID', 'Equipment ID', 'Personnel', 'Quantity', 'Status', 'Assigned Date'])}
      </section>
    </div>
  );
}

export default History;
