import { Users, Plus } from 'lucide-react';

export default function Colaboracoes({ data }) {
  const collabs = data.collaborations || [];

  return (
    <div className="page-transition">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem' }}>Colaborações</h1>
        <button className="btn btn-primary"><Plus size={18} /> New Collab</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {collabs.map(collab => (
          <div key={collab.id} className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Users size={20} className="text-purple" />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.125rem' }}>{collab.collaboratorName}</h3>
                  <p className="text-muted" style={{ fontSize: '0.875rem', textTransform: 'capitalize' }}>{collab.role}</p>
                </div>
              </div>
              <span className={`badge badge-${collab.status === 'active' ? 'success' : collab.status === 'completed' ? 'info' : 'warning'}`}>
                {collab.status}
              </span>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <p className="text-muted text-sm" style={{ marginBottom: '0.5rem' }}>Revenue Share ({collab.revenueShare}%)</p>
              <div style={{ width: '100%', height: '8px', backgroundColor: 'var(--surface)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: `${collab.revenueShare}%`, height: '100%', backgroundColor: 'var(--purple)' }}></div>
              </div>
            </div>

            <div style={{ fontSize: '0.875rem', color: 'var(--muted)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <p>Email: <span style={{ color: 'var(--text)' }}>{collab.contactEmail}</span></p>
              {collab.notes && <p>Notes: <span style={{ color: 'var(--text)' }}>{collab.notes}</span></p>}
            </div>
            
            <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.5rem' }}>
              <button className="btn btn-secondary" style={{ flex: 1 }}>Message</button>
              <button className="btn btn-secondary" style={{ flex: 1 }}>Details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
