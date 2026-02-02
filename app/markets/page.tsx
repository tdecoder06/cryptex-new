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
  const [search, setSearch] = useState("");
  const chartRef = useRef<HTMLDivElement | null>(null);

  /* ---------------- FETCH FUNCTION ---------------- */

  const fetchCoins = async (pageNumber: number) => {
    setLoading(true);

    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=${pageNumber}&sparkline=false`
      );

      const result = await response.json();
      setCoins(result);
    } catch (error) {
      console.error("Error fetching coins:", error);
    }

    setLoading(false);
  };

  /* ---------------- INITIAL & PAGE FETCH ---------------- */

  useEffect(() => {
    fetchCoins(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  /* ---------------- LOAD TRADINGVIEW SCRIPT ---------------- */

  useEffect(() => {
    if (document.getElementById("tradingview-script")) return;

    const script = document.createElement("script");
    script.id = "tradingview-script";
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;

    document.body.appendChild(script);
  }, []);

  /* ---------------- RENDER CHART ---------------- */

  useEffect(() => {
    if (!selectedCoin || !chartRef.current) return;

    const tv = window.TradingView;
    if (!tv) return;

    chartRef.current.innerHTML = "";

    new tv.widget({
      symbol: selectedCoin.toUpperCase() + "USD",
      interval: "30",
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

  /* ---------------- PAGINATION ---------------- */

  const nextPage = () => setPage((p) => p + 1);
  const prevPage = () => setPage((p) => Math.max(1, p - 1));

  /* ---------------- SEARCH ---------------- */

  const handleSearch = async () => {
    if (!search.trim()) return;

    setLoading(true);

    try {
      const searchRes = await fetch(
        `https://api.coingecko.com/api/v3/search?query=${search}`
      );
      const searchData = await searchRes.json();

      if (!searchData.coins.length) {
        setCoins([]);
        setLoading(false);
        return;
      }

      const coinId = searchData.coins[0].id;

      const marketRes = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinId}`
      );

      const marketData = await marketRes.json();
      setCoinsSafely(marketData);
    } catch (error) {
      console.error("Search error:", error);
    }

    setLoading(false);
  };

  /* small safety helper */
  const setCoinsSafely = (data: Coin[]) => {
    setCoins(Array.isArray(data) ? data : []);
  };

  /* ---------------- RESET (FULLY FIXED) ---------------- */

  const resetSearch = async () => {
    setSearch("");
    setPage(1);
    await fetchCoins(1); 
  };


  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="grow max-w-7xl mx-auto px-6 py-32">
        {/* Header */}
        <div className="flex flex-col gap-6 lg:flex-row lg:justify-between lg:items-center mb-8">
          <div>
            <h1 className="text-3xl font-serif font-bold text-foreground">
              All Market Coins
            </h1>
            <p className="text-muted text-sm mt-1">Page {page}</p>
          </div>

          {/* Search */}
          <div className="flex items-center gap-2 flex-wrap">
            <input
              type="text"
              placeholder="Search crypto..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-4 py-2 rounded-xl border border-primary/20 bg-white focus:outline-none focus:ring-2 focus:ring-primary/40"
            />

            <button
              onClick={handleSearch}
              className="px-4 py-2 rounded-xl bg-primary text-white hover:bg-primary/90 transition"
            >
              Search
            </button>

            <button
              onClick={resetSearch}
              className="px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 transition"
            >
              Reset
            </button>
          </div>

          {/* Pagination Top */}
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
                    <tr
                      key={coin.id}
                      className="hover:bg-secondary/30 transition-colors group"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={coin.image}
                            alt={coin.name}
                            className="w-8 h-8 rounded-full"
                          />
                          <div>
                            <p className="font-bold">
                              {coin.symbol.toUpperCase()}
                            </p>
                            <p className="text-muted text-sm">{coin.name}</p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-right">
                        ${coin.current_price.toLocaleString()}
                      </td>

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

            <div
              id="tv_chart_modal"
              ref={chartRef}
              className="rounded-xl overflow-hidden"
            />
          </div>
        </div>
      )}
    </div>
  );
}































// "use client";

// import React, { useEffect, useState, useRef } from "react";
// import Navbar from "@/components/navbar";
// import Footer from "@/components/footer";

// interface Coin {
//     id: string;
//     name: string;
//     symbol: string;
//     current_price: number;
//     price_change_percentage_24h: number;
//     total_volume: number;
//     image: string;
// }

// export default function AllMarketsPage() {
//     const [coins, setCoins] = useState<Coin[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [page, setPage] = useState(1);
//     const [selectedCoin, setSelectedCoin] = useState<string | null>(null);
// const [search, setSearch] = useState("");
//     const chartRef = useRef<HTMLDivElement | null>(null);

//     /* Load TradingView script once */
//     useEffect(() => {
//         const script = document.createElement("script");
//         script.src = "https://s3.tradingview.com/tv.js";
//         script.async = true;
//         document.body.appendChild(script);
//     }, []);

//     /* Fetch market data */
//     useEffect(() => {
//         async function fetchCoins() {
//             setLoading(true);
//             try {
//                 const response = await fetch(
//                     `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=${page}&sparkline=false`
//                 );
//                 const result = await response.json();
//                 setCoins(result);
//             } catch (error) {
//                 console.error("Error fetching coins:", error);
//             }
//             setLoading(false);

//             window.scrollTo({ top: 0, behavior: "smooth" });
//         }

//         fetchCoins();
//     }, [page]);

//     /* Render chart when modal opens */
//     useEffect(() => {
//         if (!selectedCoin) return;

//         const tv = (window as any).TradingView;
//         if (!tv) return;

//         chartRef.current!.innerHTML = "";

//         new tv.widget({
//             symbol: selectedCoin.toUpperCase() + "USD",
//             interval: "30", // 24-hour chart (30m candles)
//             container_id: "tv_chart_modal",
//             width: "100%",
//             height: 420,
//             theme: "dark",
//             autosize: true,
//             locale: "en",
//             hide_top_toolbar: false,
//             hide_legend: true,
//         });
//     }, [selectedCoin]);

//     /* Pagination handlers */
//     const nextPage = () => setPage((p) => p + 1);
//     const prevPage = () => setPage((p) => Math.max(1, p - 1));


//     const handleSearch = async () => {
//     if (!search.trim()) return;

//     setLoading(true);

//     try {
//       const searchRes = await fetch(
//         `https://api.coingecko.com/api/v3/search?query=${search}`
//       );
//       const searchData = await searchRes.json();

//       if (searchData.coins.length === 0) {
//         setCoins([]);
//         setLoading(false);
//         return;
//       }

//       const coinId = searchData.coins[0].id;

//       const marketRes = await fetch(
//         `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinId}`
//       );
//       const marketData = await marketRes.json();

//       setCoins(marketData);
//     } catch (error) {
//       console.error(error);
//     }

//     setLoading(false);
//   };

//   const resetSearch = () => {
//     setSearch("");
//     fetchDefaultPage();
//   };

//     return (
//         <div className="min-h-screen flex flex-col">
//             <Navbar />

//             <div className="flex-grow max-w-7xl mx-auto px-6 py-32">
//                 <div className="flex justify-between items-center mb-8">
//                     <div>
//                         <h1 className="text-3xl font-serif font-bold text-foreground">All Market Coins</h1>
//                         <p className="text-muted text-sm mt-1">Page {page}</p>
//                     </div>
//                     <div className="flex items-center gap-2">
//             <input
//               type="text"
//               placeholder="Search crypto..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="px-4 py-2 rounded-xl border border-primary/20 bg-white focus:outline-none focus:ring-2 focus:ring-primary/40"
//             />

//             <button
//               onClick={handleSearch}
//               className="px-4 py-2 rounded-xl bg-primary text-white hover:bg-primary/90 transition"
//             >
//               Search
//             </button>

//             <button
//               onClick={resetSearch}
//               className="px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 transition"
//             >
//               Reset
//             </button>
//           </div>

//                     <div className="flex gap-3">
//                         <button
//                             onClick={prevPage}
//                             disabled={page === 1}
//                             className="px-4 py-2 rounded-lg bg-secondary/20 hover:bg-secondary/40 disabled:opacity-50 transition font-medium"
//                         >
//                             ← Previous
//                         </button>
//                         <button
//                             onClick={nextPage}
//                             className="px-4 py-2 rounded-lg bg-secondary/20 hover:bg-secondary/40 transition font-medium"
//                         >
//                             Next →
//                         </button>
//                     </div>
//                 </div>

//                 {/* TABLE */}
//                 {loading ? (
//                     <div className="flex justify-center items-center py-40">
//                         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
//                     </div>
//                 ) : (
//                     <div className="glass-card rounded-3xl overflow-hidden border border-primary/5 shadow-sm mb-8">
//                         <div className="overflow-x-auto">
//                             <table className="w-full">
//                                 <thead>
//                                     <tr className="border-b border-primary/5 text-muted text-sm uppercase tracking-wider bg-secondary/20">
//                                         <th className="px-6 py-4 text-left">Asset</th>
//                                         <th className="px-6 py-4 text-right">Last Price</th>
//                                         <th className="px-6 py-4 text-right">24h Change</th>
//                                         <th className="px-6 py-4 text-right">24h Volume</th>
//                                         <th className="px-6 py-4 text-center">View Chart</th>
//                                     </tr>
//                                 </thead>

//                                 <tbody className="divide-y divide-primary/5">
//                                     {coins.map((coin) => (
//                                         <tr key={coin.id} className="hover:bg-secondary/30 transition-colors group">
//                                             <td className="px-6 py-4">
//                                                 <div className="flex items-center gap-3">
//                                                     <img src={coin.image} className="w-8 h-8 rounded-full" />
//                                                     <div>
//                                                         <p className="font-bold">{coin.symbol.toUpperCase()}</p>
//                                                         <p className="text-muted text-sm">{coin.name}</p>
//                                                     </div>
//                                                 </div>
//                                             </td>

//                                             <td className="px-6 py-4 text-right">${coin.current_price.toLocaleString()}</td>

//                                             <td className="px-6 py-4 text-right">
//                                                 <span
//                                                     className={`px-2 py-1 rounded-full text-xs font-semibold ${
//                                                         coin.price_change_percentage_24h > 0
//                                                             ? "bg-green-100 text-green-700"
//                                                             : "bg-red-100 text-red-700"
//                                                     }`}
//                                                 >
//                                                     {coin.price_change_percentage_24h > 0 ? "+" : ""}
//                                                     {coin.price_change_percentage_24h.toFixed(2)}%
//                                                 </span>
//                                             </td>

//                                             <td className="px-6 py-4 text-right">
//                                                 ${(coin.total_volume / 1_000_000).toFixed(2)}M
//                                             </td>

//                                             <td className="px-6 py-4 text-center">
//                                                 <button
//                                                     onClick={() => setSelectedCoin(coin.symbol)}
//                                                     className="font-medium text-sm opacity-0 group-hover:opacity-100 transition hover:text-green-500"
//                                                 >
//                                                     View
//                                                 </button>
//                                             </td>
//                                         </tr>
//                                     ))}
//                                 </tbody>
//                             </table>
//                         </div>
//                     </div>
//                 )}

//                 {/* Pagination Bottom */}
//                 <div className="flex justify-center gap-6 py-10">
//                     <button
//                         onClick={prevPage}
//                         disabled={page === 1}
//                         className="px-6 py-3 rounded-xl bg-white border hover:bg-gray-50 disabled:opacity-50 transition font-semibold shadow-sm"
//                     >
//                         Previous Page
//                     </button>
//                     <button
//                         onClick={nextPage}
//                         className="px-6 py-3 rounded-xl bg-primary text-white hover:bg-primary/90 transition font-semibold shadow-lg shadow-primary/20"
//                     >
//                         Next Page
//                     </button>
//                 </div>
//             </div>

//             <Footer />

//             {/* Chart Modal */}
//             {selectedCoin && (
//                 <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center">
//                     <div className="bg-secondary rounded-xl shadow-xl w-[90%] max-w-3xl p-6 relative">

//                         <button
//                             onClick={() => setSelectedCoin(null)}
//                             className="absolute top-3 right-3 text-white/70 hover:text-white text-xl"
//                         >
//                             ✕
//                         </button>

//                         <h2 className="text-xl font-bold mb-4 text-foreground">
//                             {selectedCoin.toUpperCase()} — 24h Chart
//                         </h2>

//                         <div id="tv_chart_modal" ref={chartRef} className="rounded-xl overflow-hidden" />
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }






















// "use client";

// import React, { useEffect, useState, useRef, useCallback } from "react";
// import Navbar from "@/components/navbar";
// import Footer from "@/components/footer";

// interface Coin {
//   id: string;
//   name: string;
//   symbol: string;
//   current_price: number;
//   price_change_percentage_24h: number;
//   total_volume: number;
//   image: string;
// }

// export default function AllMarketsPage() {
//   const [coins, setCoins] = useState<Coin[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [page, setPage] = useState(1);
//   const [selectedCoin, setSelectedCoin] = useState<string | null>(null);
//   const [search, setSearch] = useState("");

//   const chartRef = useRef<HTMLDivElement | null>(null);

//   /* Fetch paginated coins */

    
//   const fetchDefaultPage = useCallback(async () => {
//     setLoading(true);
//     try {
//       const response = await fetch(
//         `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=${page}&sparkline=false`
//       );
//       const result = await response.json();
//       setCoins(result);
//     } catch (error) {
//       console.error("Error fetching coins:", error);
//     }
//     setLoading(false);
//   }, [page]);


//   /* Load TradingView script once */
//   useEffect(() => {
//     const script = document.createElement("script");
//     script.src = "https://s3.tradingview.com/tv.js";
//     script.async = true;
//     document.body.appendChild(script);
//   }, []);

//   /* Run fetch when page changes */
// //   useEffect(() => {
// //     fetchDefaultPage();
// //     window.scrollTo({ top: 0, behavior: "smooth" });
// //   }, [fetchDefaultPage]);

//   /* SEARCH */
//   const handleSearch = async () => {
//     if (!search.trim()) return;

//     setLoading(true);

//     try {
//       const searchRes = await fetch(
//         `https://api.coingecko.com/api/v3/search?query=${search}`
//       );
//       const searchData = await searchRes.json();

//       if (searchData.coins.length === 0) {
//         setCoins([]);
//         setLoading(false);
//         return;
//       }

//       const coinId = searchData.coins[0].id;

//       const marketRes = await fetch(
//         `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinId}`
//       );
//       const marketData = await marketRes.json();

//       setCoins(marketData);
//     } catch (error) {
//       console.error(error);
//     }

//     setLoading(false);
//   };

//   const resetSearch = () => {
//     setSearch("");
//     fetchDefaultPage();
//   };

//   /* TradingView Chart */
//   useEffect(() => {
//     if (!selectedCoin) return;
//     const tv = window.TradingView;
//     if (!tv) return;

//     if (chartRef.current) {
//       chartRef.current.innerHTML = "";
//     }

//     new tv.widget({
//       symbol: selectedCoin.toUpperCase() + "USD",
//       interval: "30",
//       container_id: "tv_chart_modal",
//       width: "100%",
//       height: 420,
//       theme: "dark",
//       autosize: true,
//       locale: "en",
//       hide_top_toolbar: false,
//       hide_legend: true,
//     });
//   }, [selectedCoin]);

//   const nextPage = () => setPage((p) => p + 1);
//   const prevPage = () => setPage((p) => Math.max(1, p - 1));

//   return (
//     <div className="min-h-screen flex flex-col">
//       <Navbar />

//       <div className="flex-grow max-w-7xl mx-auto px-6 py-32">

//         {/* HEADER + SEARCH */}
//         <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 mb-8">
//           <div>
//             <h1 className="text-3xl font-serif font-bold text-foreground">
//               All Market Coins
//             </h1>
//             <p className="text-muted text-sm mt-1">Page {page}</p>
//           </div>

//           <div className="flex items-center gap-2">
//             <input
//               type="text"
//               placeholder="Search crypto..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="px-4 py-2 rounded-xl border border-primary/20 bg-white focus:outline-none focus:ring-2 focus:ring-primary/40"
//             />

//             <button
//               onClick={handleSearch}
//               className="px-4 py-2 rounded-xl bg-primary text-white hover:bg-primary/90 transition"
//             >
//               Search
//             </button>

//             <button
//               onClick={resetSearch}
//               className="px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 transition"
//             >
//               Reset
//             </button>
//           </div>
//         </div>

//         {/* TABLE */}
//         {loading ? (
//           <div className="flex justify-center items-center py-40">
//             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
//           </div>
//         ) : (
//           <div className="glass-card rounded-3xl overflow-hidden border border-primary/5 shadow-sm mb-8">
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead>
//                   <tr className="border-b border-primary/5 text-muted text-sm uppercase tracking-wider bg-secondary/20">
//                     <th className="px-6 py-4 text-left">Asset</th>
//                     <th className="px-6 py-4 text-right">Last Price</th>
//                     <th className="px-6 py-4 text-right">24h Change</th>
//                     <th className="px-6 py-4 text-right">24h Volume</th>
//                     <th className="px-6 py-4 text-center">View Chart</th>
//                   </tr>
//                 </thead>

//                 <tbody className="divide-y divide-primary/5">
//                   {coins.length === 0 ? (
//                     <tr>
//                       <td colSpan={5} className="text-center py-10 text-muted">
//                         No coin found.
//                       </td>
//                     </tr>
//                   ) : (
//                     coins.map((coin) => (
//                       <tr key={coin.id} className="hover:bg-secondary/30 transition-colors group">
//                         <td className="px-6 py-4">
//                           <div className="flex items-center gap-3">
//                             <img
//                               src={coin.image}
//                               alt={coin.name}
//                               className="w-8 h-8 rounded-full"
//                             />
//                             <div>
//                               <p className="font-bold">{coin.symbol.toUpperCase()}</p>
//                               <p className="text-muted text-sm">{coin.name}</p>
//                             </div>
//                           </div>
//                         </td>

//                         <td className="px-6 py-4 text-right">
//                           ${coin.current_price.toLocaleString()}
//                         </td>

//                         <td className="px-6 py-4 text-right">
//                           <span
//                             className={`px-2 py-1 rounded-full text-xs font-semibold ${
//                               coin.price_change_percentage_24h > 0
//                                 ? "bg-green-100 text-green-700"
//                                 : "bg-red-100 text-red-700"
//                             }`}
//                           >
//                             {coin.price_change_percentage_24h > 0 ? "+" : ""}
//                             {coin.price_change_percentage_24h.toFixed(2)}%
//                           </span>
//                         </td>

//                         <td className="px-6 py-4 text-right">
//                           ${(coin.total_volume / 1_000_000).toFixed(2)}M
//                         </td>

//                         <td className="px-6 py-4 text-center">
//                           <button
//                             onClick={() => setSelectedCoin(coin.symbol)}
//                             className="font-medium text-sm opacity-0 group-hover:opacity-100 transition hover:text-green-500"
//                           >
//                             View
//                           </button>
//                         </td>
//                       </tr>
//                     ))
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}

//         {/* Pagination */}
//         <div className="flex justify-center gap-6 py-10">
//           <button
//             onClick={prevPage}
//             disabled={page === 1}
//             className="px-6 py-3 rounded-xl bg-white border hover:bg-gray-50 disabled:opacity-50 transition font-semibold shadow-sm"
//           >
//             Previous Page
//           </button>
//           <button
//             onClick={nextPage}
//             className="px-6 py-3 rounded-xl bg-primary text-white hover:bg-primary/90 transition font-semibold shadow-lg shadow-primary/20"
//           >
//             Next Page
//           </button>
//         </div>
//       </div>

//       <Footer />

//       {/* Chart Modal */}
//       {selectedCoin && (
//         <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center">
//           <div className="bg-secondary rounded-xl shadow-xl w-[90%] max-w-3xl p-6 relative">

//             <button
//               onClick={() => setSelectedCoin(null)}
//               className="absolute top-3 right-3 text-white/70 hover:text-white text-xl"
//             >
//               ✕
//             </button>

//             <h2 className="text-xl font-bold mb-4 text-foreground">
//               {selectedCoin.toUpperCase()} — 24h Chart
//             </h2>

//             <div id="tv_chart_modal" ref={chartRef} className="rounded-xl overflow-hidden" />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
