"use client";



const DEFAULT_RETRIES = 5;
const BASE_DELAY = 500; // 0.5 sec
const MIN_SLIDING_WINDOW_DELAY = 10_000; // 10 seconds


export async function rateLimitFetch(
  input: RequestInfo,
  init?: RequestInit,
  retries: number = DEFAULT_RETRIES
): Promise<Response> {
  try {
    const resp = await fetch(input, init);

    // Jupiter Ultra Rate Limit (429)
    if (resp.status === 429) {
      if (retries <= 0) {
        throw new Error("Rate limit exceeded: no more retries remaining.");
      }

      const backoff = BASE_DELAY * Math.pow(2, DEFAULT_RETRIES - retries);
      const waitTime = Math.max(backoff, MIN_SLIDING_WINDOW_DELAY);

      console.warn(`🚫 429 Rate Limit — retrying in ${waitTime}ms...`);

      await new Promise((resolve) => setTimeout(resolve, waitTime));

      return rateLimitFetch(input, init, retries - 1);
    }

    return resp;
  } catch (err) {
    if (retries <= 0) {
      throw err;
    }

    const backoff = BASE_DELAY * Math.pow(2, DEFAULT_RETRIES - retries);

    console.warn(`⚠️ Fetch error — retrying in ${backoff}ms...`, err);

    await new Promise((resolve) => setTimeout(resolve, backoff));

    return rateLimitFetch(input, init, retries - 1);
  }
}
