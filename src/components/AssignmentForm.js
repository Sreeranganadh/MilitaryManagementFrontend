import React, { useState, useEffect } from 'react';
import api from '../services/api';
import '../App.css'; // ✅ make sure this is imported

function AssignmentForm() {
  const [equipmentId, setEquipmentId] = useState('');
  const [baseId, setBaseId] = useState('');
  const [personnelName, setPersonnelName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [assignedDate, setAssignedDate] = useState('');
  const [status, setStatus] = useState('assigned');
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
      await api.post('/assignments', {
        base_id: baseId,
        equipment_id: equipmentId,
        personnel_name: personnelName,
        quantity,
        status,
        assigned_date: assignedDate
      });
      setMessage('✅ Asset assignment recorded successfully');
      // Optional: Clear form
      setEquipmentId('');
      setBaseId('');
      setPersonnelName('');
      setQuantity('');
      setStatus('assigned');
      setAssignedDate('');
    } catch (err) {
      console.error(err);
      setMessage('❌ Failed to assign asset');
    }
  };

  return (
    <div className="container">
      <h2>Assign Asset</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit}>
        <label>Base:</label>
        <select value={baseId} onChange={(e) => setBaseId(e.target.value)} required>
          <option value="">Select Base</option>
          {baseOptions.map(base => (
            <option key={base.id} value={base.id}>{base.name}</option>
          ))}
        </select>

        <label>Equipment:</label>
        <select value={equipmentId} onChange={(e) => setEquipmentId(e.target.value)} required>
          <option value="">Select Equipment</option>
          {equipmentOptions.map(eq => (
            <option key={eq.id} value={eq.id}>{eq.name}</option>
          ))}
        </select>

        <label>Personnel Name:</label>
        <input
          type="text"
          value={personnelName}
          onChange={(e) => setPersonnelName(e.target.value)}
          required
        />

        <label>Quantity:</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />

        <label>Status:</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)} required>
          <option value="assigned">Assigned</option>
          <option value="expended">Expended</option>
        </select>

        <label>Assigned Date:</label>
        <input
          type="date"
          value={assignedDate}
          onChange={(e) => setAssignedDate(e.target.value)}
          required
        />

        <button type="submit">Submit Assignment</button>
      </form>
    </div>
  );
}

export default AssignmentForm;
