export default function WhyChooseUs() {
  const features = [
    {
      title: "Verified Cooperatives",
      description: "Every cooperative is government registered and quality-audited before listing.",
      icon: "✅",
    },
    {
      title: "Fair Pricing",
      description: "No middlemen. Farmers set fair prices and buyers get transparent deals.",
      icon: "💰",
    },
    {
      title: "Kinyarwanda Support",
      description: "Full platform support in both Kinyarwanda and English for all users.",
      icon: "🗣️",
    },
    {
      title: "Nationwide Delivery",
      description: "Reliable logistics network across all 30 districts of Rwanda.",
      icon: "🚚",
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