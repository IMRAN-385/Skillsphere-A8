'use client';

import { Suspense, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { signIn } from "@/lib/auth-client";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";

function LoginForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const redirectTo = searchParams.get("redirect") || "/";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
  e.preventDefault();

  if (!email || !password) {
    toast.error("Please fill in all fields.");
    return;
  }

  // ✅ Demo login check
  if (email === "demo@skillsphere.com" && password === "123456") {
    toast.success("Demo login successful!");
    
    // fake user set (optional: localStorage)
    localStorage.setItem("user", JSON.stringify({
      email: "demo@skillsphere.com",
      name: "Demo User"
    }));

    router.push(redirectTo);
    return;
  }

  // 🔵 Real login (optional)
  setLoading(true);
  const { error } = await signIn.email({ email, password });
  setLoading(false);

  if (error) {
    toast.error(error.message || "Login failed.");
  } else {
    toast.success("Logged in!");
    router.push(redirectTo);
  }
};
  const handleGoogle = async () => {
    await signIn.social({ provider: "google", callbackURL: redirectTo });
  };

  return (
    <div className="min-h-screen bg-[#3C3D37] flex items-center justify-center px-4">
      <Toaster position="top-center" />
      <div className="w-full max-w-md bg-[#1e201e] rounded-3xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-white">Skill<span className="text-red-500">Sphere</span></h1>
          <p className="text-[#697565] mt-2 text-sm">Welcome back! Please login.</p>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-[#ecdfcc] text-sm font-medium mb-1 block">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com"
              className="w-full bg-[#3C3D37] text-white px-4 py-3 rounded-xl border border-[#697565]/30 focus:outline-none focus:border-red-500 transition" />
          </div>
          <div>
            <label className="text-[#ecdfcc] text-sm font-medium mb-1 block">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••"
              className="w-full bg-[#3C3D37] text-white px-4 py-3 rounded-xl border border-[#697565]/30 focus:outline-none focus:border-red-500 transition" />
          </div>
          <div className="bg-[#3C3D37] border border-[#697565]/30 rounded-xl px-4 py-3 text-sm text-[#697565]">
  <p>📧 Demo Email: <span className="text-[#ecdfcc]">demo@skillsphere.com</span></p>
  <p>🔑 Demo Password: <span className="text-[#ecdfcc]">123456</span></p>
</div>
          <button onClick={handleLogin} disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition">
            {loading ? "Logging in..." : "Login"}
          </button>
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-[#697565]/30" />
            <span className="text-[#697565] text-xs">OR</span>
            <div className="flex-1 h-px bg-[#697565]/30" />
          </div>
          <button onClick={handleGoogle}
            className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-3 rounded-xl transition">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>
        </div>
        <p className="text-center text-[#697565] text-sm mt-6">
          Don't have an account?{" "}
          <Link href="/register" className="text-red-400 hover:text-red-300 font-medium">Register here</Link>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return <Suspense><LoginForm /></Suspense>;
}