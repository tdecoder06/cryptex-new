"use client";

export interface TokenInfo {
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  logoURI?: string;
}

export async function searchToken(query: string): Promise<TokenInfo[]> {
  if (!query.trim()) return [];

  const url = `https://api.jup.ag/ultra/v1/search-token?query=${encodeURIComponent(
    query
  )}`;

  const response = await fetch(url, {
    headers: {
      "x-api-key": process.env.NEXT_PUBLIC_JUPITER_API_KEY || "",
    },
  });

  const data = await response.json();

  if (!data?.tokens) return [];

  return data.tokens as TokenInfo[];
}
