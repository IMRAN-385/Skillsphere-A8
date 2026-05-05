'use client';

import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

   const socialLinks = [
    {
      name: "Facebook",
      icon: "facebook",
      url: "https://facebook.com",
      color: "hover:text-blue-600"
    },
    {
      name: "Twitter",
      icon: "twitter",
      url: "https://twitter.com",
      color: "hover:text-blue-400"
    },
    {
      name: "LinkedIn",
      icon: "linkedin",
      url: "https://linkedin.com",
      color: "hover:text-blue-700"
    },
    {
      name: "Instagram",
      icon: "instagram",
      url: "https://instagram.com",
      color: "hover:text-pink-600"
    },
  ];
  const contactInfo = {
    email: "support@skillsphere.com",
    phone: "+1 (555) 123-4567",
    address: "Chattogram, Bangladesh",
  };

  return (
    <footer className="bg-background border-t border-border pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6 grid gap-16 md:grid-cols-4">
        
        <div className="col-span-1 md:col-span-1">
          <div className="font-black text-3xl tracking-tighter text-white mb-6">
            Skill<span className="text-primary">Sphere</span>
          </div>
          <p className="text-muted text-sm leading-relaxed mb-8">
            Empowering learners worldwide with industry-leading courses and expert mentorship. Build your future with SkillSphere.
          </p>
          <div className="flex gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-surface border border-border text-muted hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
              >
                <SocialIcon name={social.name} />
              </a>
            ))}
          </div>
        </div>

     
        <div>
          <h3 className="text-white font-black uppercase tracking-widest text-xs mb-8">
            Get in Touch
          </h3>
          <div className="space-y-4">
            <p className="text-sm flex items-center gap-3 text-muted">
              <Mail size={16} className="text-primary" /> {contactInfo.email}
            </p>
            <p className="text-sm flex items-center gap-3 text-muted">
              <Phone size={16} className="text-primary" /> {contactInfo.phone}
            </p>
            <p className="text-sm flex items-center gap-3 text-muted">
              <MapPin size={16} className="text-primary" /> {contactInfo.address}
            </p>
          </div>
        </div>

     
        <div>
          <h3 className="text-white font-black uppercase tracking-widest text-xs mb-8">
            Quick Links
          </h3>
          <ul className="space-y-4 text-sm font-bold">
            <li><Link href="/" className="text-muted hover:text-primary transition-colors">Home</Link></li>
            <li><Link href="/courses" className="text-muted hover:text-primary transition-colors">All Courses</Link></li>
            <li><Link href="/profile" className="text-muted hover:text-primary transition-colors">My Dashboard</Link></li>
            <li><Link href="/TrendingCourse" className="text-muted hover:text-primary transition-colors">New Releases</Link></li>
          </ul>
        </div>

      
        <div>
          <h3 className="text-white font-black uppercase tracking-widest text-xs mb-8">
            Legal
          </h3>
          <ul className="space-y-4 text-sm font-bold">
            <li><Link href="/terms" className="text-muted hover:text-primary transition-colors">Terms & Conditions</Link></li>
            <li><Link href="/privacy" className="text-muted hover:text-primary transition-colors">Privacy Policy</Link></li>
            <li><Link href="/about" className="text-muted hover:text-primary transition-colors">About Us</Link></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-24 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-muted text-[10px] font-bold uppercase tracking-widest">
          © {currentYear} SkillSphere. All rights reserved. Designed for Excellence.
        </p>
        <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest text-muted">
           <span>Status: Operational</span>
           <span>Version: 2.0.4</span>
        </div>
      </div>
    </footer>
  );
};
const SocialIcon = ({ name }) => {
  const icons = {
    Facebook: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073C24 5.404 18.627 0 12 0S0 5.404 0 12.073c0 6.018 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953h-1.514c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
    Twitter: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 9.98 9.98 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482A13.94 13.94 0 011.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
      </svg>
    ),
    LinkedIn: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zM3.555 9h3.564v11.452H3.555z"/>
      </svg>
    ),
    Instagram: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm4.25 5.5a4.75 4.75 0 100 9.5 4.75 4.75 0 000-9.5zm5.25-.88a1.13 1.13 0 11-2.26 0 1.13 1.13 0 012.26 0z"/>
      </svg>
    ),
  };

  return icons[name] || null;
};


export default Footer;