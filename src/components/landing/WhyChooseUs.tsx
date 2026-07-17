export default function WhyChooseUs() {
  const features = [
    {
      title: "Verified Cooperatives",
      description: "Every cooperative is government registered and quality-audited before listing.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-green-600">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/>
          <path d="m9 12 2 2 4-4"/>
        </svg>
      ),
    },
    {
      title: "Fair Pricing",
      description: "No middlemen. Farmers set fair prices and buyers get transparent deals.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-green-600">
          <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/>
          <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/>
          <path d="M12 18V6"/>
        </svg>
      ),
    },
    {
      title: "Kinyarwanda Support",
      description: "Full platform support in both Kinyarwanda and English for all users.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-green-600">
          <path d="m5 8 6 6"/>
          <path d="m4 14 6-6 2-3"/>
          <path d="M2 5h12"/>
          <path d="M7 2h1"/>
          <path d="m22 22-5-10-5 10"/>
          <path d="M14 18h6"/>
        </svg>
      ),
    },
    {
      title: "Nationwide Delivery",
      description: "Reliable logistics network across all 30 districts of Rwanda.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-green-600">
          <path d="M5 18H3c-.6 0-1-.4-1-1V7c0-.6.4-1 1-1h10c.6 0 1 .4 1 1v11"/>
          <path d="M14 9h4l4 4v4c0 .6-.4 1-1 1h-2"/>
          <circle cx="7" cy="18" r="2"/>
          <path d="M15 18H9"/>
          <circle cx="17" cy="18" r="2"/>
        </svg>
      ),
    }
  ];

  return (
    <section className="bg-surface-alt py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 border-y border-border">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-ink sm:text-4xl">
            Why Choose AgriConnect?
          </h2>
          <p className="mt-3 text-lg text-ink-muted">
            Built for Rwandan farmers and buyers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-surface-card border border-border rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-500/5 hover:border-brand-500/30"
            >
              <div className="text-3xl mb-5">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold text-ink mb-3">
                {feature.title}
              </h3>
              <p className="text-ink-muted text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}