import { useState } from 'react';
import { Save, Download, Upload, Trash2 } from 'lucide-react';

export default function Configuracoes({ data, updateEntity }) {
  const [user, setUser] = useState(data.user || {});

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    updateEntity('user', user);
    alert('Settings saved successfully!');
  };

  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "deepbeat_export.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <div className="page-transition">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem' }}>Configurações</h1>
        <button className="btn btn-primary" onClick={handleSave}><Save size={18} /> Save Changes</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="card">
            <h3 style={{ marginBottom: '1.5rem' }}>Profile Information</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Name</label>
                <input type="text" className="form-input" name="name" value={user.name || ''} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input type="email" className="form-input" name="email" value={user.email || ''} onChange={handleChange} />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Producer Tag / Alias</label>
              <input type="text" className="form-input" name="producerTag" value={user.producerTag || ''} onChange={handleChange} />
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Bio</label>
              <textarea className="form-textarea" name="bio" rows="4" value={user.bio || ''} onChange={handleChange}></textarea>
            </div>
          </div>
          
          <div className="card">
            <h3 style={{ marginBottom: '1.5rem' }}>Preferences</h3>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '1rem', borderBottom: '1px solid var(--border)' }}>
              <div>
                <p style={{ fontWeight: 500 }}>Email Notifications</p>
                <p className="text-muted" style={{ fontSize: '0.875rem' }}>Receive emails when a beat is sold.</p>
              </div>
              <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <input type="checkbox" checked={user.notifications || false} onChange={e => setUser({...user, notifications: e.target.checked})} style={{ width: '20px', height: '20px', accentColor: 'var(--purple)' }} />
              </label>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1rem' }}>
              <div>
                <p style={{ fontWeight: 500 }}>App Theme</p>
                <p className="text-muted" style={{ fontSize: '0.875rem' }}>Select accent color.</p>
              </div>
              <select className="form-select" style={{ width: '150px' }} name="theme" value={user.theme || 'purple'} onChange={handleChange}>
                <option value="purple">Purple</option>
                <option value="blue">Blue</option>
                <option value="green">Green</option>
              </select>
            </div>
          </div>
        </div>

        <div className="card" style={{ alignSelf: 'start' }}>
          <h3 style={{ marginBottom: '1.5rem' }}>Data Management</h3>
          <p className="text-muted" style={{ fontSize: '0.875rem', marginBottom: '1.5rem' }}>
            Manage your local data. Export your data to back it up, or import a previously exported file.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <button className="btn btn-secondary" style={{ width: '100%', justifyContent: 'flex-start' }} onClick={handleExport}>
              <Download size={18} /> Export All Data (JSON)
            </button>
            <button className="btn btn-secondary" style={{ width: '100%', justifyContent: 'flex-start' }}>
              <Upload size={18} /> Import Data
            </button>
            <div style={{ height: '1px', backgroundColor: 'var(--border)', margin: '0.5rem 0' }}></div>
            <button className="btn btn-danger" style={{ width: '100%', justifyContent: 'flex-start' }}>
              <Trash2 size={18} /> Clear All Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
