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
    <section className="bg-[#0b1b12] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Why Choose AgriConnect?
          </h2>
          <p className="mt-3 text-lg text-[#8ba898]">
            Built for Rwandan farmers and buyers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-[#14281d] border border-[#1e3b2b] rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/20 hover:border-[#2a4e3a]"
            >
              <div className="text-3xl mb-5">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-[#8ba898] text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}