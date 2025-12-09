"use client";


// ORDER RESPONSE TYPES


export interface SwapInfo {
  ammKey: string;
  label: string;
  inputMint: string;
  outputMint: string;
  inAmount: string;
  outAmount: string;
  feeAmount: string;
  feeMint: string;
}

export interface RoutePlanItem {
  swapInfo: SwapInfo;
  percent: number;
  bps: number;
}

export interface OrderResponse {
  mode: string;
  inAmount: string;
  outAmount: string;
  otherAmountThreshold?: string;
  swapMode: string;
  slippageBps: number;
  priceImpactPct?: string;
  routePlan: RoutePlanItem[];

  feeMint: string;
  feeBps: number;
  taker: string;
  gasless: boolean;

  signatureFeeLamports: number;
  prioritizationFeeLamports?: number;
  rentFeeLamports?: number;

  transaction: string;
  requestId: string;

  inputMint?: string;
  outputMint?: string;
  swapType?: string;
  router?: string;

  inUsdValue?: number;
  outUsdValue?: number;
  priceImpact?: number;
  swapUsdValue?: number;

  totalTime?: number;
}


// EXECUTE RESPONSE TYPES


export interface ExecuteSwapEvent {
  inputMint: string;
  inputAmount: string;
  outputMint: string;
  outputAmount: string;
}

export interface ExecuteResponse {
  status: "Success" | "Failed";
  signature: string;
  slot: string;
  code: number;

  inputAmountResult: string;
  outputAmountResult: string;

  swapEvents?: ExecuteSwapEvent[];
}

// -----------------------------
// TYPE GUARDS
// -----------------------------

export function isOrderResponse(x: any): x is OrderResponse {
  return (
    x &&
    typeof x === "object" &&
    typeof x.transaction === "string" &&
    typeof x.requestId === "string"
  );
}

export function isExecuteResponse(x: any): x is ExecuteResponse {
  return (
    x &&
    typeof x === "object" &&
    typeof x.signature === "string" &&
    typeof x.status === "string"
  );
}

export type JupiterResponse = OrderResponse | ExecuteResponse;

// Optional default export
const JupiterResponseTypes = {};
export default JupiterResponseTypes;

