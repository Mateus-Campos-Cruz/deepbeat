import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Play, Edit3 } from 'lucide-react';

export default function BeatDetail({ data }) {
  const { id } = useParams();
  const beat = data.beats?.find(b => b.id === id);

  if (!beat) {
    return <div className="page-transition">Beat not found. <Link to="/beats" className="text-purple">Go back</Link></div>;
  }

  return (
    <div className="page-transition">
      <Link to="/beats" className="btn btn-secondary" style={{ marginBottom: '2rem', display: 'inline-flex', padding: '0.5rem' }}>
        <ArrowLeft size={18} /> Back to Beats
      </Link>

      <div className="card" style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
        <div style={{ width: '250px', height: '250px', backgroundColor: 'var(--surface)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Play size={48} className="text-muted" />
        </div>
        
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{beat.title}</h1>
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                <span className="badge badge-purple">{beat.genre}</span>
                <span className="badge badge-info">{beat.mood}</span>
                <span className={`badge badge-${beat.status === 'active' ? 'success' : 'warning'}`}>{beat.status}</span>
              </div>
            </div>
            <button className="btn btn-primary"><Edit3 size={18} /> Edit Beat</button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
            <div>
              <p className="text-muted text-sm">BPM</p>
              <p className="mono" style={{ fontSize: '1.25rem' }}>{beat.BPM}</p>
            </div>
            <div>
              <p className="text-muted text-sm">Key</p>
              <p className="mono" style={{ fontSize: '1.25rem' }}>{beat.key}</p>
            </div>
            <div>
              <p className="text-muted text-sm">Price</p>
              <p className="mono text-green" style={{ fontSize: '1.25rem' }}>${beat.price}</p>
            </div>
          </div>

          <div>
            <p className="text-muted text-sm" style={{ marginBottom: '0.5rem' }}>Tags</p>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {beat.tags.map(tag => (
                <span key={tag} className="badge" style={{ backgroundColor: 'var(--bg)', border: '1px solid var(--border)' }}>#{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="card" style={{ marginTop: '2rem' }}>
        <h3 style={{ marginBottom: '1.5rem' }}>Licensing History</h3>
        <p className="text-muted">No licensing history available yet.</p>
      </div>
    </div>
  );
}
