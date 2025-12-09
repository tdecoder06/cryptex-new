

"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";

interface Coin {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
  total_volume: number;
  image: string;
}

export default function MarketTable() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCoin, setSelectedCoin] = useState<string | null>(null);

  const chartRef = useRef<HTMLDivElement | null>(null);

  // Load TradingView script ONCE
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  // Fetch crypto coins
  useEffect(() => {
    async function fetchCoins() {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"
        );
        const result = await response.json();
        setCoins(result);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching coins:", error);
        setLoading(false);
      }
    }
    fetchCoins();
  }, []);

  // Create TradingView chart when selectedCoin changes
  useEffect(() => {
    if (!selectedCoin) return;
    if (!(window as any).TradingView) return;

    chartRef.current!.innerHTML = "";

    new (window as any).TradingView.widget({
      symbol: selectedCoin.toUpperCase() + "USD",
      interval: "30", // 30-minute candles → 24h view
      container_id: "tv_chart_modal",
      width: "100%",
      height: 420,
      theme: "dark",
      locale: "en",
      hide_top_toolbar: false,
      hide_legend: true,
      autosize: true,
    });
  }, [selectedCoin]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <>
      <div className="market-table-container max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-20">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2 font-serif text-foreground">
              Market Trends
            </h2>
            <p className="text-muted">Real-time prices and market data</p>
          </div>

          <Link
            href="/markets"
            className="text-primary hover:text-foreground font-medium transition-colors border-b border-primary/20 pb-0.5"
          >
            View All Markets →
          </Link>
        </div>

        <div className="glass-card rounded-3xl overflow-hidden border border-primary/5 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-primary/5 text-muted text-sm uppercase tracking-wider bg-secondary/20">
                  <th className="px-6 py-4 text-left font-medium">Asset</th>
                  <th className="px-6 py-4 text-right font-medium">Last Price</th>
                  <th className="px-6 py-4 text-right font-medium">24h Change</th>
                  <th className="px-6 py-4 text-right font-medium">24h Volume</th>
                  <th className="px-6 py-4 text-center font-medium">View Chart</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-primary/5">
                {coins.map((coin) => (
                  <tr
                    key={coin.id}
                    className="hover:bg-secondary/30 transition-colors group"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <img
                          src={coin.image}
                          alt={coin.name}
                          className="w-8 h-8 rounded-full"
                        />
                        <div>
                          <span className="font-bold text-foreground block">
                            {coin.symbol.toUpperCase()}
                          </span>
                          <span className="text-sm text-muted">{coin.name}</span>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-right font-medium text-foreground">
                      ${coin.current_price?.toLocaleString()}
                    </td>

                    <td className="px-6 py-4 text-right">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          coin.price_change_percentage_24h > 0
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {coin.price_change_percentage_24h > 0 ? "+" : ""}
                        {coin.price_change_percentage_24h?.toFixed(2)}%
                      </span>
                    </td>

                    <td className="px-6 py-4 text-right text-muted">
                      ${(coin.total_volume / 1000000).toFixed(2)}M
                    </td>

                    <td className="px-6 py-4 text-center">
                      <button
                        className="font-medium text-sm opacity-0 group-hover:opacity-100 transition-all cursor-pointer hover:text-green-500"
                        onClick={() => setSelectedCoin(coin.symbol)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedCoin && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-secondary rounded-xl shadow-xl w-[90%] max-w-3xl p-6 relative">

            {/* Close Button */}
            <button
              className="absolute top-3 right-3 text-white/80 hover:text-white text-xl"
              onClick={() => setSelectedCoin(null)}
            >
              ✕
            </button>

            <h2 className="text-xl font-bold mb-4 text-foreground">
              {selectedCoin.toUpperCase()} — 24h Chart
            </h2>

            <div id="tv_chart_modal" ref={chartRef} className="rounded-xl overflow-hidden" />
          </div>
        </div>
      )}
    </>
  );
}

