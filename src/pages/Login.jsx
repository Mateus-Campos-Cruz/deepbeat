import { useState } from 'react';
import { Disc } from 'lucide-react';

export default function Login({ onLogin, data }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in both fields.');
      return;
    }

    const storedUser = data?.user;
    if (storedUser && email === storedUser.email && password === storedUser.password) {
      onLogin();
    } else {
      setError('Invalid email or password.');
    }
  };

  return (
    <div className="page-transition" style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--bg)' }}>
      <div className="card" style={{ width: '100%', maxWidth: '400px', textAlign: 'center', padding: '2.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'var(--purple)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(124, 58, 237, 0.4)' }}>
            <Disc size={28} color="white" />
          </div>
        </div>
        <h1 style={{ marginBottom: '0.5rem', fontSize: '2rem' }}>DEEP BEAT</h1>
        <p className="text-muted" style={{ marginBottom: '2rem' }}>Produce. Manage. Dominate.</p>
        
        <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input 
              type="email" 
              className="form-input" 
              placeholder="admin@deepbeat.com" 
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input 
              type="password" 
              className="form-input" 
              placeholder="••••••••" 
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          {error && <div className="form-error" style={{ marginBottom: '1rem' }}>{error}</div>}
          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.75rem', marginTop: '1rem' }}>
            Sign In
          </button>
        </form>
        <p className="text-muted" style={{ marginTop: '1.5rem', fontSize: '0.875rem' }}>
          Don't have an account? <a href="#" className="text-purple" onClick={e => e.preventDefault()}>Register</a>
        </p>
      </div>
    </div>
  );
}
