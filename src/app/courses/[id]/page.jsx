import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Star, User, Clock, ArrowLeft, BookOpen, Award, Users, PlayCircle } from "lucide-react";

async function getCourses() {
  const res = await fetch("https://skillspheree.vercel.app/data.json", {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("Failed to fetch courses");
  return res.json();
}

const CourseDetailPage = async ({ params }) => {
  const { id } = await params;

  let data = [];
  try {
    data = await getCourses();
  } catch {
    notFound();
  }

  const course = data.find((c) => String(c.id) === String(id));
  if (!course) notFound();

  return (
    <div className="bg-background min-h-screen pb-24">

      {/* ── Hero ──────────────────────────────────────── */}
      <div className="relative pt-24 sm:pt-32 pb-0 overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
          <div className="absolute top-0 right-0 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-primary/10 rounded-full blur-[100px] sm:blur-[140px]" />
          <div className="absolute top-0 left-0 w-[200px] sm:w-[400px] h-[200px] sm:h-[400px] bg-primary/5 rounded-full blur-[80px] sm:blur-[120px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          {/* Back button */}
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 text-muted hover:text-white text-xs sm:text-sm font-black uppercase tracking-widest transition-colors mb-8 sm:mb-12 group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Courses
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

            {/* Left — Info */}
            <div>
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="px-3 py-1 bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest rounded-full">
                  {course.level}
                </span>
                <span className="px-3 py-1 bg-white/5 border border-white/10 text-muted text-[10px] font-black uppercase tracking-widest rounded-full">
                  {course.category ?? "Course"}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-6">
                {course.title}
              </h1>

              {/* Description */}
              <p className="text-muted text-sm sm:text-base leading-relaxed font-medium mb-8">
                {course.description}
              </p>

              {/* Rating row */}
              <div className="flex items-center gap-3 mb-8">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i <= Math.floor(course.rating) ? "text-primary fill-primary" : "text-white/10"}
                    />
                  ))}
                </div>
                <span className="text-white font-black text-sm">{course.rating}</span>
                <span className="text-muted text-xs font-bold">
                  ({course.reviews ?? "1,200+"} reviews)
                </span>
              </div>

              {/* Instructor */}
              <div className="flex items-center gap-4 p-4 sm:p-5 bg-surface/50 border border-white/5 rounded-2xl sm:rounded-3xl mb-8">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-background border border-white/5 flex items-center justify-center shrink-0">
                  <User size={22} className="text-primary" />
                </div>
                <div>
                  <p className="text-muted text-[10px] font-black uppercase tracking-widest mb-1">Lead Mentor</p>
                  <p className="text-white font-black text-base sm:text-lg leading-none">{course.instructor}</p>
                </div>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-10">
                {[
                  { icon: Clock, label: "Duration", value: course.duration },
                  { icon: BookOpen, label: "Lessons", value: course.lessons ?? "24+" },
                  { icon: Users, label: "Students", value: course.students ?? "2.4k" },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex flex-col items-center gap-1.5 p-3 sm:p-4 bg-surface/50 border border-white/5 rounded-xl sm:rounded-2xl text-center">
                    <Icon size={18} className="text-primary" />
                    <p className="text-white font-black text-sm sm:text-base leading-none">{value}</p>
                    <p className="text-muted text-[9px] sm:text-[10px] font-black uppercase tracking-widest">{label}</p>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white font-black uppercase tracking-widest text-xs px-8 py-5 rounded-2xl transition-all shadow-xl shadow-primary/20 active:scale-95">
                  <PlayCircle size={18} />
                  Enroll Now
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 bg-surface hover:bg-white/10 text-white font-black uppercase tracking-widest text-xs px-8 py-5 rounded-2xl transition-all border border-white/10">
                  <Award size={18} className="text-primary" />
                  Get Certificate
                </button>
              </div>
            </div>

            {/* Right — Image */}
            <div className="relative w-full aspect-[4/3] rounded-[2rem] sm:rounded-[3rem] overflow-hidden shadow-2xl lg:sticky lg:top-32">
              <Image
                src={course.image}
                alt={course.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />

              {/* Floating badge */}
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                <div className="bg-background/80 backdrop-blur-xl border border-white/10 px-4 py-2.5 rounded-2xl">
                  <p className="text-muted text-[9px] font-black uppercase tracking-widest mb-0.5">Price</p>
                  <p className="text-white font-black text-lg leading-none">
                    {course.price ?? "Free"}
                  </p>
                </div>
                <div className="bg-primary/90 backdrop-blur-xl px-4 py-2.5 rounded-2xl">
                  <p className="text-white font-black text-[10px] uppercase tracking-widest">Enroll Today</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── What you'll learn ─────────────────────────── */}
      {course.whatYouLearn && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-20 sm:mt-28">
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-8">
            What You'll <span className="text-primary">Learn</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {course.whatYouLearn.map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-4 bg-surface/50 border border-white/5 rounded-xl sm:rounded-2xl">
                <div className="w-5 h-5 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center shrink-0 mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                </div>
                <p className="text-muted text-sm font-medium leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default CourseDetailPage;