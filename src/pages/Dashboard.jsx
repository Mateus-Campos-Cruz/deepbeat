import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Music, DollarSign, FileCheck, Users, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

const StatCard = ({ icon: Icon, value, label, trend }) => (
  <div className="card">
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
      <div style={{ padding: '0.75rem', backgroundColor: 'var(--surface)', borderRadius: '8px' }}>
        <Icon size={24} className="text-purple" />
      </div>
      {trend && (
        <span className="badge badge-success">+{trend}%</span>
      )}
    </div>
    <h3 style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>{value}</h3>
    <p className="text-muted" style={{ fontSize: '0.875rem' }}>{label}</p>
  </div>
);

export default function Dashboard({ data, isLoading }) {
  if (isLoading || !data) return <div className="page-transition">Loading...</div>;

  const totalBeats = data.beats?.length || 0;
  const totalSales = data.sales?.reduce((acc, sale) => acc + sale.amount, 0).toFixed(2) || '0.00';
  const licensesSold = data.sales?.length || 0;
  const activeCollabs = data.collaborations?.filter(c => c.status === 'active').length || 0;

  const chartData = [
    { name: 'Jan', revenue: 400 },
    { name: 'Feb', revenue: 300 },
    { name: 'Mar', revenue: 600 },
    { name: 'Apr', revenue: 800 },
    { name: 'May', revenue: 500 },
    { name: 'Jun', revenue: 900 }
  ];

  return (
    <div className="page-transition">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Dashboard</h1>
          <p className="text-muted">Welcome back, {data.user?.name || 'Producer'}. Here's your overview.</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link to="/beats" className="btn btn-secondary">Add Beat</Link>
          <Link to="/financeiro" className="btn btn-primary">New Sale</Link>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <StatCard icon={Music} value={totalBeats} label="Total Beats" trend={12} />
        <StatCard icon={DollarSign} value={`$${totalSales}`} label="Revenue (Lifetime)" trend={25} />
        <StatCard icon={FileCheck} value={licensesSold} label="Licenses Sold" trend={8} />
        <StatCard icon={Users} value={activeCollabs} label="Active Collabs" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
        <div className="card">
          <h3 style={{ marginBottom: '1.5rem' }}>Revenue (Last 6 Months)</h3>
          <div style={{ height: '300px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--purple)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--green)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="name" stroke="var(--muted)" tick={{ fill: 'var(--muted)' }} axisLine={false} />
                <YAxis stroke="var(--muted)" tick={{ fill: 'var(--muted)' }} axisLine={false} tickFormatter={(value) => `$${value}`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', borderRadius: '8px' }}
                  itemStyle={{ color: 'var(--text)' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="var(--purple)" fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Activity size={20} className="text-purple" />
            Recent Activity
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {data.sales?.slice(0, 4).map((sale, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', paddingBottom: '1rem', borderBottom: i !== 3 ? '1px solid var(--border)' : 'none' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <DollarSign size={18} className="text-green" />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '0.875rem', fontWeight: 500 }}>{sale.buyerName} purchased {sale.licenseType}</p>
                  <p className="text-muted" style={{ fontSize: '0.75rem' }}>${sale.amount.toFixed(2)} • {new Date(sale.date).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="card" style={{ marginTop: '1.5rem' }}>
        <h3 style={{ marginBottom: '1.5rem' }}>Top Beats</h3>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Genre</th>
                <th>BPM</th>
                <th>Price</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {data.beats?.slice(0, 5).map(beat => (
                <tr key={beat.id}>
                  <td style={{ fontWeight: 500 }}>{beat.title}</td>
                  <td><span className="badge badge-purple">{beat.genre}</span></td>
                  <td><span className="mono text-muted">{beat.BPM}</span></td>
                  <td className="text-green mono">${beat.price}</td>
                  <td>
                    <span className={`badge badge-${beat.status === 'active' ? 'success' : beat.status === 'sold' ? 'info' : 'warning'}`}>
                      {beat.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
