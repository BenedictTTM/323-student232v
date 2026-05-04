import React from 'react';

const UnderHero = () => {
  return (
    <section className="px-4 py-12 md:py-16">
      <div className="max-w-7xl mx-auto bg-[#0a0b0d] rounded-[3rem] overflow-hidden flex flex-col md:flex-row items-center min-h-[500px]">
        {/* Left Visual Area - Video */}
        <div className="w-full md:w-1/2 h-64 md:h-[500px] rounded-lg p-10 relative flex items-center justify-center overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="aspect-square h-full object-cover rounded-4xl shadow-2xl "
          >
            <source src="https://static-assets.coinbase.com/marketing/videos/mar_2026_stock_perpetuals_4x3.webm" type="video/webm" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Right Content Area */}
        <div className="w-full md:w-1/2 p-10 md:p-16 flex flex-col items-start text-left">
          <h2 className="text-4xl md:text-4xl lg:text-5xl font-semibold tracking-wide text-white leading-[1.1] tracking-tight">
            Trade stock and metal perps, get paid
          </h2>
          <p className="mt-6 text-gray-400 text-lg md:text-lg font-medium leading-relaxed max-w-lg">
            Trade stock, gold, and silver perpetuals with up to 25x leverage. 
            Grab your share of a $200K reward pool by trading at least $1M before 15 May (23:59 UTC).
          </p>
          <button className="mt-10 px-10 py-4 bg-white text-black rounded-full font-bold text-lg hover:bg-gray-100 transform active:scale-95 transition-all shadow-lg hover:shadow-white/10">
            Learn more
          </button>
        </div>
      </div>
    </section>
  );
};

export default UnderHero;
