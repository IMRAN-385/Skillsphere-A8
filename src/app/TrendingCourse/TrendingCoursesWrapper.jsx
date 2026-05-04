'use client';

import { useEffect, useState } from "react";


const TrendingCoursesWrapper = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 800);
  }, []);

  if (loading) {
    return <p className="text-center text-white py-10">Loading courses...</p>;
  }

  return <TrendingCourses />;
};

export default TrendingCoursesWrapper;