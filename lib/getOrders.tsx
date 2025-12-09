"use client";

import React, { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { OrderResponse, isOrderResponse } from "@/lib/jupiterResponse";

// ---------- Types ----------
export interface GetOrderParams {
  inputMint: string;
  outputMint: string;
  amount: string; // smallest unit
  taker: string;  // wallet public key
}

// ---------- Helper ----------
export async function getOrder(params: GetOrderParams): Promise<OrderResponse> {
  const url = new URL("https://api.jup.ag/ultra/v1/order");

  url.searchParams.set("inputMint", params.inputMint);
  url.searchParams.set("outputMint", params.outputMint);
  url.searchParams.set("amount", params.amount);
  url.searchParams.set("taker", params.taker);

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      "x-api-key": process.env.NEXT_PUBLIC_JUPITER_API_KEY ?? "",
    },
  });

  const data = await response.json();

  if (!isOrderResponse(data)) {
    console.error("Invalid OrderResponse:", data);
    throw new Error(data.errorMessage || "Jupiter Get Order failed");
  }

  return data;
}

// ---------- Optional UI Component ----------
export default function GetOrderComponent() {
  const wallet = useWallet();
  const [order, setOrder] = useState<OrderResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGetOrder = async () => {
    if (!wallet.publicKey) {
      return alert("Connect wallet first");
    }

    try {
      setLoading(true);
      setError("");

      const result = await getOrder({
        inputMint: "So11111111111111111111111111111111111111112", // SOL
        outputMint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v", // USDC
        amount: "10000000",
        taker: wallet.publicKey.toBase58(),
      });

      setOrder(result);
    } catch (err: any) {
      setError(err.message);
      console.error("Get Order Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg bg-gray-900 text-white mt-6">
      <h2 className="font-bold text-xl mb-3">Jupiter Get Order</h2>

      <button
        onClick={handleGetOrder}
        className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
      >
        Get Order
      </button>

      {loading && <p className="mt-3">Loading...</p>}
      {error && <p className="mt-3 text-red-400">{error}</p>}

      {order && (
        <pre className="mt-3 text-green-400 text-xs overflow-auto max-h-80">
          {JSON.stringify(order, null, 2)}
        </pre>
      )}
    </div>
  );
}

