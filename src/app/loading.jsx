export default function Loading() {
  return (
    <div className="min-h-screen bg-[#1E201E] flex flex-col items-center justify-center">
      <div className="w-16 h-16 border-4 border-[#697565]/20 border-t-red-600 rounded-full animate-spin mb-4"></div>
      <p className="text-[#ecdfcc] font-medium animate-pulse">Loading SkillSphere...</p>
    </div>
  );
}