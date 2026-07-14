import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import StatusBadge from '../../components/StatusBadge';
import { Link } from 'react-router-dom';
import api from '../../api/axios';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [statsRes, complaintsRes] = await Promise.all([
          api.get('/admin/dashboard'),
          api.get('/admin/complaints')
        ]);
        setStats(statsRes.data.data);
        setComplaints(complaintsRes.data.data || []);
      } catch (error) {
        console.error('Error fetching admin data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  const overdueComplaints = complaints.filter(c => c.isOverdue && c.status !== 'resolved');
  const recentComplaints = complaints.filter(c => !c.isOverdue || c.status === 'resolved').slice(0, 8);

  const STAT_ITEMS = [
    { label: 'Total',    value: stats?.totalComplaints || 0,   color: 'slate',   icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" /></svg> },
    { label: 'Open',     value: stats?.openComplaints || 0,    color: 'amber',   icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg> },
    { label: 'Resolved', value: stats?.resolvedComplaints || 0,color: 'emerald', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
    { label: 'Overdue',  value: stats?.overdueComplaints || 0, color: 'red',     icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
  ];

  return (
    <div className="min-h-screen bg-surface flex flex-col md:flex-row">
      <Sidebar />
      <div className="flex-1 min-w-0">
        <Navbar />
        <main className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full animate-page">

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
            <p className="text-sm text-slate-500 mt-0.5">Overview of society operations</p>
          </div>

          {loading ? (
            <div className="flex justify-center py-20"><div className="spinner" /></div>
          ) : (
            <>
              {/* Stats Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {STAT_ITEMS.map(item => (
                  <div key={item.label} className={`bg-white rounded-xl border border-slate-200/60 p-5 hover:shadow-sm transition-shadow ${item.color === 'red' ? 'border-red-200/60 bg-red-50/40' : ''}`}>
                    <div className="flex items-center justify-between mb-3">
                      <div className={`p-2 rounded-lg bg-${item.color}-50 text-${item.color}-600`}>{item.icon}</div>
                    </div>
                    <p className={`text-3xl font-bold ${item.color === 'red' ? 'text-red-700' : 'text-slate-900'}`}>{item.value}</p>
                    <p className="text-xs font-medium text-slate-500 mt-0.5">{item.label} Complaints</p>
                  </div>
                ))}
              </div>

              {/* Overdue Section */}
              <div className="bg-white rounded-xl border border-slate-200/60 overflow-hidden mb-6">
                <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <h3 className="text-sm font-semibold text-slate-900">Attention Required</h3>
                    <span className="text-[11px] font-medium text-red-600 bg-red-50 px-2 py-0.5 rounded-full">{overdueComplaints.length} overdue</span>
                  </div>
                  <Link to="/admin/complaints" className="text-xs font-semibold text-primary-600 hover:text-primary-700 transition-colors">View all →</Link>
                </div>
                {overdueComplaints.length === 0 ? (
                  <div className="p-8 text-center text-sm text-slate-400">No overdue complaints 🎉</div>
                ) : (
                  <ul className="divide-y divide-slate-100">
                    {overdueComplaints.slice(0, 5).map(c => (
                      <li key={c._id}>
                        <Link to={`/complaints/${c._id}`} className="flex items-center justify-between gap-4 px-5 py-4 hover:bg-slate-50/80 transition-colors group">
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-slate-800 group-hover:text-primary-700 transition-colors truncate">{c.title}</p>
                            <p className="text-xs text-slate-500 mt-0.5">
                              {c.userId?.name || 'Resident'} · Flat {c.userId?.flatNo || 'N/A'} · {new Date(c.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <span className="text-[10px] font-semibold text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded-full uppercase">Overdue</span>
                            <svg className="w-4 h-4 text-slate-300 group-hover:text-primary-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Recent Complaints Section */}
              <div className="bg-white rounded-xl border border-slate-200/60 overflow-hidden">
                <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-slate-900">Recent Complaints</h3>
                  <Link to="/admin/complaints" className="text-xs font-semibold text-primary-600 hover:text-primary-700 transition-colors">See all</Link>
                </div>
                {recentComplaints.length === 0 ? (
                  <div className="p-8 text-center text-sm text-slate-400">No complaints found.</div>
                ) : (
                  <ul className="divide-y divide-slate-100">
                    {recentComplaints.map(c => (
                      <li key={c._id}>
                        <Link to={`/complaints/${c._id}`} className="flex items-center justify-between gap-4 px-5 py-4 hover:bg-slate-50/80 transition-colors group">
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-slate-800 group-hover:text-primary-700 transition-colors truncate">{c.title}</p>
                            <p className="text-xs text-slate-500 mt-0.5">
                              {c.userId?.name || 'Resident'} · Flat {c.userId?.flatNo || 'N/A'} · {new Date(c.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <StatusBadge status={c.status} />
                            <svg className="w-4 h-4 text-slate-300 group-hover:text-primary-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
