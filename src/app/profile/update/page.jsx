'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/Context/AuthContext';
import Link from 'next/link';

export default function UpdateProfilePage() {
  const { user, loading, login } = useAuth();
  const router = useRouter();

  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/LoginPage');
    }
    if (user) {
      setName(user.name || '');
      setImageUrl(user.image || '');
    }
  }, [user, loading]);

  const handleUpdate = (e) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Name cannot be empty.');
      return;
    }

    // Update user in context + localStorage
    login({ ...user, name: name.trim(), image: imageUrl.trim() || null });
    setSuccess(true);

    setTimeout(() => {
      router.push('/profile');
    }, 1500);
  };

  if (loading) return (
    <div className="min-h-screen bg-[#3C3D37] flex items-center justify-center">
      <p className="text-white animate-pulse">Loading...</p>
    </div>
  );

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#3C3D37] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md bg-[#1e201e] rounded-3xl p-8 shadow-2xl">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-white">
            Skill<span className="text-red-500">Sphere</span>
          </h1>
          <p className="text-[#697565] mt-2 text-sm">Update your profile information.</p>
        </div>

        {/* Success */}
        {success && (
          <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm px-4 py-3 rounded-xl mb-6">
            ✅ Profile updated! Redirecting...
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-xl mb-6">
            {error}
          </div>
        )}

        {/* Preview Avatar */}
        <div className="flex justify-center mb-6">
          <img
            src={imageUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(name || 'U')}&background=dc2626&color=fff&size=200`}
            alt="Preview"
            className="w-20 h-20 rounded-full object-cover border-4 border-red-500"
          />
        </div>

        {/* Form */}
        <div className="space-y-4">
          <div>
            <label className="text-[#ecdfcc] text-sm font-medium mb-1 block">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="w-full bg-[#3C3D37] text-white px-4 py-3 rounded-xl border border-[#697565]/30 focus:outline-none focus:border-red-500 transition"
            />
          </div>

          <div>
            <label className="text-[#ecdfcc] text-sm font-medium mb-1 block">
              Image URL <span className="text-[#697565] font-normal">(optional)</span>
            </label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/photo.jpg"
              className="w-full bg-[#3C3D37] text-white px-4 py-3 rounded-xl border border-[#697565]/30 focus:outline-none focus:border-red-500 transition"
            />
          </div>

          <button
            onClick={handleUpdate}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-xl transition mt-2"
          >
            Update Information
          </button>

          <Link
            href="/profile"
            className="block w-full text-center border border-[#697565]/40 hover:border-red-500 text-[#697565] hover:text-red-400 font-semibold py-3 rounded-xl transition"
          >
            ← Back to Profile
          </Link>
        </div>
      </div>
    </div>
  );
}