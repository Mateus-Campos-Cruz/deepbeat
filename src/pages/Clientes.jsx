import { useState } from 'react';
import { Search, Plus } from 'lucide-react';

export default function Clientes({ data, updateEntity }) {
  const [searchTerm, setSearchTerm] = useState('');
  const clients = data.clients || [];

  const filteredClients = clients.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page-transition">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem' }}>Clientes</h1>
        <button className="btn btn-primary"><Plus size={18} /> Add Client</button>
      </div>

      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <div style={{ position: 'relative' }}>
          <Search size={18} className="text-muted" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
          <input 
            type="text" 
            className="form-input" 
            placeholder="Search clients..." 
            style={{ paddingLeft: '2.5rem' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Country</th>
              <th>Purchases</th>
              <th>Total Spent</th>
              <th>Tags</th>
            </tr>
          </thead>
          <tbody>
            {filteredClients.map(client => (
              <tr key={client.id}>
                <td style={{ fontWeight: 500 }}>{client.name}</td>
                <td className="text-muted">{client.email}</td>
                <td>{client.country}</td>
                <td className="mono">{client.totalPurchases}</td>
                <td className="mono text-green">${client.totalSpent.toFixed(2)}</td>
                <td>
                  <div style={{ display: 'flex', gap: '0.25rem' }}>
                    {client.tags.map(tag => (
                      <span key={tag} className="badge badge-info" style={{ fontSize: '0.65rem' }}>{tag}</span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
