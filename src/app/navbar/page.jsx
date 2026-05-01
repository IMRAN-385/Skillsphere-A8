'use client';

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const NavPage = () => {
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const handleSignOut = () => {
    setUser(null);
    setIsOpen(false);
    console.log("User signed out");
   
  };

  const handleSignIn = () => {

    setUser({
      name: "John Doe",
      email: "john@example.com",
      image: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
    });
  };

  const isActive = (href) => pathname === href;

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/courses", label: "Courses" },
    { href: "/profile", label: "My Profile" },
  ];

  return (
    <nav className="bg-[#1E201E]">
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-center h-16 sm:h-20">

          <Link href="/" className="flex items-center gap-2 group">
            <div className="font-black text-lg sm:text-2xl tracking-tight">
              Skill{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600 group-hover:from-red-600 group-hover:to-red-700 transition-all">
                Sphere
              </span>
            </div>
          </Link>

          
          <div className="hidden md:flex items-center gap-8 lg:gap-12">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-all relative group ${
                  isActive(link.href)
                    ? "text-red-600"
                    : "text-white-700 hover:text-red-400"
                }`}
              >
                {link.label}
                <span
                  className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-red-500 to-red-600 transition-all duration-300 ${
                    isActive(link.href) ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            {!user ? (
              <button
                onClick={handleSignIn}
                className="hidden sm:block px-4 py-2 bg-[#3C3D37] text-white text-sm font-semibold rounded-lg hover:shadow-lg hover:shadow-red-500/30 transition-all duration-200 hover:scale-105"
              >
                Sign In
              </button>
            ) : (
              <div className="hidden sm:flex items-center gap-3">
                <span className="text-sm text-gray-700 font-medium">{user.name}</span>
              </div>
            )}

           
            {user && (
              <div className="hidden sm:block relative group">
                <button className="flex items-center justify-center w-10 h-10 rounded-full bg-white border-2 border-gray-200 hover:border-red-400 transition-all hover:shadow-md overflow-hidden">
                  <img
                    src={user.image}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                </button>

            
                <div className="absolute right-0 mt-0 w-56 bg-white rounded-xl shadow-xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="font-semibold text-gray-900 text-sm">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                  >
                    Profile Settings
                  </Link>
                  <Link
                    href="/dashboard"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors border-t border-gray-100 mt-2"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            )}

            
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              <svg
                className={`w-6 h-6 transition-transform duration-300 ${
                  isOpen ? "rotate-90" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        
        {isOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block px-4 py-3 rounded-lg font-medium transition-all ${
                    isActive(link.href)
                      ? "bg-red-100 text-red-600"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              {!user && (
                <button
                  onClick={handleSignIn}
                  className="w-full mt-4 px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
                >
                  Sign In
                </button>
              )}

              {user && (
                <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
                  <div className="flex items-center gap-3 px-4 py-3">
                    <img
                      src={user.image}
                      alt={user.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                  </div>
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 rounded transition-colors"
                  >
                    Profile Settings
                  </Link>
                  <Link
                    href="/dashboard"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 rounded transition-colors"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavPage;
