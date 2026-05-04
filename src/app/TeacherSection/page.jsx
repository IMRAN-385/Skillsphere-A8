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
    <div className="min-h-screen bg-olive-700 py-12 px-6">
      <div className="max-w-9xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-3">
            Our Expert Instructors
          </h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            Learn from the best industry professionals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {data.map((teacher) => (
            <div
              key={teacher.id}
              className="group bg-olive-600 rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-gray-400">
              <div className="relative h-72 overflow-hidden">
                <Image
                  src={teacher.image}
                  alt={teacher.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

               
                <div className="absolute top-5 right-5 bg-[#ECDFCC] px-4 py-1.5 rounded-2xl flex items-center gap-1 shadow-lg z-10">
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                  <span className="font-bold text-lg text-gray-800">{teacher.rating}</span>
                </div>

        
                <div className="absolute bottom-6 left-6 right-6 z-10">
                  <h3 className="text-white text-3xl font-bold tracking-tight">
                    {teacher.name}
                  </h3>
                  <p className="text-blue-200 text-lg font-medium">{teacher.title}</p>
                </div>
              </div>

            
              <div className="p-7">
                
                <div className="mb-6">
                  <span className="inline-block px-5 py-2 bg-gray-300 text-blue-700 text-sm font-medium rounded-full">
                    {teacher.expertise}
                  </span>
                </div>

              
                <div className="grid grid-cols-2 gap-6 ">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <BookOpen className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-gray-900">{teacher.courses}</p>
                      <p className="text-xs font-bold uppercase tracking-widest text-gray-900">Courses</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-200 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <Users className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-gray-900">
                        {(teacher.students / 1000).toFixed(1)}k
                      </p>
                      <p className="text-xs font-bold uppercase tracking-widest text-gray-900">Students</p>
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