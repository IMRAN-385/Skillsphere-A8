'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signUp, signIn } from '@/lib/auth-client';
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';

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

    // validation
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
        router.push('/login'); // ✅ FIXED
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
    <div className="min-h-screen bg-[#3C3D37] flex items-center justify-center px-4 py-10">
      <Toaster position="top-center" />

      <div className="w-full max-w-md bg-[#1e201e] rounded-3xl p-8 shadow-2xl">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-white">
            Skill<span className="text-red-500">Sphere</span>
          </h1>
          <p className="text-[#697565] mt-2 text-sm">
            Create your account.
          </p>
        </div>

        {/* Form */}
        <div className="space-y-4">

          {/* Name */}
          <div>
            <label className="text-[#ecdfcc] text-sm mb-1 block">Full Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full bg-[#3C3D37] text-white px-4 py-3 rounded-xl border border-[#697565]/30 focus:outline-none focus:border-red-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-[#ecdfcc] text-sm mb-1 block">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full bg-[#3C3D37] text-white px-4 py-3 rounded-xl border border-[#697565]/30 focus:outline-none focus:border-red-500"
            />
          </div>

          {/* Photo */}
          <div>
            <label className="text-[#ecdfcc] text-sm mb-1 block">
              Photo URL (optional)
            </label>
            <input
              type="url"
              name="photoUrl"
              value={form.photoUrl}
              onChange={handleChange}
              placeholder="https://example.com/photo.jpg"
              className="w-full bg-[#3C3D37] text-white px-4 py-3 rounded-xl border border-[#697565]/30 focus:outline-none focus:border-red-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-[#ecdfcc] text-sm mb-1 block">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full bg-[#3C3D37] text-white px-4 py-3 rounded-xl border border-[#697565]/30 focus:outline-none focus:border-red-500"
            />
          </div>

          {/* Register Button */}
          <button
            onClick={handleRegister}
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white py-3 rounded-xl"
          >
            {loading ? "Registering..." : "Register"}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-[#697565]/30" />
            <span className="text-[#697565] text-xs">OR</span>
            <div className="flex-1 h-px bg-[#697565]/30" />
          </div>

          {/* Google */}
          <button
            onClick={handleGoogle}
            className="w-full bg-white text-gray-800 py-3 rounded-xl hover:bg-gray-100"
          >
            Continue with Google
          </button>
        </div>

        {/* Login link */}
        <p className="text-center text-[#697565] text-sm mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-red-400">
            Login here
          </Link>
        </p>

      </div>
    </div>
  );
}