import { Suspense } from "react";
import TrendingCourses from "./TrendingCourses";

export default function Page() {
  return (
    <div>
      <Suspense
        fallback={
          <div className="flex justify-center py-20 text-white">
            Loading trending courses...
          </div>
        }
      >
        <TrendingCourses />
      </Suspense>
    </div>
  );
}