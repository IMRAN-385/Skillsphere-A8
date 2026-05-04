import Image from "next/image";
import { Star, BookOpen, Users } from "lucide-react";

export const dynamic = "force-dynamic";

const TeacherPage = async () => {
  let data = [];

  try {
    const res = await fetch("https://skillsphere-a8-55lz.vercel.app/data2.json", {
      cache: "no-store",
      next: { revalidate: 0 }
    });

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    data = await res.json();
  } catch (error) {
    console.error("Error fetching teachers:", error);
  }

  return (
    <div className="bg-background py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <p className="text-primary font-black uppercase tracking-[0.4em] text-xs mb-4">The Faculty</p>
          <h2 className="text-4xl md:text-7xl font-black text-white mb-6 tracking-tighter">
            Expert <span className="text-primary">Instructors</span>
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto leading-relaxed">
            Our courses are led by industry giants and world-class professionals who are passionate about sharing their knowledge.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {data.map((teacher) => (
            <div
              key={teacher.id}
              className="group bg-surface rounded-[2rem] overflow-hidden border border-border hover:border-primary/30 transition-all duration-500 hover:-translate-y-2"
            >
              <div className="relative h-80 overflow-hidden m-2 rounded-[1.5rem]">
                <Image
                  src={teacher.image}
                  alt={teacher.name}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-60" />

                <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-md px-3 py-1.5 rounded-xl flex items-center gap-1 border border-white/10 z-10">
                  <Star className="w-3 h-3 text-primary fill-primary" />
                  <span className="font-black text-xs text-white">{teacher.rating}</span>
                </div>

                <div className="absolute bottom-5 left-5 right-5 z-10">
                  <h3 className="text-white text-2xl font-black tracking-tighter group-hover:text-primary transition-colors">
                    {teacher.name}
                  </h3>
                  <p className="text-primary text-[10px] font-black uppercase tracking-widest mt-1">{teacher.title}</p>
                </div>
              </div>

              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-8">
                  <span className="px-3 py-1 bg-surface-hover text-muted text-[10px] font-bold uppercase tracking-wider rounded-lg border border-border">
                    {teacher.expertise}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 border-t border-border pt-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-surface-hover rounded-xl flex items-center justify-center flex-shrink-0 border border-border">
                      <BookOpen className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xl font-black text-white leading-none">{teacher.courses}</p>
                      <p className="text-[10px] font-bold uppercase tracking-tighter text-muted">Courses</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-surface-hover rounded-xl flex items-center justify-center flex-shrink-0 border border-border">
                      <Users className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xl font-black text-white leading-none">
                        {(teacher.students / 1000).toFixed(1)}k
                      </p>
                      <p className="text-[10px] font-bold uppercase tracking-tighter text-muted">Students</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeacherPage;