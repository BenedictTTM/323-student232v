import { useEffect, useRef } from "react";

/**
 * Realistic per-coin price simulator.
 * Each coin gets its OWN independent timer, so they update individually
 * at different random intervals — just like a real exchange feed.
 *
 * No backend calls are made; this is purely frontend cosmetic.
 */
export function usePriceSimulator(coins, setCoins, enabled = true) {
  const timersRef = useRef({});

  useEffect(() => {
    if (!enabled || coins.length === 0) return;

    // Clear any existing timers
    Object.values(timersRef.current).forEach(clearTimeout);
    timersRef.current = {};

    // Create an independent timer for each coin
    coins.forEach((coin) => {
      scheduleCoinUpdate(coin._id);
    });

    function scheduleCoinUpdate(coinId) {
      // Random delay between 2s and 8s per coin — staggered and realistic
      const delay = 2000 + Math.random() * 6000;

      timersRef.current[coinId] = setTimeout(() => {
        setCoins((prev) =>
          prev.map((c) => {
            if (c._id !== coinId) return c;

            // Volatility based on price tier (cheaper coins fluctuate more %)
            const volatility = c.price > 10000
              ? 0.0004   // BTC-tier: small moves but visible
              : c.price > 100
                ? 0.001   // ETH/SOL-tier: moderate moves
                : c.price > 1
                  ? 0.002   // mid-caps: noticeable moves
                  : 0.004;  // sub-dollar: larger % swings

            // Gaussian-ish random for more natural distribution
            const r1 = Math.random();
            const r2 = Math.random();
            const gaussian = Math.sqrt(-2 * Math.log(r1)) * Math.cos(2 * Math.PI * r2);

            const changePercent = gaussian * volatility;
            const newPrice = c.price * (1 + changePercent);

            // Nudge 24h change very slightly
            const changeDrift = changePercent * 8; // amplify slightly for visual effect
            const newChange = c.change24h + changeDrift;

            return {
              ...c,
              price: Math.max(newPrice, 0.0001), // prevent negative prices
              change24h: newChange,
              lastUpdated: Date.now(),
            };
          })
        );

        // Schedule next update for THIS coin independently
        scheduleCoinUpdate(coinId);
      }, delay);
    }

    return () => {
      Object.values(timersRef.current).forEach(clearTimeout);
      timersRef.current = {};
    };
  }, [enabled, coins.length]); // Only re-setup when coin count changes or enabled toggles
}
