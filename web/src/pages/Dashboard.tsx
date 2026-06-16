// src/pages/Dashboard.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import '../styles/dashboard.css';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const stats = [
    { label: 'Total Appointments', value: '24', change: '+12%', sub: 'from yesterday', icon: '📅' },
    { label: 'Medicines', value: '156', change: '8 low', sub: 'in stock', icon: '💊' },
    { label: 'Patients', value: '320', change: '+8%', sub: 'from last month', icon: '👨‍⚕️' },
    { label: "Today's Appointments", value: '8', change: 'Next: 10:30 AM', sub: '', icon: '⏰' },
  ];

  const appointments = [
    { id: 1, name: 'Sarah Johnson', time: '10:30 AM', type: 'Fever, Headache', status: 'Confirmed' },
    { id: 2, name: 'Michael Brown', time: '11:00 AM', type: 'Regular Checkup', status: 'Confirmed' },
    { id: 3, name: 'Emily Davis', time: '11:30 AM', type: 'Diabetes Follow-up', status: 'Pending' },
    { id: 4, name: 'Robert Wilson', time: '12:00 PM', type: 'Blood Pressure', status: 'Confirmed' },
    { id: 5, name: 'Jessica Taylor', time: '12:30 PM', type: 'Throat Infection', status: 'Pending' },
  ];

  const medicines = [
    { id: 1, name: 'Paracetamol 500mg', category: 'Pain Relief', stock: 120, status: 'In Stock' },
    { id: 2, name: 'Amoxicillin 250mg', category: 'Antibiotic', stock: 8, status: 'Low Stock' },
    { id: 3, name: 'Cetirizine 10mg', category: 'Antihistamine', stock: 45, status: 'In Stock' },
    { id: 4, name: 'Ibuprofen 400mg', category: 'Pain Relief', stock: 15, status: 'Low Stock' },
    { id: 5, name: 'Omeprazole 20mg', category: 'Stomach Care', stock: 60, status: 'In Stock' },
  ];

  const quickActions = [
    { label: 'New Appointment', icon: '📋', color: '#2563eb', onClick: () => navigate('/appointments') },
    { label: 'Add Medicine', icon: '💊', color: '#7c3aed', onClick: () => navigate('/medicine') },
    { label: 'Add Patient', icon: '👤', color: '#16a34a', onClick: () => {} },
    { label: 'View Reports', icon: '📊', color: '#f59e0b', onClick: () => {} },
  ];

  const getStatusBadge = (status: string) => {
    if (status === 'Confirmed') return 'status-confirmed';
    if (status === 'Pending') return 'status-pending';
    return 'status-cancelled';
  };

  const getStockStatus = (status: string) => {
    if (status === 'In Stock') return 'stock-good';
    if (status === 'Low Stock') return 'stock-low';
    return 'stock-critical';
  };

  return (
    <div className="dashboard-container">
      {/* Welcome Header */}
      <div className="dashboard-welcome">
        <div className="welcome-content">
          <h1 className="welcome-title">
            Welcome back, <span className="doctor-name">{user?.name || 'Dr. John'}!</span> 🎉
          </h1>
          <p className="welcome-subtitle">Here's what's happening in your clinic today.</p>
        </div>
        <div className="welcome-date">
          <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-content">
              <span className="stat-label">{stat.label}</span>
              <span className="stat-value">{stat.value}</span>
              <span className={`stat-change ${stat.change.includes('+') ? 'positive' : 'negative'}`}>
                {stat.change}
                {stat.sub && <span className="stat-sub">{stat.sub}</span>}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="dashboard-main">
        {/* Upcoming Appointments */}
        <div className="appointments-section">
          <div className="section-header">
            <h2>Upcoming Appointments</h2>
            <button className="view-all-btn" onClick={() => navigate('/appointments')}>
              View All →
            </button>
          </div>

          <div className="appointments-list">
            {appointments.map((appointment) => (
              <div key={appointment.id} className="appointment-item">
                <div className="appointment-info">
                  <div className="appointment-avatar">
                    {appointment.name.charAt(0)}
                  </div>
                  <div className="appointment-details">
                    <span className="appointment-name">{appointment.name}</span>
                    <span className="appointment-time">{appointment.time}</span>
                    <span className="appointment-type">{appointment.type}</span>
                  </div>
                </div>
                <span className={`status-badge ${getStatusBadge(appointment.status)}`}>
                  {appointment.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Medicine Stock Overview */}
        <div className="medicine-section">
          <div className="section-header">
            <h2>Medicine Stock Overview</h2>
            <button className="view-all-btn" onClick={() => navigate('/medicine')}>
              View All →
            </button>
          </div>

          <div className="medicine-table-container">
            <table className="medicine-table">
              <thead>
                <tr>
                  <th>Medicine</th>
                  <th>Category</th>
                  <th>Stock</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {medicines.map((medicine) => (
                  <tr key={medicine.id}>
                    <td className="medicine-name">{medicine.name}</td>
                    <td className="medicine-category">{medicine.category}</td>
                    <td className={`medicine-stock ${medicine.stock < 20 ? 'low-stock' : ''}`}>
                      {medicine.stock}
                    </td>
                    <td>
                      <span className={`stock-badge ${getStockStatus(medicine.status)}`}>
                        {medicine.status === 'In Stock' ? '✅ ' : '⚠️ '}
                        {medicine.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <div className="section-header">
          <h2>Quick Actions</h2>
        </div>
        <div className="actions-grid">
          {quickActions.map((action, index) => (
            <button
              key={index}
              className="action-btn"
              onClick={action.onClick}
              style={{ '--action-color': action.color } as React.CSSProperties}
            >
              <span className="action-icon">{action.icon}</span>
              <span className="action-label">{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="dashboard-footer">
        <p>© 2026 Doctor Dashboard. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Dashboard;