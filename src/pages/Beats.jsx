import { useState } from 'react';
import { Search, Plus, Play, MoreVertical, Edit2, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Beats({ data, updateEntity }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGenre, setFilterGenre] = useState('');
  
  const beats = data.beats || [];
  
  const filteredBeats = beats.filter(b => {
    return b.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
           (filterGenre ? b.genre === filterGenre : true);
  });

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this beat?')) {
      updateEntity('beats', beats.filter(b => b.id !== id));
    }
  };

  return (
    <div className="page-transition">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem' }}>Beats</h1>
        <button className="btn btn-primary"><Plus size={18} /> Add Beat</button>
      </div>

      <div className="card" style={{ marginBottom: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <Search size={18} className="text-muted" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
          <input 
            type="text" 
            className="form-input" 
            placeholder="Search beats..." 
            style={{ paddingLeft: '2.5rem' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select className="form-select" style={{ width: '200px' }} value={filterGenre} onChange={(e) => setFilterGenre(e.target.value)}>
          <option value="">All Genres</option>
          <option value="Synthwave">Synthwave</option>
          <option value="Trap">Trap</option>
          <option value="Lo-Fi">Lo-Fi</option>
          <option value="Drill">Drill</option>
          <option value="Pop">Pop</option>
        </select>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Play</th>
              <th>Title</th>
              <th>BPM</th>
              <th>Key</th>
              <th>Genre</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBeats.map(beat => (
              <tr key={beat.id}>
                <td>
                  <button className="btn" style={{ padding: '0.5rem', borderRadius: '50%', backgroundColor: 'var(--surface)', color: 'var(--purple)' }}>
                    <Play size={16} fill="currentColor" />
                  </button>
                </td>
                <td><Link to={`/beats/${beat.id}`} style={{ fontWeight: 600 }} className="text-purple">{beat.title}</Link></td>
                <td className="mono text-muted">{beat.BPM}</td>
                <td className="mono">{beat.key}</td>
                <td><span className="badge badge-info">{beat.genre}</span></td>
                <td className="text-green mono">${beat.price}</td>
                <td>
                  <span className={`badge badge-${beat.status === 'active' ? 'success' : beat.status === 'sold' ? 'info' : beat.status === 'exclusive' ? 'purple' : 'warning'}`}>
                    {beat.status}
                  </span>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="btn btn-secondary" style={{ padding: '0.25rem' }}><Edit2 size={16} /></button>
                    <button className="btn btn-danger" style={{ padding: '0.25rem' }} onClick={() => handleDelete(beat.id)}><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredBeats.length === 0 && (
              <tr>
                <td colSpan="8" style={{ textAlign: 'center', padding: '2rem' }} className="text-muted">
                  No beats found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
