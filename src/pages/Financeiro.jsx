import { useState } from 'react';
import { DollarSign, Download, Plus } from 'lucide-react';

export default function Financeiro({ data, updateEntity }) {
  const sales = data.sales || [];
  
  const totalRevenue = sales.reduce((acc, s) => acc + s.amount, 0).toFixed(2);
  const avgTicket = sales.length ? (totalRevenue / sales.length).toFixed(2) : '0.00';

  return (
    <div className="page-transition">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem' }}>Financeiro</h1>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn btn-secondary"><Download size={18} /> Export CSV</button>
          <button className="btn btn-primary"><Plus size={18} /> New Sale</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <div className="card">
          <h3 className="text-muted" style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Total Revenue</h3>
          <p className="mono text-green" style={{ fontSize: '2rem' }}>${totalRevenue}</p>
        </div>
        <div className="card">
          <h3 className="text-muted" style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Total Sales</h3>
          <p className="mono" style={{ fontSize: '2rem' }}>{sales.length}</p>
        </div>
        <div className="card">
          <h3 className="text-muted" style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Avg Ticket</h3>
          <p className="mono" style={{ fontSize: '2rem' }}>${avgTicket}</p>
        </div>
      </div>

      <div className="card">
        <h3 style={{ marginBottom: '1.5rem' }}>Recent Transactions</h3>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Invoice</th>
                <th>Date</th>
                <th>Client</th>
                <th>License</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {sales.map(sale => (
                <tr key={sale.id}>
                  <td className="mono text-muted">{sale.invoiceNumber}</td>
                  <td>{new Date(sale.date).toLocaleDateString()}</td>
                  <td style={{ fontWeight: 500 }}>{sale.buyerName}</td>
                  <td><span className="badge badge-purple">{sale.licenseType}</span></td>
                  <td className="mono text-green">${sale.amount.toFixed(2)}</td>
                  <td>
                    <span className={`badge badge-${sale.status === 'paid' ? 'success' : sale.status === 'refunded' ? 'danger' : 'warning'}`}>
                      {sale.status}
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
