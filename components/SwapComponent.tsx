


"use client";

import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";

import TokenSearch from "@/components/TokenSearch";
import type { TokenInfo } from "@/lib/searchToken";

import { getOrder } from "@/lib/getOrders";
import { getShield } from "@/lib/getShield";
import { signJupiterTransaction } from "@/lib/signTransactions";
import { pollExecuteOrder } from "@/lib/pollExecuteOrder";

import type { OrderResponse, ExecuteResponse } from "@/lib/jupiterResponse";

interface SwapComponentProps {
  prefillToken?: string; // Used only when clicking “Exchange”
}

export default function SwapComponent({ prefillToken }: SwapComponentProps) {
  const wallet = useWallet();

  const [inputToken, setInputToken] = useState<TokenInfo | null>(null);
  const [outputToken, setOutputToken] = useState<TokenInfo | null>(null);

  const [amount, setAmount] = useState("");
  const [useShield, setUseShield] = useState(false);

  const [status, setStatus] = useState("");
  const [txSignature, setTxSignature] = useState("");
  const [orderDetails, setOrderDetails] = useState<OrderResponse | null>(null);
  const [resultDetails, setResultDetails] = useState<ExecuteResponse | null>(null);

  // OPTIONAL: Pre-fill only in UI (⚠️ does NOT trigger setState, so no warnings!)
  const showPrefillToken = prefillToken ? `(${prefillToken})` : "";

  const handleSwap = async () => {
    if (!wallet.publicKey) return alert("Please connect your wallet.");
    if (!inputToken || !outputToken) return alert("Select both tokens.");
    if (!amount || Number(amount) <= 0) return alert("Enter valid amount.");

    try {
      setStatus("Building route with Jupiter...");
      setTxSignature("");
      setOrderDetails(null);
      setResultDetails(null);

      const rawAmount = Math.floor(Number(amount) * 10 ** inputToken.decimals).toString();

      let order: OrderResponse;

      // 1️⃣ GET ORDER / SHIELD
      if (useShield) {
        order = await getShield({
          inputMint: inputToken.address,
          outputMint: outputToken.address,
          amount: rawAmount,
          taker: wallet.publicKey.toBase58(),
        });
      } else {
        order = await getOrder({
          inputMint: inputToken.address,
          outputMint: outputToken.address,
          amount: rawAmount,
          taker: wallet.publicKey.toBase58(),
        });
      }

      setOrderDetails(order);
      setStatus("Signing transaction...");

      // 2️⃣ SIGN
      const signedTx = await signJupiterTransaction(order.transaction, wallet);

      setStatus("Submitting & polling...");

      // 3️⃣ EXECUTE + POLL
      const result = await pollExecuteOrder({
        requestId: order.requestId,
        signedTransaction: signedTx,
      });

      if (result?.signature) {
        setTxSignature(result.signature);
        setResultDetails(result);
        setStatus("Swap successful!");
      } else {
        setStatus("Swap failed or expired.");
      }
    } catch (error: any) {
      console.error(error);
      setStatus("Error: " + error.message);
    }
  };

  return (
    <div className="bg-[#050608] border border-[#222] p-6 rounded-2xl mt-10 max-w-lg mx-auto shadow-lg">
      
      <h2 className="text-xl font-semibold mb-4 flex justify-between items-center">
        <span>Swap {showPrefillToken}</span>
        <span className="text-xs text-gray-400">
          Powered by <span className="text-violet-400 font-semibold">Jupiter Ultra</span>
        </span>
      </h2>

      {/* FROM */}
      <TokenSearch label="From" onSelect={(t) => setInputToken(t)} />
      {inputToken && (
        <p className="text-xs text-gray-500 mt-1">
          Selected: {inputToken.symbol}
        </p>
      )}

      {/* TO */}
      <div className="mt-3">
        <TokenSearch label="To" onSelect={(t) => setOutputToken(t)} />
        {outputToken && (
          <p className="text-xs text-gray-500 mt-1">
            Selected: {outputToken.symbol}
          </p>
        )}
      </div>

      {/* AMOUNT */}
      <div className="mt-4">
        <label className="text-sm text-gray-400">
          Amount {inputToken ? `(${inputToken.symbol})` : ""}
        </label>

        <input
          type="number"
          value={amount}
          placeholder="0.0"
          onChange={(e) => setAmount(e.target.value)}
          className="w-full mt-1 px-3 py-2 rounded bg-[#111] border border-[#333] 
          focus:outline-none focus:border-violet-500"
        />
      </div>

      {/* TOGGLE SHIELD */}
      <div className="flex items-center justify-between mt-5 mb-4">
        <div>
          <p className="text-sm text-gray-300">Shielded swap</p>
          <p className="text-xs text-gray-500">MEV-protected routing</p>
        </div>

        <button
          type="button"
          onClick={() => setUseShield((v) => !v)}
          className={`w-12 h-6 rounded-full flex items-center px-1 transition 
          ${useShield ? "bg-violet-500" : "bg-gray-600"}`}
        >
          <div className={`w-4 h-4 bg-white rounded-full transition 
            ${useShield ? "translate-x-6" : ""}`} />
        </button>
      </div>

      {/* SWAP BTN */}
      <button
        onClick={handleSwap}
        className="w-full bg-violet-600 hover:bg-violet-700 py-2 rounded-lg 
        text-white font-semibold transition"
      >
        {useShield ? "Shielded Swap" : "Swap"}
      </button>

      {/* STATUS */}
      {status && (
        <p className="mt-4 text-sm text-gray-300">
          <strong>Status:</strong> {status}
        </p>
      )}

      {/* TX SIGNATURE */}
      {txSignature && (
        <p className="mt-2 text-sm text-green-400 break-all">
          <strong>Tx Signature:</strong> {txSignature}
        </p>
      )}

      {/* ORDER DETAILS */}
      {orderDetails && (
        <div className="mt-4 p-3 rounded bg-[#090b10] border border-[#222] text-xs text-gray-300">
          <p><strong>In → Out:</strong> {orderDetails.inAmount} → {orderDetails.outAmount}</p>
          {orderDetails.priceImpactPct && (
            <p><strong>Price Impact:</strong> {orderDetails.priceImpactPct}</p>
          )}
        </div>
      )}

      {/* EXECUTION RESULT */}
      {resultDetails && (
        <div className="mt-3 p-3 rounded bg-[#090b10] border border-[#222] text-xs text-gray-300">
          <p><strong>Status:</strong> {resultDetails.status}</p>
          <p><strong>Input:</strong> {resultDetails.inputAmountResult}</p>
          <p><strong>Output:</strong> {resultDetails.outputAmountResult}</p>
        </div>
      )}
    </div>
  );
}
