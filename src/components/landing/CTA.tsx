import Link from "next/link";
import Image from "next/image";

export default function CTA() {
  return (
    <section className="relative px-5 pb-12 lg:px-8 bg-transparent">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem]">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-bg.png"
            alt="Farm background"
            fill
            className="object-cover"
            priority
          />
          {/* Green Gradient Overlay */}
          <div className="absolute inset-0 bg-green-800/80 bg-gradient-to-t from-[#081f14]/80 to-green-700/80 mix-blend-multiply" />
          <div className="absolute inset-0 bg-green-900/60" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center px-6 py-20 text-center sm:py-24 lg:px-8">
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 shadow-lg backdrop-blur-sm">
            <span className="text-3xl">🤝</span>
          </div>
          
          <h2 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl max-w-3xl">
            Ready to bring your cooperative online?
          </h2>
          
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-green-100 sm:text-xl">
            Join thousands of Rwandan farmers already selling on AgriConnect. Registration is free.
          </p>
          
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/register"
              className="rounded-xl bg-orange-500 px-8 py-4 text-sm font-bold text-black shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 transition-all duration-200"
            >
              Register Your Cooperative
            </Link>
            <Link
              href="/about"
              className="rounded-xl border border-white/20 bg-white/10 px-8 py-4 text-sm font-semibold text-white shadow-sm backdrop-blur-sm hover:bg-white/20 transition-all duration-200"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
