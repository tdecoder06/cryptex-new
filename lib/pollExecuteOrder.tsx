"use client";

import {
  ExecuteResponse,
  isExecuteResponse,
} from "@/lib/jupiterResponse";

export interface PollExecuteParams {
  requestId: string;
  signedTransaction: string;
  timeoutMs?: number;  // default 2min
  intervalMs?: number; // default 2s
}

export async function pollExecuteOrder({
  requestId,
  signedTransaction,
  timeoutMs = 2 * 60 * 1000,
  intervalMs = 2000,
}: PollExecuteParams): Promise<ExecuteResponse | null> {
  const start = Date.now();

  while (Date.now() - start < timeoutMs) {
    const response = await fetch("https://api.jup.ag/ultra/v1/execute", {
      method: "POST",
      headers: {
        "x-api-key": process.env.NEXT_PUBLIC_JUPITER_API_KEY || "",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ requestId, signedTransaction }),
    });

    const data = await response.json();

    if (isExecuteResponse(data)) {
      if (data.signature) {
        return data;
      }
    } else if (data.error) {
      console.log("Temporary execute error, retrying:", data.error);
    }

    await new Promise((resolve) => setTimeout(resolve, intervalMs));
  }

  return null;
}

