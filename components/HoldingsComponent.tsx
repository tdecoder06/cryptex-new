"use client";

import { useState, useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { getHoldings, HoldingsResponse } from "@/lib/getHoldings";

export default function HoldingsComponent() {
  const wallet = useWallet();

  const [holdings, setHoldings] = useState<HoldingsResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!wallet.publicKey) {
      setHoldings(null);
      setError("");
      return;
    }

    const address = wallet.publicKey.toBase58();

    const fetchHoldings = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getHoldings(address);
        setHoldings(data);
      } catch (e: any) {
        console.error("Holdings error:", e);
        setError(e.message || "Failed to load holdings.");
      } finally {
        setLoading(false);
      }
    };

    fetchHoldings();
  }, [wallet.publicKey]);

  if (!wallet.publicKey) {
    return (
      <p className="text-gray-400 bg-gray-900 p-4 rounded mt-4">
        Connect your wallet to view holdings.
      </p>
    );
  }

  if (loading) {
    return <p className="text-gray-300 mt-4">Loading holdings...</p>;
  }

  if (error) {
    return <p className="text-red-400 mt-4">Error: {error}</p>;
  }

  if (!holdings) {
    return null;
  }

  return (
    <div className="p-4 bg-[#0f0f0f] border border-[#222] rounded-xl mt-6 text-white">
      <h3 className="font-semibold text-lg mb-3">Your Holdings</h3>

      <div className="mb-4 p-3 rounded bg-[#1a1a1a] border border-[#333]">
        <p className="text-sm text-gray-400">SOL Balance</p>
        <p className="text-xl font-bold">{holdings.uiAmountString} SOL</p>
      </div>

      <h4 className="text-md font-semibold text-gray-300 mb-2">Tokens</h4>

      {Object.keys(holdings.tokens).length === 0 && (
        <p className="text-sm text-gray-500">No SPL tokens found.</p>
      )}

      {Object.entries(holdings.tokens).map(([mint, accounts]) => (
        <div
          key={mint}
          className="mt-2 p-3 rounded bg-[#1a1a1a] border border-[#333]"
        >
          <div className="text-sm font-medium text-blue-300">
            Token Mint: {mint}
          </div>

          {accounts.map((acc) => (
            <div key={acc.account} className="text-xs mt-1 text-gray-300">
              • {acc.uiAmount} tokens{" "}
              <span className="text-gray-500">(raw: {acc.amount})</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}



