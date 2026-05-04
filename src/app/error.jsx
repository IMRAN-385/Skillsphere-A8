'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#3C3D37] flex items-center justify-center px-4">
      <div className="text-center bg-[#1e201e] p-12 rounded-3xl shadow-2xl border border-red-500/20 max-w-lg w-full">
        <div className="text-7xl mb-6">⚠️</div>
        <h2 className="text-3xl font-black text-white mb-4 tracking-tighter">
          Something went <span className="text-red-500">wrong!</span>
        </h2>
        <p className="text-[#697565] mb-8 text-lg">
          An unexpected error occurred. Don't worry, our team has been notified.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-4 rounded-2xl transition shadow-lg shadow-red-600/20"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="w-full sm:w-auto border border-[#697565]/40 hover:border-red-500 text-white font-bold px-8 py-4 rounded-2xl transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}