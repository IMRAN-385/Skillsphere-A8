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

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/courses", label: "Courses" },
    { href: "/profile", label: "My Profile" },
    { href: "/TrendingCourse", label: "New Release" },
  ];

  const avatarUrl = user?.image ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'U')}&background=dc2626&color=fff`;

  return (
    <nav className={`bg-[#1E201E] relative z-50 transition-shadow ${isScrolled ? 'shadow-lg shadow-black/30' : ''}`}>
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-center h-16 sm:h-20">

          
          <Link href="/" className="flex items-center gap-2">
            <div className="font-black text-lg sm:text-2xl tracking-tight text-white">
              Skill<span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">Sphere</span>
            </div>
          </Link>

      
          <div className="hidden md:flex items-center gap-8 lg:gap-12">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-all relative group ${
                  isActive(link.href) ? "text-red-500" : "text-white hover:text-red-400"
                }`}
              >
                {link.label}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-red-500 transition-all duration-300 ${
                  isActive(link.href) ? "w-full" : "w-0 group-hover:w-full"
                }`} />
              </Link>
            ))}
          </div>

         
          <div className="flex items-center gap-3">
            {!user ? (
              <div className="hidden sm:flex items-center gap-2">
                <Link
                  href="/login"
                  className="px-4 py-2 text-white text-sm font-semibold rounded-lg border border-[#697565]/40 hover:border-red-500 transition"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-lg transition"
                >
                  Register
                </Link>
              </div>
            ) : (
              <div className="hidden sm:block relative" data-dropdown>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 group"
                >
                  <img
                    src={avatarUrl}
                    alt={user.name || 'User'}
                    className="w-10 h-10 rounded-full object-cover border-2 border-[#697565] group-hover:border-red-500 transition"
                    onError={(e) => {
                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'U')}&background=dc2626&color=fff`;
                    }}
                  />
                  <span className="text-white text-sm font-medium">{user.name}</span>
                  <svg className={`w-4 h-4 text-[#697565] transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-[#1e201e] border border-[#697565]/30 rounded-2xl shadow-2xl py-2 z-50">
                    <div className="px-4 py-3 border-b border-[#697565]/20">
                      <p className="font-semibold text-white text-sm truncate">{user.name}</p>
                      <p className="text-xs text-[#697565] truncate">{user.email}</p>
                    </div>
                    <Link href="/profile" className="block px-4 py-2 text-sm text-[#ecdfcc] hover:bg-[#3C3D37] hover:text-red-400 transition rounded-lg mx-1 mt-1">
                      My Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-[#3C3D37] transition border-t border-[#697565]/20 mt-1 rounded-b-2xl"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}

    
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg hover:bg-[#3C3D37] transition text-white"
              aria-label="Toggle menu"
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
          <div className="md:hidden border-t border-[#697565]/20 bg-[#1e201e] py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-4 py-3 rounded-lg font-medium transition-all ${
                  isActive(link.href) ? "bg-red-500/10 text-red-400" : "text-[#ecdfcc] hover:bg-[#3C3D37]"
                }`}
              >
                {link.label}
              </Link>
            ))}

            {!user ? (
              <div className="pt-2 space-y-2 px-2">
                <Link href="/login" className="block px-4 py-3 text-center text-white border border-[#697565]/40 rounded-lg hover:border-red-500 transition">
                  Login
                </Link>
                <Link href="/register" className="block px-4 py-3 text-center bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition">
                  Register
                </Link>
              </div>
            ) : (
              <div className="pt-2 border-t border-[#697565]/20 space-y-1">
                <div className="flex items-center gap-3 px-4 py-3">
                  <img
                    src={avatarUrl}
                    alt={user.name || 'User'}
                    className="w-10 h-10 rounded-full object-cover"
                    onError={(e) => {
                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'U')}&background=dc2626&color=fff`;
                    }}
                  />
                  <div>
                    <p className="font-semibold text-white text-sm truncate max-w-[180px]">{user.name}</p>
                    <p className="text-xs text-[#697565] truncate max-w-[180px]">{user.email}</p>
                  </div>
                </div>
                <Link href="/profile" className="block px-4 py-2 text-sm text-[#ecdfcc] hover:bg-[#3C3D37] rounded transition">
                  My Profile
                </Link>
                <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-[#3C3D37] rounded transition">
                  Logout
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