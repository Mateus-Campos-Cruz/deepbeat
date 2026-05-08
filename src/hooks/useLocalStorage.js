import { useState, useEffect } from 'react';

const SEED_DATA = {
  beats: [
    { id: '1', title: 'Midnight City', BPM: 120, key: 'Cm', genre: 'Synthwave', mood: 'Dark', tags: ['retro', 'synth'], price: 29.99, status: 'active', createdAt: new Date().toISOString() },
    { id: '2', title: 'Neon Lights', BPM: 95, key: 'Am', genre: 'Trap', mood: 'Energetic', tags: ['banger', '808'], price: 49.99, status: 'exclusive', createdAt: new Date(Date.now() - 86400000).toISOString() },
    { id: '3', title: 'Ocean Breeze', BPM: 105, key: 'G', genre: 'Lo-Fi', mood: 'Chill', tags: ['study', 'relax'], price: 19.99, status: 'active', createdAt: new Date(Date.now() - 172800000).toISOString() },
    { id: '4', title: 'Urban Jungle', BPM: 140, key: 'Dm', genre: 'Drill', mood: 'Aggressive', tags: ['uk', 'slide'], price: 39.99, status: 'sold', createdAt: new Date(Date.now() - 259200000).toISOString() },
    { id: '5', title: 'Summer Vibes', BPM: 110, key: 'F', genre: 'Pop', mood: 'Happy', tags: ['radio', 'upbeat'], price: 24.99, status: 'draft', createdAt: new Date(Date.now() - 345600000).toISOString() }
  ],
  sales: [
    { id: 's1', beatId: '1', buyerName: 'John Doe', buyerEmail: 'john@example.com', licenseType: 'premium', amount: 49.99, date: new Date().toISOString(), invoiceNumber: 'INV-001', status: 'paid' },
    { id: 's2', beatId: '4', buyerName: 'Jane Smith', buyerEmail: 'jane@example.com', licenseType: 'exclusive', amount: 199.99, date: new Date(Date.now() - 86400000).toISOString(), invoiceNumber: 'INV-002', status: 'paid' },
    { id: 's3', beatId: '2', buyerName: 'Mike Johnson', buyerEmail: 'mike@example.com', licenseType: 'basic', amount: 29.99, date: new Date(Date.now() - 172800000).toISOString(), invoiceNumber: 'INV-003', status: 'pending' },
    { id: 's4', beatId: '3', buyerName: 'Sarah Williams', buyerEmail: 'sarah@example.com', licenseType: 'basic', amount: 19.99, date: new Date(Date.now() - 259200000).toISOString(), invoiceNumber: 'INV-004', status: 'refunded' },
    { id: 's5', beatId: '1', buyerName: 'Alex Brown', buyerEmail: 'alex@example.com', licenseType: 'basic', amount: 29.99, date: new Date(Date.now() - 345600000).toISOString(), invoiceNumber: 'INV-005', status: 'paid' }
  ],
  clients: [
    { id: 'c1', name: 'John Doe', email: 'john@example.com', phone: '+1234567890', country: 'USA', totalPurchases: 1, totalSpent: 49.99, tags: ['rapper', 'frequent'], notes: 'Likes dark synthwave', createdAt: new Date().toISOString() },
    { id: 'c2', name: 'Jane Smith', email: 'jane@example.com', phone: '+0987654321', country: 'UK', totalPurchases: 1, totalSpent: 199.99, tags: ['singer', 'exclusive'], notes: 'Prefers drill beats', createdAt: new Date(Date.now() - 86400000).toISOString() },
    { id: 'c3', name: 'Mike Johnson', email: 'mike@example.com', phone: '+1122334455', country: 'Canada', totalPurchases: 1, totalSpent: 29.99, tags: ['producer'], notes: '', createdAt: new Date(Date.now() - 172800000).toISOString() },
    { id: 'c4', name: 'Sarah Williams', email: 'sarah@example.com', phone: '+5544332211', country: 'Australia', totalPurchases: 1, totalSpent: 19.99, tags: ['vlogger'], notes: 'Needs background music', createdAt: new Date(Date.now() - 259200000).toISOString() },
    { id: 'c5', name: 'Alex Brown', email: 'alex@example.com', phone: '+9988776655', country: 'Germany', totalPurchases: 1, totalSpent: 29.99, tags: ['rapper'], notes: '', createdAt: new Date(Date.now() - 345600000).toISOString() }
  ],
  licenses: [
    { id: 'l1', name: 'Basic Lease', price: 29.99, allowedUses: 'MP3, 50k streams', commercialUse: false, exclusivity: false, description: 'Standard MP3 lease for non-profit or small projects.', active: true },
    { id: 'l2', name: 'Premium Lease', price: 49.99, allowedUses: 'WAV, 500k streams', commercialUse: true, exclusivity: false, description: 'High quality WAV lease for commercial projects.', active: true },
    { id: 'l3', name: 'Trackout Lease', price: 99.99, allowedUses: 'WAV + Stems, 1M streams', commercialUse: true, exclusivity: false, description: 'Full track stems for professional mixing.', active: true },
    { id: 'l4', name: 'Exclusive', price: 199.99, allowedUses: 'Unlimited', commercialUse: true, exclusivity: true, description: 'Full ownership and exclusive rights.', active: true },
    { id: 'l5', name: 'Custom Beat', price: 299.99, allowedUses: 'Unlimited', commercialUse: true, exclusivity: true, description: 'Custom beat made from scratch.', active: false }
  ],
  posts: [
    { id: 'p1', platform: 'instagram', content: 'New beat "Midnight City" out now!', mediaUrl: '', scheduledAt: new Date().toISOString(), status: 'published', beatId: '1', engagementData: { likes: 120, shares: 15, comments: 8 } },
    { id: 'p2', platform: 'youtube', content: 'Making of "Neon Lights"', mediaUrl: '', scheduledAt: new Date(Date.now() + 86400000).toISOString(), status: 'scheduled', beatId: '2', engagementData: { likes: 0, shares: 0, comments: 0 } },
    { id: 'p3', platform: 'twitter', content: 'Just sold an exclusive license!', mediaUrl: '', scheduledAt: new Date(Date.now() - 172800000).toISOString(), status: 'published', beatId: '4', engagementData: { likes: 45, shares: 5, comments: 2 } },
    { id: 'p4', platform: 'tiktok', content: 'Listen to this drop 🔥', mediaUrl: '', scheduledAt: new Date(Date.now() + 172800000).toISOString(), status: 'draft', beatId: '4', engagementData: { likes: 0, shares: 0, comments: 0 } },
    { id: 'p5', platform: 'instagram', content: 'Studio session vibes 🎧', mediaUrl: '', scheduledAt: new Date(Date.now() - 259200000).toISOString(), status: 'published', beatId: null, engagementData: { likes: 250, shares: 30, comments: 45 } }
  ],
  collaborations: [
    { id: 'col1', collaboratorName: 'DJ Snake', role: 'mixer', beatId: '1', revenueShare: 15, status: 'completed', contactEmail: 'snake@example.com', notes: 'Great mix' },
    { id: 'col2', collaboratorName: 'Vocalist X', role: 'vocalist', beatId: '2', revenueShare: 50, status: 'active', contactEmail: 'vox@example.com', notes: 'Waiting for stems' },
    { id: 'col3', collaboratorName: 'Producer Y', role: 'producer', beatId: '3', revenueShare: 30, status: 'pending', contactEmail: 'prody@example.com', notes: 'Co-produced' },
    { id: 'col4', collaboratorName: 'Guitarist Z', role: 'guitarist', beatId: '5', revenueShare: 20, status: 'completed', contactEmail: 'guitar@example.com', notes: 'Acoustic session' },
    { id: 'col5', collaboratorName: 'Engineer A', role: 'mastering', beatId: '4', revenueShare: 10, status: 'active', contactEmail: 'eng@example.com', notes: 'Final master' }
  ],
  user: {
    name: 'Admin Producer',
    email: 'admin@deepbeat.com',
    password: 'password123',
    bio: 'Multi-platinum producer',
    producerTag: 'Deep Beat!',
    avatar: '',
    theme: 'purple',
    notifications: true
  }
};

export function useLocalStorage(key = 'deepbeat_v1') {
  const [data, setData] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        return JSON.parse(item);
      } else {
        window.localStorage.setItem(key, JSON.stringify(SEED_DATA));
        return SEED_DATA;
      }
    } catch (error) {
      console.error(error);
      return SEED_DATA;
    }
  });

  const [isLoading, setIsLoading] = useState(false);

  const setValue = (value) => {
    try {
      setIsLoading(true);
      const valueToStore = value instanceof Function ? value(data) : value;
      setData(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
      setTimeout(() => setIsLoading(false), 150);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const updateEntity = (entityName, newEntityList) => {
    setValue(prev => ({
      ...prev,
      [entityName]: newEntityList
    }));
  };

  return { data, updateEntity, setValue, isLoading };
}
