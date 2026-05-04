'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/Context/AuthContext';
import { authClient } from '@/lib/auth-client';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function UpdateProfilePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/LoginPage?redirect=/profile/update');
    }
    if (user) {
      setName(user.name || '');
      setImageUrl(user.image || '');
    }
  }, [user, loading, router]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error('Name cannot be empty.');
      return;
    }

    setUpdating(true);

    try {
      await authClient.updateUser({
        name: name.trim(),
        image: imageUrl.trim() || undefined,
      });

      toast.success('Profile updated successfully!');
      setTimeout(() => router.push('/profile'), 1200);
    } catch (err) {
      toast.error('Failed to update profile. Please try again.');
      console.error(err);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#3C3D37] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-red-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  const previewAvatar = imageUrl ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(name || 'U')}&background=dc2626&color=fff&size=200`;

  return (
    <div className="min-h-screen bg-[#3C3D37] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md bg-[#1e201e] rounded-3xl p-8 shadow-2xl">

    
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-white">
            Skill<span className="text-red-500">Sphere</span>
          </h1>
          <p className="text-[#697565] mt-2 text-sm">Update your profile information</p>
        </div>

  
        <div className="flex justify-center mb-6">
          <img
            src={previewAvatar}
            alt="Preview"
            className="w-24 h-24 rounded-full object-cover border-4 border-red-500 shadow-lg"
            onError={(e) => {
              e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name || 'U')}&background=dc2626&color=fff&size=200`;
            }}
          />
        </div>

       
        <div className="space-y-4">
          <div>
            <label className="text-[#ecdfcc] text-sm font-medium mb-1 block">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="w-full bg-[#3C3D37] text-white px-4 py-3 rounded-xl border border-[#697565]/30 focus:outline-none focus:border-red-500 transition placeholder-[#697565]"
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
              className="w-full bg-[#3C3D37] text-white px-4 py-3 rounded-xl border border-[#697565]/30 focus:outline-none focus:border-red-500 transition placeholder-[#697565]"
            />
          </div>

          <button
            onClick={handleUpdate}
            disabled={updating}
            className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition mt-2"
          >
            {updating ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Updating...
              </span>
            ) : (
              'Update Information'
            )}
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