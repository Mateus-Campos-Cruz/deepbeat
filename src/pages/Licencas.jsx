import { Plus } from 'lucide-react';

export default function Licencas({ data, updateEntity }) {
  const licenses = data.licenses || [];

  return (
    <div className="page-transition">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Licenças</h1>
          <p className="text-muted">Manage your beat leasing options and contracts.</p>
        </div>
        <button className="btn btn-primary"><Plus size={18} /> New License</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {licenses.map(license => (
          <div key={license.id} className="card" style={{ opacity: license.active ? 1 : 0.6, display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.25rem' }}>{license.name}</h3>
              <span className={`badge badge-${license.active ? 'success' : 'muted'}`}>
                {license.active ? 'Active' : 'Inactive'}
              </span>
            </div>
            <p className="mono text-green" style={{ fontSize: '2rem', marginBottom: '1rem' }}>${license.price}</p>
            <p className="text-muted" style={{ marginBottom: '1.5rem', flex: 1 }}>{license.description}</p>
            
            <div style={{ padding: '1rem', backgroundColor: 'var(--surface)', borderRadius: '8px', marginBottom: '1.5rem' }}>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <li style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                  <span className="text-muted">Files</span>
                  <span style={{ fontWeight: 500 }}>{license.allowedUses.split(',')[0]}</span>
                </li>
                <li style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                  <span className="text-muted">Commercial Use</span>
                  <span style={{ fontWeight: 500, color: license.commercialUse ? 'var(--green)' : 'var(--muted)' }}>
                    {license.commercialUse ? 'Yes' : 'No'}
                  </span>
                </li>
                <li style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                  <span className="text-muted">Exclusive</span>
                  <span style={{ fontWeight: 500, color: license.exclusivity ? 'var(--purple-light)' : 'var(--muted)' }}>
                    {license.exclusivity ? 'Yes' : 'No'}
                  </span>
                </li>
              </ul>
            </div>
            
            <button className="btn btn-secondary" style={{ width: '100%' }}>Edit License</button>
          </div>
        ))}
      </div>
    </div>
  );
}
