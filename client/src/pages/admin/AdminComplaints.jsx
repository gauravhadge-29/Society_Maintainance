import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import StatusBadge from '../../components/StatusBadge';
import { Link } from 'react-router-dom';
import api from '../../api/axios';

const FILTER_OPTIONS = [
  { value: 'all',         label: 'All' },
  { value: 'open',        label: 'Open' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'resolved',    label: 'Resolved' },
  { value: 'overdue',     label: 'Overdue' },
];

export default function AdminComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await api.get('/admin/complaints');
        setComplaints(response.data.data || []);
      } catch (error) {
        console.error('Error fetching complaints:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchComplaints();
  }, []);

  const filteredComplaints = complaints.filter(c => {
    if (filter === 'all') return true;
    if (filter === 'overdue') return c.isOverdue && c.status !== 'resolved';
    return c.status === filter;
  });

  return (
    <div className="min-h-screen bg-surface flex flex-col md:flex-row">
      <Sidebar />
      <div className="flex-1 min-w-0">
        <Navbar />
        <main className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full animate-page">

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Complaints</h1>
              <p className="text-sm text-slate-500 mt-0.5">Manage and track all resident issues</p>
            </div>

            {/* Filter tabs */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
              {FILTER_OPTIONS.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => setFilter(opt.value)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 ${
                    filter === opt.value
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Results count */}
          <p className="text-xs text-slate-400 mb-3 font-medium">{filteredComplaints.length} complaint{filteredComplaints.length !== 1 ? 's' : ''}</p>

          {/* List */}
          <div className="bg-white rounded-xl border border-slate-200/60 overflow-hidden">
            {loading ? (
              <div className="p-12 flex justify-center"><div className="spinner" /></div>
            ) : filteredComplaints.length === 0 ? (
              <div className="p-12 text-center">
                <svg className="w-10 h-10 text-slate-300 mx-auto mb-3" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
                <p className="text-sm text-slate-500">No complaints matching this filter</p>
              </div>
            ) : (
              <ul className="divide-y divide-slate-100">
                {filteredComplaints.map(c => (
                  <li key={c._id}>
                    <Link to={`/complaints/${c._id}`} className="flex items-center justify-between gap-4 px-5 py-4 hover:bg-slate-50/80 transition-colors group">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-sm font-semibold text-slate-800 group-hover:text-primary-700 transition-colors truncate">{c.title}</p>
                          {c.isOverdue && c.status !== 'resolved' && (
                            <span className="text-[10px] font-semibold text-red-600 bg-red-50 border border-red-200 px-1.5 py-0.5 rounded-md uppercase flex-shrink-0">Overdue</span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500">
                          <span className="font-medium text-slate-600">{c.userId?.name || 'Resident'}</span>
                          {' · Flat '}{c.userId?.flatNo || 'N/A'}{' · '}{new Date(c.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <span className="text-[11px] font-medium text-slate-500 bg-slate-50 px-2 py-0.5 rounded-md uppercase hidden sm:inline-flex">{c.category}</span>
                        <StatusBadge status={c.status} />
                        <svg className="w-4 h-4 text-slate-300 group-hover:text-primary-400 transition-colors" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
