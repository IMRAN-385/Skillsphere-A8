import { Suspense } from "react";
import PopularCourse from "./PopularCourse/page";
import Banner from "./Banner/page";
import LearningPage from "./LearningSection/page";
import TeacherPage from "./TeacherSection/page";
import UserWelcome from "@/components/UserWelcome";

const CourseSkeleton = () => (
  <div className="bg-[#1E201E] py-16 px-5">
    <div className="max-w-7xl mx-auto text-center">
      <div className="h-10 w-64 bg-[#3C3D37] rounded-lg mx-auto mb-12 animate-pulse" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-[#1e201e] border border-[#3c3d37] rounded-3xl h-96 animate-pulse" />
        ))}
      </div>
    </div>
  </div>
);

export default function Home() {
  return (
    <div className="flex flex-col">
      <UserWelcome />
      <Banner />
      <Suspense fallback={<CourseSkeleton />}>
        <PopularCourse />
      </Suspense>
      <Suspense fallback={<div className="h-96 bg-[#1E201E] animate-pulse" />}>
        <TeacherPage />
      </Suspense>
      <Suspense fallback={<div className="h-96 bg-[#1E201E] animate-pulse" />}>
        <LearningPage />
      </Suspense>
    </div>
  );
}