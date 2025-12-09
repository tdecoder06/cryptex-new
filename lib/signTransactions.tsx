"use client";

import { VersionedTransaction } from "@solana/web3.js";
import { WalletContextState } from "@solana/wallet-adapter-react";

export async function signJupiterTransaction(
  base64Tx: string,
  wallet: WalletContextState
): Promise<string> {
  if (!wallet.signTransaction) {
    throw new Error("Wallet cannot sign transactions");
  }

  const tx = VersionedTransaction.deserialize(
    Buffer.from(base64Tx, "base64")
  );

  const signed = await wallet.signTransaction(tx);

  return Buffer.from(signed.serialize()).toString("base64");
}
