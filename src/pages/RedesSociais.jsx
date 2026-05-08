import { Calendar, List, Plus, Image, MessageSquare, Video } from 'lucide-react';

export default function RedesSociais({ data }) {
  const posts = data.posts || [];

  const getPlatformIcon = (platform) => {
    switch (platform) {
      case 'instagram': return <Image size={16} className="text-purple" />;
      case 'twitter': return <MessageSquare size={16} className="text-info" />;
      case 'youtube': return <Video size={16} className="text-danger" />;
      default: return <span style={{ width: '16px', height: '16px', display: 'inline-block', backgroundColor: 'var(--muted)', borderRadius: '50%' }}></span>;
    }
  };

  return (
    <div className="page-transition">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem' }}>Social Media</h1>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ display: 'flex', backgroundColor: 'var(--surface)', padding: '0.25rem', borderRadius: '8px' }}>
            <button className="btn" style={{ backgroundColor: 'var(--card)', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}><Calendar size={18} /></button>
            <button className="btn"><List size={18} className="text-muted" /></button>
          </div>
          <button className="btn btn-primary"><Plus size={18} /> Compose</button>
        </div>
      </div>

      <div className="card">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Platform</th>
                <th>Content</th>
                <th>Status</th>
                <th>Scheduled For</th>
                <th>Engagement</th>
              </tr>
            </thead>
            <tbody>
              {posts.map(post => (
                <tr key={post.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      {getPlatformIcon(post.platform)}
                      <span style={{ textTransform: 'capitalize' }}>{post.platform}</span>
                    </div>
                  </td>
                  <td>
                    <div style={{ maxWidth: '300px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {post.content}
                    </div>
                  </td>
                  <td>
                    <span className={`badge badge-${post.status === 'published' ? 'success' : post.status === 'scheduled' ? 'purple' : 'muted'}`}>
                      {post.status}
                    </span>
                  </td>
                  <td>{new Date(post.scheduledAt).toLocaleString()}</td>
                  <td>
                    {post.status === 'published' ? (
                      <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.875rem' }}>
                        <span className="text-muted">❤️ {post.engagementData?.likes || 0}</span>
                        <span className="text-muted">🔁 {post.engagementData?.shares || 0}</span>
                      </div>
                    ) : (
                      <span className="text-muted">-</span>
                    )}
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
