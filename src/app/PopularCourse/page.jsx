'use client';

export const dynamic = 'force-dynamic';

const popularCourses = [
  {
    id: 1,
    title: "JavaScript Basics",
    description: "Learn JavaScript fundamentals",
    image: "/course1.jpg"
  },
  {
    id: 2,
    title: "React Mastery",
    description: "Master React framework",
    image: "/course2.jpg"
  },

];

export default function Page() {
  return (
    <div className="min-h-screen">
      {popularCourses.map((course) => (
        <div key={course.id}>{course.title}</div>
      ))}
    </div>
  );
}