'use client';

import { Suspense, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { signIn } from "@/lib/auth-client";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "@/Context/AuthContext";
import { Mail, Lock, LogIn, ArrowRight, ShieldCheck, UserCheck } from "lucide-react";

function LoginForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const redirectTo = searchParams.get("redirect") || "/";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { loginDemoUser } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (email === "demo@skillsphere.com" && password === "123456") {
      toast.success("Demo login successful!");
      loginDemoUser({
        email: "demo@skillsphere.com",
        name: "Demo User"
      });
      router.push(redirectTo);
      return;
    }

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
    <div className="min-h-[calc(100vh-80px)] bg-background flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      
      <Toaster position="top-center" />
      
      <div className="w-full max-w-[480px] z-10">
        <div className="bg-surface/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 sm:p-12 shadow-2xl">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-6 text-primary">
              <ShieldCheck size={32} />
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-2">
              Skill<span className="text-primary">Sphere</span>
            </h1>
            <p className="text-muted text-sm font-medium">Welcome back! Access your learning dashboard.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <label className="text-foreground/80 text-sm font-semibold ml-1 flex items-center gap-2">
                <Mail size={14} className="text-primary" /> Email Address
              </label>
              <div className="relative group">
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  placeholder="you@example.com"
                  className="w-full bg-surface/50 text-white px-5 py-4 rounded-2xl border border-white/10 focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all duration-300 placeholder:text-muted/50" 
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-foreground/80 text-sm font-semibold flex items-center gap-2">
                  <Lock size={14} className="text-primary" /> Password
                </label>
                <Link href="#" className="text-xs text-primary hover:underline font-medium">Forgot?</Link>
              </div>
              <div className="relative group">
                <input 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  placeholder="••••••••"
                  className="w-full bg-surface/50 text-white px-5 py-4 rounded-2xl border border-white/10 focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all duration-300 placeholder:text-muted/50" 
                />
              </div>
            </div>

            {/* Demo Credentials Alert */}
            <div className="bg-primary/5 border border-primary/10 rounded-2xl p-4 flex gap-4 items-start">
              <div className="mt-0.5 text-primary">
                <UserCheck size={18} />
              </div>
              <div className="text-xs space-y-1">
                <p className="text-white/90 font-bold">Try our Demo Account</p>
                <p className="text-muted leading-relaxed">
                  Email: <span className="text-foreground/90 font-mono">demo@skillsphere.com</span><br />
                  Pass: <span className="text-foreground/90 font-mono">123456</span>
                </p>
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary-hover disabled:opacity-60 text-white font-bold py-4 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-primary/20 group"
            >
              {loading ? "Verifying..." : (
                <>
                  <span>Sign In</span>
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
            New to SkillSphere?{" "}
            <Link href="/register" className="text-primary hover:text-primary-hover font-bold transition-colors">Create Account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return <Suspense><LoginForm /></Suspense>;
}