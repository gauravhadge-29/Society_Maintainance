import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';

const CATEGORIES = [
  { value: 'water',       label: 'Plumbing / Water', icon: '💧' },
  { value: 'electricity', label: 'Electricity',      icon: '⚡' },
  { value: 'security',    label: 'Security',         icon: '🛡️' },
  { value: 'sanitation',  label: 'Housekeeping',     icon: '🧹' },
  { value: 'parking',     label: 'Parking',          icon: '🅿️' },
  { value: 'lift',        label: 'Lift',             icon: '🛗' },
  { value: 'other',       label: 'Other',            icon: '📋' },
];

export default function CreateComplaint() {
  const [formData, setFormData] = useState({ title: '', category: 'water', description: '' });
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    if (e.target.files) setFiles(Array.from(e.target.files));
  };

  const removeFile = (idx) => {
    setFiles(prev => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('category', formData.category);
      data.append('description', formData.description);

      if (files.length > 5) {
        throw new Error('You can only upload up to 5 photos.');
      }

      files.forEach(file => data.append('photo', file));

      await api.post('/complaints', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      navigate('/resident/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to submit complaint');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface">
      <Navbar />
      <main className="max-w-2xl mx-auto py-8 px-4 sm:px-6 lg:px-8 animate-page">

        {/* Back */}
        <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 font-medium mb-6 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
          Back
        </button>

        <div className="bg-white rounded-xl border border-slate-200/60 overflow-hidden shadow-sm">
          {/* Header */}
          <div className="px-6 py-6 border-b border-slate-100">
            <h1 className="text-xl font-bold text-slate-900">Raise a Complaint</h1>
            <p className="text-sm text-slate-500 mt-1">Provide details so we can resolve the issue quickly.</p>
          </div>

          <form className="p-6 space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="flex items-center gap-3 bg-red-50 border border-red-100 text-red-700 px-4 py-3 rounded-xl text-sm font-medium animate-page" role="alert">
                <svg className="w-5 h-5 text-red-400 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" /></svg>
                {error}
              </div>
            )}

            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-1.5">Issue Title</label>
              <input id="title" type="text" name="title" value={formData.title} onChange={handleInputChange} required
                className="block w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-slate-900 text-sm placeholder:text-slate-400 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 hover:border-slate-400"
                placeholder="e.g., Leaking pipe in the kitchen" />
            </div>

            {/* Category chips */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map(cat => (
                  <button key={cat.value} type="button" onClick={() => setFormData({ ...formData, category: cat.value })}
                    className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium border transition-all duration-200 ${
                      formData.category === cat.value
                        ? 'bg-primary-50 border-primary-300 text-primary-700 shadow-sm'
                        : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                    }`}>
                    <span className="text-base leading-none">{cat.icon}</span>
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-1.5">Description</label>
              <textarea id="description" rows="4" name="description" value={formData.description} onChange={handleInputChange} required
                className="block w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-slate-900 text-sm placeholder:text-slate-400 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 hover:border-slate-400 resize-none"
                placeholder="Describe the issue in detail..." />
            </div>

            {/* File upload */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Photos <span className="text-slate-400 font-normal">(optional, max 5)</span>
              </label>
              <div className="border-2 border-dashed border-slate-200 rounded-xl hover:border-primary-400 hover:bg-primary-50/30 transition-all duration-200 cursor-pointer relative">
                <div className="p-6 text-center">
                  <svg className="mx-auto h-8 w-8 text-slate-400 mb-2" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5a1.5 1.5 0 001.5-1.5V5.25a1.5 1.5 0 00-1.5-1.5H3.75a1.5 1.5 0 00-1.5 1.5V19.5a1.5 1.5 0 001.5 1.5z" />
                  </svg>
                  <p className="text-sm text-slate-600 font-medium">
                    {files.length > 0 ? `${files.length} file(s) selected` : 'Click to upload'}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">PNG, JPG, GIF up to 5MB each</p>
                </div>
                <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" multiple accept="image/png, image/jpeg, image/gif" onChange={handleFileChange} />
              </div>

              {/* Selected files */}
              {files.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {files.map((file, idx) => (
                    <div key={idx} className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-600">
                      <span className="truncate max-w-[120px]">{file.name}</span>
                      <button type="button" onClick={() => removeFile(idx)} className="text-slate-400 hover:text-red-500 transition-colors" aria-label="Remove file">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Submit */}
            <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100">
              <button type="button" onClick={() => navigate(-1)} className="px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-800 transition-colors">Cancel</button>
              <button type="submit" disabled={loading}
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white text-sm font-semibold rounded-xl shadow-sm shadow-primary-600/20 hover:shadow-md transition-all duration-200">
                {loading && <div className="spinner" style={{ width: '1rem', height: '1rem', borderWidth: '2px', borderTopColor: 'white', borderColor: 'rgba(255,255,255,0.3)' }} />}
                {loading ? 'Submitting...' : 'Submit Complaint'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
