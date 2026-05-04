import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  fetchAllCrypto,
  fetchTopGainers,
  fetchNewListings,
} from "../../utils/api";
import { usePriceSimulator } from "../../utils/priceSimulator";

const tabs = ["Tradable", "Top gainers", "New on Coinbase"];

export default function ExploreTokens() {
  const [activeTab, setActiveTab] = useState(0);
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [activeTab]);

  const loadData = async () => {
    setLoading(true);
    try {
      let data;
      if (activeTab === 1) {
        data = await fetchTopGainers();
      } else if (activeTab === 2) {
        data = await fetchNewListings();
      } else {
        data = await fetchAllCrypto();
      }
      // Show top 6 coins for the homepage preview
      setCoins((data.data || []).slice(0, 6));
    } catch {
      setCoins([]);
    } finally {
      setLoading(false);
    }
  };

  // Each coin updates individually on its own random timer — no backend calls
  usePriceSimulator(coins, setCoins, !loading);


  const formatPrice = (price) => {
    if (price >= 1000)
      return `$${price.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`;
    if (price >= 1) return `$${price.toFixed(2)}`;
    return `$${price.toFixed(4)}`;
  };

  return (
    <section className="bg-gray-50 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-start gap-12">
        {/* Left text */}
        <div className="w-full md:w-5/12 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold leading-[1.1] tracking-tighter">
            Explore crypto like Bitcoin, Ethereum, and Dogecoin.
          </h2>
          <p className="mt-4 text-gray-600">
            Simply and securely buy, sell, and manage hundreds of
            cryptocurrencies.
          </p>
          <Link
            to="/cryptocurrencies"
            className="inline-block mt-6 px-6 py-3 bg-black text-white text-sm font-semibold rounded-full hover:bg-gray-800 transition"
          >
            See more assets
          </Link>
        </div>

        {/* Right — crypto table */}
        <div className="w-full md:w-7/12 bg-gray-900 rounded-2xl p-6 text-white">
          {/* Tabs */}
          <div className="flex gap-2 mb-6">
            {tabs.map((tab, i) => (
              <button
                key={tab}
                onClick={() => setActiveTab(i)}
                className={`px-4 py-1.5 text-xs font-semibold rounded-full transition cursor-pointer ${
                  activeTab === i
                    ? "bg-white text-gray-900"
                    : "bg-gray-800 text-gray-400 hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Coin List */}
          <div className="space-y-4">
            {loading ? (
              // Loading skeleton
              Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between px-2 py-2"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-700 animate-pulse" />
                    <div className="w-20 h-4 bg-gray-700 rounded animate-pulse" />
                  </div>
                  <div className="text-right">
                    <div className="w-16 h-4 bg-gray-700 rounded animate-pulse mb-1" />
                    <div className="w-12 h-3 bg-gray-700 rounded animate-pulse" />
                  </div>
                </div>
              ))
            ) : coins.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No data available
              </div>
            ) : (
              coins.map((coin) => (
                <div
                  key={coin._id}
                  className="flex items-center justify-between hover:bg-gray-800 rounded-lg px-2 py-2 -mx-2 transition"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={coin.image}
                      alt={coin.name}
                      className="w-8 h-8 rounded-full object-cover"
                      onError={(e) => {
                        e.target.src = `https://placehold.co/32x32/0052ff/white?text=${coin.symbol[0]}`;
                      }}
                    />
                    <span className="font-medium text-sm">{coin.name}</span>
                  </div>
                  <div className="text-right">
                    <div
                      key={`${coin._id}-p-${formatPrice(coin.price)}`}
                      className="font-semibold text-sm animate-price-flash"
                    >
                      {formatPrice(coin.price)}
                    </div>
                    <div
                      key={`${coin._id}-c-${coin.change24h.toFixed(2)}`}
                      className={`text-xs animate-price-flash ${
                        coin.change24h > 0
                          ? "text-green-400"
                          : coin.change24h < 0
                            ? "text-red-400"
                            : "text-gray-400"
                      }`}
                    >
                      {coin.change24h > 0 ? "+" : ""}
                      {coin.change24h.toFixed(2)}%
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
