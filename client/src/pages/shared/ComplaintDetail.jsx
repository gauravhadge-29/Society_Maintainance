import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import StatusBadge, { getStatusColor } from '../../components/StatusBadge';
import ImageModal from '../../components/ImageModal';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../api/axios';
import { useAuth } from '../../context/AuthContext';

export default function ComplaintDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  // Admin update states
  const [updateStatus, setUpdateStatus] = useState('');
  const [updateRemark, setUpdateRemark] = useState('');
  const [updating, setUpdating] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const fetchComplaint = async () => {
    try {
      const response = await api.get(`/complaints/${id}`);
      setComplaint(response.data.data);
      setUpdateStatus(response.data.data.status);
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching complaint details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaint();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!updateStatus) return;
    setUpdating(true);
    setUpdateSuccess(false);
    try {
      await api.patch(`/admin/complaints/${id}`, {
        status: updateStatus,
        remark: updateRemark
      });
      setUpdateRemark('');
      setUpdateSuccess(true);
      await fetchComplaint();
      setTimeout(() => setUpdateSuccess(false), 3000);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update complaint');
    } finally {
      setUpdating(false);
    }
  };

  const isAdmin = user?.role === 'admin';

  const Shell = ({ children }) => (
    <div className={`min-h-screen bg-surface ${isAdmin ? 'flex md:flex-row' : ''}`}>
      {isAdmin && <Sidebar />}
      <div className={isAdmin ? 'flex-1 min-w-0' : 'w-full'}>
        <Navbar />
        {children}
      </div>
      <ImageModal src={selectedImage} onClose={() => setSelectedImage(null)} />
    </div>
  );

  if (loading) {
    return (
      <Shell>
        <main className="flex-1 flex justify-center items-center py-20">
          <div className="spinner" />
        </main>
      </Shell>
    );
  }

  if (error || !complaint) {
    return (
      <Shell>
        <main className="flex-1 flex flex-col items-center justify-center py-20 px-4">
          <svg className="w-12 h-12 text-slate-300 mb-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" /></svg>
          <p className="text-slate-600 font-medium mb-4">{error || 'Complaint not found'}</p>
          <button onClick={() => navigate(-1)} className="text-sm font-semibold text-primary-600 hover:text-primary-700">← Go back</button>
        </main>
      </Shell>
    );
  }

  return (
    <Shell>
      <main className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto w-full animate-page">

        {/* Back button */}
        <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 font-medium mb-6 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
          Back
        </button>

        {/* Complaint card */}
        <div className="bg-white rounded-xl border border-slate-200/60 overflow-hidden mb-6 shadow-sm">
          <div className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="text-[11px] font-semibold text-primary-600 bg-primary-50 px-2 py-0.5 rounded-md uppercase">{complaint.category}</span>
                  <span className="text-xs text-slate-400">Submitted {new Date(complaint.createdAt).toLocaleDateString()}</span>
                </div>
                <h1 className="text-xl font-bold text-slate-900">{complaint.title}</h1>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <StatusBadge status={complaint.status} size="lg" />
                {complaint.isOverdue && complaint.status !== 'resolved' && (
                  <span className="text-[11px] font-semibold text-red-600 bg-red-50 border border-red-200 px-2.5 py-1 rounded-full">Overdue</span>
                )}
              </div>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">{complaint.description}</p>
          </div>

          {/* Photos */}
          {complaint.photo && complaint.photo.length > 0 && (
            <div className="px-6 sm:px-8 py-5 border-t border-slate-100 bg-slate-50/50">
              <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Attachments</h3>
              <div className="flex flex-wrap gap-3">
                {complaint.photo.map((photoUrl, idx) => (
                  <button key={idx} onClick={() => setSelectedImage(photoUrl)}
                    className="w-24 h-24 rounded-lg border border-slate-200 overflow-hidden hover:opacity-80 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 shadow-sm">
                    <img src={photoUrl} alt={`Attachment ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Admin Action Box */}
        {isAdmin && complaint.status !== 'resolved' && (
          <div className="bg-primary-50/50 border border-primary-100 rounded-xl p-5 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.385-5.386a2.4 2.4 0 010-3.394l.176-.176a2.4 2.4 0 013.394 0l1.81 1.81 1.81-1.81a2.4 2.4 0 013.395 0l.176.176a2.4 2.4 0 010 3.394l-5.38 5.386a.503.503 0 01-.712 0z" /></svg>
              <h3 className="text-sm font-semibold text-primary-900">Update Status</h3>
            </div>

            {updateSuccess && (
              <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-100 text-emerald-700 px-4 py-2.5 rounded-lg text-sm font-medium mb-4 animate-page">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Complaint updated successfully!
              </div>
            )}

            <form onSubmit={handleUpdate} className="flex flex-col sm:flex-row gap-3">
              <select value={updateStatus} onChange={(e) => setUpdateStatus(e.target.value)}
                className="flex-1 px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500">
                <option value="open">Open</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
              </select>
              <input type="text" value={updateRemark} onChange={(e) => setUpdateRemark(e.target.value)} placeholder="Add a remark..."
                className="flex-[2] px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-sm placeholder:text-slate-400 transition-all focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500" />
              <button type="submit" disabled={updating}
                className="px-5 py-2.5 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white text-sm font-semibold rounded-xl shadow-sm transition-all duration-200 flex items-center gap-2 justify-center">
                {updating && <div className="spinner" style={{ width: '0.875rem', height: '0.875rem', borderWidth: '2px', borderTopColor: 'white', borderColor: 'rgba(255,255,255,0.3)' }} />}
                {updating ? 'Saving...' : 'Update'}
              </button>
            </form>
          </div>
        )}

        {/* Timeline */}
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-slate-900 mb-4">Status History</h3>
          <div className="relative pl-6 border-l-2 border-slate-200 space-y-5">
            {complaint.history && complaint.history.length > 0 ? (
              [...complaint.history].reverse().map((hist, idx) => {
                const config = getStatusColor(hist.status);
                return (
                  <div key={hist._id || idx} className="relative">
                    <div className={`absolute -left-[25px] mt-1 w-3 h-3 rounded-full ${config.dot} ring-4 ring-white`} />
                    <div className="bg-white rounded-lg border border-slate-200/60 p-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                        <span className="text-sm font-semibold text-slate-800">{hist.remark || 'Status Update'}</span>
                        <span className="text-[11px] text-slate-400 font-medium">{new Date(hist.createdAt).toLocaleString()}</span>
                      </div>
                      <p className="text-xs text-slate-500">
                        Status set to <StatusBadge status={hist.status} />
                        {hist.changedBy?.name && <span className="ml-1">by {hist.changedBy.name}</span>}
                      </p>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-sm text-slate-400 ml-2">No history available.</div>
            )}
          </div>
        </div>
      </main>
    </Shell>
  );
}
