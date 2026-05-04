'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signUp, signIn } from '@/lib/auth-client';
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';
import { User, Mail, Link as LinkIcon, Lock, UserPlus, ArrowRight, UserCheck } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: '',
    email: '',
    photoUrl: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      toast.error("All fields required.");
      return;
    }

    if (form.password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(form.email)) {
      toast.error("Invalid email.");
      return;
    }

    setLoading(true);

    try {
      const { error } = await signUp.email({
        name: form.name,
        email: form.email,
        password: form.password,
        image: form.photoUrl || undefined,
      });

      if (error) {
        toast.error(error.message || "Registration failed.");
      } else {
        toast.success("Registered successfully!");
        router.push('/login');
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong.");
    }

    setLoading(false);
  };

  const handleGoogle = async () => {
    await signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-background flex items-center justify-center px-4 py-16 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <Toaster position="top-center" />

      <div className="w-full max-w-[520px] z-10">
        <div className="bg-surface/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 sm:p-12 shadow-2xl">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-6 text-primary">
              <UserPlus size={32} />
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-2">
              Skill<span className="text-primary">Sphere</span>
            </h1>
            <p className="text-muted text-sm font-medium">Join our community of lifelong learners.</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-foreground/80 text-sm font-semibold ml-1 flex items-center gap-2">
                  <User size={14} className="text-primary" /> Full Name
                </label>
                <input 
                  type="text" 
                  name="name"
                  value={form.name} 
                  onChange={handleChange} 
                  placeholder="John Doe"
                  className="w-full bg-surface/50 text-white px-5 py-4 rounded-2xl border border-white/10 focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all duration-300 placeholder:text-muted/50" 
                />
              </div>

              <div className="space-y-2">
                <label className="text-foreground/80 text-sm font-semibold ml-1 flex items-center gap-2">
                  <Mail size={14} className="text-primary" /> Email
                </label>
                <input 
                  type="email" 
                  name="email"
                  value={form.email} 
                  onChange={handleChange} 
                  placeholder="you@example.com"
                  className="w-full bg-surface/50 text-white px-5 py-4 rounded-2xl border border-white/10 focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all duration-300 placeholder:text-muted/50" 
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-foreground/80 text-sm font-semibold ml-1 flex items-center gap-2">
                <LinkIcon size={14} className="text-primary" /> Photo URL (Optional)
              </label>
              <input 
                type="url" 
                name="photoUrl"
                value={form.photoUrl} 
                onChange={handleChange} 
                placeholder="https://example.com/photo.jpg"
                className="w-full bg-surface/50 text-white px-5 py-4 rounded-2xl border border-white/10 focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all duration-300 placeholder:text-muted/50" 
              />
            </div>

            <div className="space-y-2">
              <label className="text-foreground/80 text-sm font-semibold ml-1 flex items-center gap-2">
                <Lock size={14} className="text-primary" /> Password
              </label>
              <input 
                type="password" 
                name="password"
                value={form.password} 
                onChange={handleChange} 
                placeholder="Min. 6 characters"
                className="w-full bg-surface/50 text-white px-5 py-4 rounded-2xl border border-white/10 focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all duration-300 placeholder:text-muted/50" 
              />
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary-hover disabled:opacity-60 text-white font-bold py-4 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-primary/20 group"
            >
              {loading ? "Creating Account..." : (
                <>
                  <span>Create Account</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/5"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-surface/0 px-4 text-muted font-bold tracking-widest backdrop-blur-md">Or continue with</span>
              </div>
            </div>

            <button 
              type="button"
              onClick={handleGoogle}
              className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-100 text-[#0F110F] font-bold py-4 rounded-2xl transition-all duration-300 shadow-xl"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span>Google Account</span>
            </button>
          </form>

          <p className="text-center text-muted text-sm mt-10 font-medium">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:text-primary-hover font-bold transition-colors">Sign In here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}