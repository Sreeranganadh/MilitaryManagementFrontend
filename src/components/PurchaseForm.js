import React, { useState, useEffect } from 'react';
import api from '../services/api';
import '../App.css';

function PurchaseForm() {
  const [equipmentId, setEquipmentId] = useState('');
  const [baseId, setBaseId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');
  const [equipmentOptions, setEquipmentOptions] = useState([]);
  const [baseOptions, setBaseOptions] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    setEquipmentOptions([
      { id: 1, name: 'Rifle' },
      { id: 2, name: 'Truck' },
      { id: 3, name: 'Ammunition' }
    ]);

    setBaseOptions([
      { id: 1, name: 'Base Alpha' },
      { id: 2, name: 'Base Bravo' }
    ]);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/purchases', {
        equipment_id: equipmentId,
        base_id: baseId,
        quantity,
        purchase_date: purchaseDate
      });
      setMessage('✅ Purchase recorded successfully');
    } catch (err) {
      setMessage('❌ Failed to record purchase');
      console.error(err);
    }
  };

  return (
    <div className="container">
      <h2>Purchase Asset</h2>
      {message && <div className="message">{message}</div>}
      <form onSubmit={handleSubmit}>
        <label>Base:</label>
        <select value={baseId} onChange={(e) => setBaseId(e.target.value)} required>
          <option value="">Select Base</option>
          {baseOptions.map((base) => (
            <option key={base.id} value={base.id}>{base.name}</option>
          ))}
        </select>

        <label>Equipment:</label>
        <select value={equipmentId} onChange={(e) => setEquipmentId(e.target.value)} required>
          <option value="">Select Equipment</option>
          {equipmentOptions.map((eq) => (
            <option key={eq.id} value={eq.id}>{eq.name}</option>
          ))}
        </select>

        <label>Quantity:</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />

        <label>Purchase Date:</label>
        <input
          type="date"
          value={purchaseDate}
          onChange={(e) => setPurchaseDate(e.target.value)}
          required
        />

        <button type="submit">Submit Purchase</button>
      </form>
    </div>
  );
}

export default PurchaseForm;
