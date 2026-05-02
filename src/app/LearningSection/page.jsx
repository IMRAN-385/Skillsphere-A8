import React from "react";

const learningPage = () => {
  return (
   <section className="bg-olive-700 py-12">
  <div className="max-w-7xl mx-auto px-5">

    
    <h2 className="text-3xl font-bold text-center mb-8">
       Learning Tips for Your Courses
    </h2>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

    
      <div className="bg-olive-800 p-6 rounded-2xl shadow-md hover:shadow-lg transition">
        <h3 className="text-xl font-semibold mb-3"> Stay Consistent</h3>
        <p>
          Study a little every day instead of cramming. Consistency helps you retain concepts better in any course.
        </p>
      </div>

      
      <div className="bg-olive-800 p-6 rounded-2xl shadow-md hover:shadow-lg transition">
        <h3 className="text-xl font-semibold mb-3"> Take Smart Notes</h3>
        <p>
          Summarize key concepts in your own words while watching lessons. This improves understanding and recall.
        </p>
      </div>

      
      <div className="bg-olive-800 p-6 rounded-2xl shadow-md hover:shadow-lg transition">
        <h3 className="text-xl font-semibold mb-3"> Manage Your Time</h3>
        <p>
          Set a study schedule for each course and stick to it. Break tasks into smaller goals.
        </p>
      </div>

      <div className="bg-olive-800 p-6 rounded-2xl shadow-md hover:shadow-lg transition">
        <h3 className="text-xl font-semibold mb-3"> Practice What You Learn</h3>
        <p >
          Apply concepts through projects or exercises. Practice is key, especially for coding courses.
        </p>
      </div>

      
      <div className="bg-olive-800 p-6 rounded-2xl shadow-md hover:shadow-lg transition">
        <h3 className="text-xl font-semibold mb-3"> Ask Questions</h3>
        <p>
          Don’t hesitate to ask in discussions or communities when you're stuck.
        </p>
      </div>

      <div className="bg-olive-800 p-6 rounded-2xl shadow-md hover:shadow-lg transition">
        <h3 className="text-xl font-semibold mb-3"> Track Your Progress</h3>
        <p>
          Keep track of completed lessons and milestones to stay motivated.
        </p>
      </div>

    </div>
  </div>
</section>
  );
};

export default learningPage;
