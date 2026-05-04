import { useState } from "react";

export default function Hero() {
  const [email, setEmail] = useState("");

  return (
    <section className="bg-white py-8 md:py-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
        {/* Left — phone mockup */}
        <div className="w-full md:w-1/2 flex flex-col items-center px-6">
          <img
            src="https://images.ctfassets.net/o10es7wu5gm1/4lbSrfvF333XkPz7WycixQ/afbeefb68eab9405594b2e9bfbb9a152/Hero__4_.png?fm=webp&w=3000&h=2800&q=75"
            alt="Coinbase app showing portfolio"
            className="w-full max-w-2xl rounded-4xl shadow-xl"
          />
          <p className="mt-3 text-xs text-gray-400 text-center">
            Stocks and prediction markets not available in your jurisdiction.
          </p>
        </div>

        {/* Right — text + CTA */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl lg:text-7xl px-3 font-semibold leading-[1.1] tracking-wide">
            The future of finance is here.
          </h1>
          <p className="mt-4 text-base md:text-lg text-gray-600">
            Trade crypto and more on a platform you can trust.
          </p>

          <form
            className="mt-6 flex flex-col sm:flex-row gap-3 max-w-md mx-auto md:mx-0"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="satoshi@nakamoto.com"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white text-sm font-semibold rounded-full hover:bg-blue-700 transition whitespace-nowrap"
            >
              Sign up
            </button>
          </form>

          <p className="mt-3 text-xs text-gray-400">
            Securities offered by Coinbase Capital Markets (member SIPC, FINRA).
          </p>
        </div>
      </div>
    </section>
  );
}
