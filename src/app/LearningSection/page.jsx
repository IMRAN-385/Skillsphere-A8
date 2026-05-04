const learningPage = () => {
  return (
    <section className="bg-background py-24 px-5">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-16">
          <p className="text-primary font-black uppercase tracking-[0.4em] text-xs mb-4">Student Success</p>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter">
            Learning <span className="text-primary">Tips</span>
          </h2>
          <div className="w-24 h-1 bg-primary mt-6 rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Stay Consistent",
              desc: "Study a little every day instead of cramming. Consistency helps you retain concepts better in any course.",
              icon: "📅"
            },
            {
              title: "Take Smart Notes",
              desc: "Summarize key concepts in your own words while watching lessons. This improves understanding and recall.",
              icon: "📝"
            },
            {
              title: "Manage Your Time",
              desc: "Set a study schedule for each course and stick to it. Break tasks into smaller goals.",
              icon: "⏱"
            },
            {
              title: "Practice What You Learn",
              desc: "Apply concepts through projects or exercises. Practice is key, especially for coding courses.",
              icon: "💻"
            },
            {
              title: "Ask Questions",
              desc: "Don’t hesitate to ask in discussions or communities when you're stuck. Learning is social.",
              icon: "🙋‍♂️"
            },
            {
              title: "Track Your Progress",
              desc: "Keep track of completed lessons and milestones to stay motivated on your journey.",
              icon: "📊"
            }
          ].map((tip, i) => (
            <div key={i} className="group bg-surface p-10 rounded-[2rem] border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-2xl">
              <div className="text-4xl mb-6 grayscale group-hover:grayscale-0 transition-all">{tip.icon}</div>
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-primary transition-colors">{tip.title}</h3>
              <p className="text-muted leading-relaxed text-sm">
                {tip.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default learningPage;