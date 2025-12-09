"use client";

import {
  ExecuteResponse,
  isExecuteResponse,
} from "@/lib/jupiterResponse";

export interface ExecuteOrderParams {
  requestId: string;
  signedTransaction: string;
}

export async function executeOrder({
  requestId,
  signedTransaction,
}: ExecuteOrderParams): Promise<ExecuteResponse> {
  const res = await fetch("https://api.jup.ag/ultra/v1/execute", {
    method: "POST",
    headers: {
      "x-api-key": process.env.NEXT_PUBLIC_JUPITER_API_KEY || "",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ requestId, signedTransaction }),
  });

  const data = await res.json();

  if (!isExecuteResponse(data)) {
    console.error("Invalid execute response:", data);
    throw new Error(data.error || "Execute order failed");
  }

  return data;
}

