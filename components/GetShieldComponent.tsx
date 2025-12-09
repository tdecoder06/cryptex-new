"use client";

import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { getShield } from "@/lib/getShield";
import type { OrderResponse } from "@/lib/jupiterResponse";

export default function GetShieldComponent() {
  const wallet = useWallet();

  const [result, setResult] = useState<OrderResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGetShield = async () => {
    if (!wallet.publicKey) {
      setError("Connect wallet first.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const data = await getShield({
        inputMint: "So11111111111111111111111111111111111111112", // SOL
        outputMint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v", // USDC
        amount: "10000000", // 0.01 SOL
        taker: wallet.publicKey.toBase58(),
      });

      setResult(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#0f0f0f] border border-[#222] p-4 rounded-xl mt-6">
      <h2 className="text-xl font-semibold mb-3">Get Shielded Swap</h2>

      <button
        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
        onClick={handleGetShield}
      >
        Generate Shield Swap
      </button>

      {loading && <p className="mt-3">Loading...</p>}
      {error && <p className="mt-3 text-red-400">{error}</p>}

      {result && (
        <pre className="mt-3 text-green-400 text-xs overflow-auto max-h-80">
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
}
