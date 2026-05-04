'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/Context/AuthContext';
import Link from 'next/link';

export default function ProfilePage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/LoginPage?redirect=/profile');
    }
  }, [user, loading]);

  if (loading) return (
    <div className="min-h-screen bg-[#3C3D37] flex items-center justify-center">
      <p className="text-white animate-pulse">Loading...</p>
    </div>
  );

  if (!user) return null;

  const avatarUrl = user?.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'U')}&background=dc2626&color=fff&size=200`;

  return (
    <div className="min-h-screen bg-[#3C3D37] py-16 px-4">
      <div className="max-w-xl mx-auto">

        {/* Profile Card */}
        <div className="bg-[#1e201e] rounded-3xl p-8 shadow-2xl text-center">

          {/* Avatar */}
          <div className="relative inline-block mb-6">
            <img
              src={avatarUrl}
              alt={user.name}
              className="w-28 h-28 rounded-full object-cover border-4 border-red-500 shadow-lg"
            />
          </div>

          {/* Info */}
          <h1 className="text-3xl font-bold text-white mb-1">{user.name}</h1>
          <p className="text-[#697565] mb-6">{user.email}</p>

          {/* Details */}
          <div className="bg-[#3C3D37] rounded-2xl p-5 text-left space-y-4 mb-8">
            <div className="flex items-center justify-between">
              <span className="text-[#697565] text-sm">Full Name</span>
              <span className="text-[#ecdfcc] font-medium">{user.name}</span>
            </div>
            <div className="h-px bg-[#697565]/20" />
            <div className="flex items-center justify-between">
              <span className="text-[#697565] text-sm">Email</span>
              <span className="text-[#ecdfcc] font-medium">{user.email}</span>
            </div>
            <div className="h-px bg-[#697565]/20" />
            <div className="flex items-center justify-between">
              <span className="text-[#697565] text-sm">Photo URL</span>
              <span className="text-[#ecdfcc] font-medium text-sm truncate max-w-[200px]">
                {user.image || 'Not set'}
              </span>
            </div>
          </div>

          {/* Buttons */}
          <div className="space-y-3">
            <Link
              href="/profile/update"
              className="block w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-xl transition text-center"
            >
              ✏️ Update Information
            </Link>
            <button
              onClick={() => { logout(); router.push('/'); }}
              className="w-full border border-red-500/40 hover:border-red-500 text-red-400 font-semibold py-3 rounded-xl transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}