"use client";

import { OrderResponse, isOrderResponse } from "@/lib/jupiterResponse";

export interface ShieldParams {
  inputMint: string;
  outputMint: string;
  amount: string; // smallest unit
  taker: string;  // wallet public key
}

export async function getShield(params: ShieldParams): Promise<OrderResponse> {
  const url = new URL("https://api.jup.ag/ultra/v1/shield");

  url.searchParams.set("inputMint", params.inputMint);
  url.searchParams.set("outputMint", params.outputMint);
  url.searchParams.set("amount", params.amount);
  url.searchParams.set("taker", params.taker);

  const res = await fetch(url.toString(), {
    method: "GET",
    headers: {
      "x-api-key": process.env.NEXT_PUBLIC_JUPITER_API_KEY || "",
    },
  });

  const data = await res.json();

  if (!isOrderResponse(data)) {
    console.error("Invalid shield response:", data);
    throw new Error(data.errorMessage || "Jupiter Get Shield failed");
  }

  return data;
}
