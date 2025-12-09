

"use client";

import React, { useEffect, useState, useRef } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

interface Coin {
    id: string;
    name: string;
    symbol: string;
    current_price: number;
    price_change_percentage_24h: number;
    total_volume: number;
    image: string;
}

export default function AllMarketsPage() {
    const [coins, setCoins] = useState<Coin[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [selectedCoin, setSelectedCoin] = useState<string | null>(null);

    const chartRef = useRef<HTMLDivElement | null>(null);

    /* Load TradingView script once */
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://s3.tradingview.com/tv.js";
        script.async = true;
        document.body.appendChild(script);
    }, []);

    /* Fetch market data */
    useEffect(() => {
        async function fetchCoins() {
            setLoading(true);
            try {
                const response = await fetch(
                    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=${page}&sparkline=false`
                );
                const result = await response.json();
                setCoins(result);
            } catch (error) {
                console.error("Error fetching coins:", error);
            }
            setLoading(false);

            window.scrollTo({ top: 0, behavior: "smooth" });
        }

        fetchCoins();
    }, [page]);

    /* Render chart when modal opens */
    useEffect(() => {
        if (!selectedCoin) return;

        const tv = (window as any).TradingView;
        if (!tv) return;

        chartRef.current!.innerHTML = "";

        new tv.widget({
            symbol: selectedCoin.toUpperCase() + "USD",
            interval: "30", // 24-hour chart (30m candles)
            container_id: "tv_chart_modal",
            width: "100%",
            height: 420,
            theme: "dark",
            autosize: true,
            locale: "en",
            hide_top_toolbar: false,
            hide_legend: true,
        });
    }, [selectedCoin]);

    /* Pagination handlers */
    const nextPage = () => setPage((p) => p + 1);
    const prevPage = () => setPage((p) => Math.max(1, p - 1));

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <div className="flex-grow max-w-7xl mx-auto px-6 py-32">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-serif font-bold text-foreground">All Market Coins</h1>
                        <p className="text-muted text-sm mt-1">Page {page}</p>
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={prevPage}
                            disabled={page === 1}
                            className="px-4 py-2 rounded-lg bg-secondary/20 hover:bg-secondary/40 disabled:opacity-50 transition font-medium"
                        >
                            ← Previous
                        </button>
                        <button
                            onClick={nextPage}
                            className="px-4 py-2 rounded-lg bg-secondary/20 hover:bg-secondary/40 transition font-medium"
                        >
                            Next →
                        </button>
                    </div>
                </div>

                {/* TABLE */}
                {loading ? (
                    <div className="flex justify-center items-center py-40">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                    </div>
                ) : (
                    <div className="glass-card rounded-3xl overflow-hidden border border-primary/5 shadow-sm mb-8">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-primary/5 text-muted text-sm uppercase tracking-wider bg-secondary/20">
                                        <th className="px-6 py-4 text-left">Asset</th>
                                        <th className="px-6 py-4 text-right">Last Price</th>
                                        <th className="px-6 py-4 text-right">24h Change</th>
                                        <th className="px-6 py-4 text-right">24h Volume</th>
                                        <th className="px-6 py-4 text-center">View Chart</th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-primary/5">
                                    {coins.map((coin) => (
                                        <tr key={coin.id} className="hover:bg-secondary/30 transition-colors group">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <img src={coin.image} className="w-8 h-8 rounded-full" />
                                                    <div>
                                                        <p className="font-bold">{coin.symbol.toUpperCase()}</p>
                                                        <p className="text-muted text-sm">{coin.name}</p>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="px-6 py-4 text-right">${coin.current_price.toLocaleString()}</td>

                                            <td className="px-6 py-4 text-right">
                                                <span
                                                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                                        coin.price_change_percentage_24h > 0
                                                            ? "bg-green-100 text-green-700"
                                                            : "bg-red-100 text-red-700"
                                                    }`}
                                                >
                                                    {coin.price_change_percentage_24h > 0 ? "+" : ""}
                                                    {coin.price_change_percentage_24h.toFixed(2)}%
                                                </span>
                                            </td>

                                            <td className="px-6 py-4 text-right">
                                                ${(coin.total_volume / 1_000_000).toFixed(2)}M
                                            </td>

                                            <td className="px-6 py-4 text-center">
                                                <button
                                                    onClick={() => setSelectedCoin(coin.symbol)}
                                                    className="font-medium text-sm opacity-0 group-hover:opacity-100 transition hover:text-green-500"
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
                )}

                {/* Pagination Bottom */}
                <div className="flex justify-center gap-6 py-10">
                    <button
                        onClick={prevPage}
                        disabled={page === 1}
                        className="px-6 py-3 rounded-xl bg-white border hover:bg-gray-50 disabled:opacity-50 transition font-semibold shadow-sm"
                    >
                        Previous Page
                    </button>
                    <button
                        onClick={nextPage}
                        className="px-6 py-3 rounded-xl bg-primary text-white hover:bg-primary/90 transition font-semibold shadow-lg shadow-primary/20"
                    >
                        Next Page
                    </button>
                </div>
            </div>

            <Footer />

            {/* Chart Modal */}
            {selectedCoin && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center">
                    <div className="bg-secondary rounded-xl shadow-xl w-[90%] max-w-3xl p-6 relative">

                        <button
                            onClick={() => setSelectedCoin(null)}
                            className="absolute top-3 right-3 text-white/70 hover:text-white text-xl"
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
        </div>
    );
}

