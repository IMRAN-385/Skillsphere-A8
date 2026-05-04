'use client';

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/Context/AuthContext";

const NavPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const navLinks = [
    { label: "Home", href: "/" },
    { label: "All Course", href: "/courses" },
    { label: "Trending Course", href: "/TrendingCourse" },
    ...(user ? [{ label: "My Profile", href: "/profile" }] : []),
  ];


  const avatarUrl = user?.photoURL || user?.image || `https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=random`;


  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setDropdownOpen(false);
  }, [pathname]);


  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownOpen && !e.target.closest('[data-dropdown]')) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownOpen]);

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  const isActive = (href) => pathname === href;

  return (
    <nav className={`bg-[#0F110F]/90 backdrop-blur-md sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'border-b border-white/10 shadow-2xl' : ''}`}>
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-center h-20 sm:h-24">

          <Link href="/" className="flex items-center gap-2 group">
            <div className="font-black text-2xl sm:text-3xl tracking-tighter text-white transition-transform group-hover:scale-105">
              Skill<span className="text-primary">Sphere</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-semibold transition-all relative py-2 ${isActive(link.href) ? "text-primary" : "text-muted hover:text-white"
                  }`}
              >
                {link.label}
                <span className={`absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300 ${isActive(link.href) ? "w-full" : "w-0 hover:w-full"
                  }`} />
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {!user ? (
              <div className="hidden sm:flex items-center gap-3">
                <Link
                  href="/login"
                  className="px-6 py-2.5 text-white text-sm font-bold rounded-xl border border-border hover:bg-surface transition-all"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="px-6 py-2.5 bg-primary hover:bg-primary-hover text-white text-sm font-bold rounded-xl shadow-lg shadow-primary/20 transition-all"
                >
                  Join Now
                </Link>
              </div>
            ) : (
              <div className="hidden sm:block relative" data-dropdown>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-3 p-1.5 rounded-2xl hover:bg-surface transition-all group"
                >
                  <img
                    src={avatarUrl}
                    alt={user.name || 'User'}
                    className="w-10 h-10 rounded-xl object-cover border-2 border-border group-hover:border-primary transition-all"
                  />
                  <div className="hidden lg:block text-left">
                    <p className="text-white text-xs font-bold leading-none">{user.name}</p>
                    <p className="text-muted text-[10px] mt-1 font-medium">Student</p>
                  </div>
                  <svg className={`w-4 h-4 text-muted transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-3 w-64 bg-surface border border-border rounded-3xl shadow-2xl py-3 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-5 py-3 border-b border-border mb-2">
                      <p className="font-bold text-white text-sm truncate">{user.name}</p>
                      <p className="text-xs text-muted truncate">{user.email}</p>
                    </div>
                    <Link href="/profile" className="flex items-center px-5 py-2.5 text-sm text-foreground hover:bg-surface-hover hover:text-primary transition-all mx-2 rounded-xl">
                      My Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-[calc(100%-16px)] text-left px-5 py-2.5 text-sm text-primary hover:bg-red-500/10 transition-all mx-2 mt-2 rounded-xl border-t border-border"
                    >
                      Logout Account
                    </button>
                  </div>
                )}
              </div>
            )}

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden inline-flex items-center justify-center w-12 h-12 rounded-xl bg-surface border border-border transition-all text-white"
            >
              <svg className={`w-6 h-6 transition-transform duration-300 ${isOpen ? "rotate-90" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden border-t border-border bg-background py-6 space-y-2 animate-in slide-in-from-top duration-300">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-5 py-4 rounded-2xl font-bold transition-all ${isActive(link.href) ? "bg-primary/10 text-primary" : "text-foreground hover:bg-surface"
                  }`}
              >
                {link.label}
              </Link>
            ))}

            {!user ? (
              <div className="pt-4 space-y-3 px-2">
                <Link href="/login" className="block w-full py-4 text-center text-white border border-border rounded-2xl hover:bg-surface font-bold">
                  Login
                </Link>
                <Link href="/register" className="block w-full py-4 text-center bg-primary text-white font-bold rounded-2xl shadow-lg shadow-primary/20">
                  Register
                </Link>
              </div>
            ) : (
              <div className="pt-4 border-t border-border space-y-2">
                <div className="flex items-center gap-4 px-5 py-4">
                  <img src={avatarUrl} alt={user.name} className="w-12 h-12 rounded-xl object-cover border-2 border-border" />
                  <div>
                    <p className="font-bold text-white truncate max-w-[180px]">{user.name}</p>
                    <p className="text-xs text-muted truncate max-w-[180px]">{user.email}</p>
                  </div>
                </div>
                <button onClick={handleLogout} className="w-full text-left px-5 py-3 text-sm font-bold text-primary hover:bg-red-500/10 rounded-2xl transition-all">
                  Logout Account
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavPage;