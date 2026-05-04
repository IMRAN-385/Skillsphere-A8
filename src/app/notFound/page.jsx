import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#3C3D37] flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-9xl font-black text-red-500 mb-4">404</h1>
        <h2 className="text-3xl font-bold text-white mb-4">Page Not Found</h2>
        <p className="text-[#697565] mb-8 text-lg">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Link
          href="/"
          className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3 rounded-xl transition"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}