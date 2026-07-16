import Link from "next/link";
import Image from "next/image";

export default function CTA() {
  return (
    <section className="relative px-4 pb-12 sm:px-6 lg:px-8 bg-transparent">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl sm:rounded-[2rem]">
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
        <div className="relative z-10 flex flex-col items-center justify-center px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="mb-6 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-white/10 shadow-lg backdrop-blur-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 sm:w-8 sm:h-8 text-white">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/>
              <path d="M2 12h20"/>
            </svg>
          </div>
          
          <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl xl:text-6xl max-w-3xl">
            Ready to bring your cooperative online?
          </h2>
          
          <p className="mx-auto mt-4 sm:mt-6 max-w-2xl text-base leading-7 sm:text-lg sm:leading-8 text-green-100 lg:text-xl">
            Join thousands of Rwandan farmers already selling on AgriConnect. Registration is free.
          </p>
          
          <div className="mt-8 flex w-full flex-col items-center gap-4 sm:mt-10 sm:w-auto sm:flex-row sm:justify-center">
            <Link
              href="/register"
              className="flex w-full justify-center rounded-xl bg-orange-500 px-8 py-4 text-sm font-bold text-black shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 transition-all duration-200 sm:w-auto"
            >
              Register Your Cooperative
            </Link>
            <Link
              href="/about"
              className="flex w-full justify-center rounded-xl border border-white/20 bg-white/10 px-8 py-4 text-sm font-semibold text-white shadow-sm backdrop-blur-sm hover:bg-white/20 transition-all duration-200 sm:w-auto"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
