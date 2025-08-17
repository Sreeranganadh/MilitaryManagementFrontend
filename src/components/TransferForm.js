import React, { useState, useEffect } from 'react';
import api from '../services/api';
import '../App.css';

function TransferForm() {
  const [equipmentId, setEquipmentId] = useState('');
  const [fromBaseId, setFromBaseId] = useState('');
  const [toBaseId, setToBaseId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [transferDate, setTransferDate] = useState('');
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
      await api.post('/transfers', {
        equipment_id: equipmentId,
        from_base_id: fromBaseId,
        to_base_id: toBaseId,
        quantity,
        transfer_date: transferDate
      });
      setMessage('✅ Transfer completed successfully');
    } catch (err) {
      setMessage('❌ Failed to transfer asset');
      console.error(err);
    }
  };

  return (
    <div className="container">
      <h2>Transfer Asset</h2>
      {message && <div className="message">{message}</div>}
      <form onSubmit={handleSubmit}>
        <label>From Base:</label>
        <select value={fromBaseId} onChange={(e) => setFromBaseId(e.target.value)} required>
          <option value="">Select From Base</option>
          {baseOptions.map((base) => (
            <option key={base.id} value={base.id}>{base.name}</option>
          ))}
        </select>

        <label>To Base:</label>
        <select value={toBaseId} onChange={(e) => setToBaseId(e.target.value)} required>
          <option value="">Select To Base</option>
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

        <label>Transfer Date:</label>
        <input
          type="date"
          value={transferDate}
          onChange={(e) => setTransferDate(e.target.value)}
          required
        />

        <button type="submit">Submit Transfer</button>
      </form>
    </div>
  );
}

export default TransferForm;
