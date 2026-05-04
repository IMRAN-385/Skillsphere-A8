'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/Context/AuthContext';
import { authClient } from '@/lib/auth-client';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { User, Image as ImageIcon, ArrowLeft, Save, Sparkles, Camera } from 'lucide-react';

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
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-surface border-t-primary rounded-full animate-spin mb-6" />
        <p className="text-muted font-black uppercase tracking-[0.4em] text-[10px] animate-pulse">Initializing Editor</p>
      </div>
    );
  }

  if (!user) return null;

  const previewAvatar = imageUrl ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(name || 'U')}&background=E63946&color=fff&size=200`;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6 py-24 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-2xl bg-surface border border-border rounded-[2.5rem] md:rounded-[3.5rem] p-8 md:p-16 shadow-2xl relative z-10 mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 rounded-full border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-6">
            <Sparkles size={12} /> Profile Editor
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter mb-4">
            Update <span className="text-primary">Profile</span>
          </h1>
          <p className="text-muted text-sm font-medium">Refine your identity across the SkillSphere campus</p>
        </div>

        {/* Avatar Preview */}
        <div className="flex justify-center mb-12">
          <div className="relative group">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10 w-32 h-32 rounded-full p-1 bg-gradient-to-tr from-primary to-surface border border-white/10 shadow-2xl overflow-hidden">
              <img
                src={previewAvatar}
                alt="Preview"
                className="w-full h-full rounded-full object-cover bg-background"
                onError={(e) => {
                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name || 'U')}&background=E63946&color=fff&size=200`;
                }}
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer">
                 <Camera size={24} className="text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleUpdate} className="space-y-8">
          <div className="space-y-3">
            <label className="text-[10px] font-black text-muted uppercase tracking-[0.4em] ml-2 block">
               Display Name
            </label>
            <div className="relative flex items-center">
              <div className="absolute left-6 text-muted group-focus-within:text-primary transition-colors">
                <User size={20} />
              </div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full bg-background/50 text-white pl-16 pr-6 py-5 rounded-3xl border border-border focus:border-primary/50 focus:outline-none transition-all font-bold placeholder-muted/50 shadow-inner"
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black text-muted uppercase tracking-[0.4em] ml-2 block">
               Avatar URL <span className="text-muted/40 font-bold ml-1">(Optional)</span>
            </label>
            <div className="relative flex items-center">
              <div className="absolute left-6 text-muted group-focus-within:text-primary transition-colors">
                <ImageIcon size={20} />
              </div>
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://example.com/avatar.jpg"
                className="w-full bg-background/50 text-white pl-16 pr-6 py-5 rounded-3xl border border-border focus:border-primary/50 focus:outline-none transition-all font-bold placeholder-muted/50 shadow-inner"
              />
            </div>
          </div>

          <div className="pt-4 space-y-4">
            <button
              type="submit"
              disabled={updating}
              className="w-full bg-primary hover:bg-primary-hover disabled:opacity-60 text-white font-black uppercase tracking-[0.2em] text-xs py-5 rounded-3xl shadow-xl shadow-primary/20 transition-all transform active:scale-[0.98] flex items-center justify-center gap-3"
            >
              {updating ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Saving Changes...
                </>
              ) : (
                <>
                  <Save size={18} /> Update Profile
                </>
              )}
            </button>

            <Link
              href="/profile"
              className="w-full flex items-center justify-center gap-2 text-muted hover:text-white font-black uppercase tracking-[0.2em] text-[10px] py-4 transition-all"
            >
              <ArrowLeft size={16} /> Cancel Changes
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}