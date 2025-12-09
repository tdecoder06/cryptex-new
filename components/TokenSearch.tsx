"use client";

import { useState, useEffect, useRef } from "react";
import { searchToken, TokenInfo } from "@/lib/searchToken";

interface TokenSearchProps {
  label?: string;
  onSelect: (token: TokenInfo) => void;
}

export default function TokenSearch({ label = "Token", onSelect }: TokenSearchProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<TokenInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  useEffect(() => {
    if (query.trim().length === 0) return;

    const timer = setTimeout(async () => {
      setLoading(true);
      const tokens = await searchToken(query);
      setResults(tokens);
      setLoading(false);
      setShowDropdown(true);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSelect = (token: TokenInfo) => {
    onSelect(token);
    setQuery(token.symbol);
    setResults([]);
    setShowDropdown(false);
  };

  return (
    <div className="w-full mb-3 relative" ref={containerRef}>
      <label className="text-gray-400 text-sm">{label}</label>

      <input
        className="w-full mt-1 px-3 py-2 rounded bg-[#1a1a1a] border border-[#333]"
        type="text"
        placeholder="Search token (e.g., SOL, USDC)"
        value={query}
        onChange={(e) => {
          const value = e.target.value;
          setQuery(value);
          if (value.trim().length === 0) {
            setResults([]);
            setShowDropdown(false);
          }
        }}
        onFocus={() => results.length > 0 && setShowDropdown(true)}
      />

      {loading && query && (
        <div className="absolute left-0 mt-2 w-full text-gray-500 text-sm">
          Searching...
        </div>
      )}

      {showDropdown && results.length > 0 && (
        <div className="absolute w-full bg-[#111] border border-[#333] mt-1 rounded-lg max-h-60 overflow-auto z-20 shadow-lg">
          {results.map((token) => (
            <button
              key={token.address}
              onClick={() => handleSelect(token)}
              className="w-full text-left px-3 py-2 hover:bg-[#222] cursor-pointer flex items-center gap-3"
            >
              {token.logoURI ? (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={token.logoURI}
                    alt={token.symbol}
                    className="w-5 h-5 rounded-full object-cover"
                    onError={(e) =>
                      ((e.target as HTMLImageElement).style.display = "none")
                    }
                  />
                </>
              ) : (
                <div className="w-5 h-5 rounded-full bg-[#333]" />
              )}

              <span className="text-sm">
                <strong>{token.symbol}</strong> — {token.name}
              </span>
            </button>
          ))}
        </div>
      )}

      {query && !loading && results.length === 0 && (
        <p className="mt-2 text-sm text-gray-500">No tokens found.</p>
      )}
    </div>
  );
}

