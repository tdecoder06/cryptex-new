"use client";

export interface TokenHolding {
  account: string;
  amount: string;
  uiAmount: number;
  uiAmountString: string;
  isFrozen: boolean;
  isAssociatedTokenAccount: boolean;
  decimals: number;
  programId: string;
}

export interface HoldingsResponse {
  amount: string;
  uiAmount: number;
  uiAmountString: string;
  tokens: {
    [mint: string]: TokenHolding[];
  };
}

export async function getHoldings(walletAddress: string): Promise<HoldingsResponse> {
  const url = `https://api.jup.ag/ultra/v1/holdings/${walletAddress}`;

  const res = await fetch(url, {
    headers: {
      "x-api-key": process.env.NEXT_PUBLIC_JUPITER_API_KEY || "",
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Failed to fetch holdings");
  }

  return data as HoldingsResponse;
}
