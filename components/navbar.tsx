"use client";

import React from "react";
import { usePrivy } from "@privy-io/react-auth";
import Link from "next/link";

const Navbar: React.FC = () => {
  const { login, connectWallet, logout, authenticated, user } = usePrivy();

  const shortAddr = (addr?: string) =>
    addr ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : "";

  return (
    <div className="glass fixed w-full top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">

        {/* Logo */}
        <div className="flex items-center gap-2 ">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-green font-bold text-xl">♦️</span>
          </div>
          <span className="text-2xl font-bold tracking-tight text-foreground">
            CRYPTEX
          </span>
        </div>

        {/* Links with Next.js routing */}
        <div className="hidden md:flex items-center space-x-8">
          <Link
            href="/"
            className="text-muted hover:text-primary font-medium transition-colors duration-200 cursor-pointer"
          >
            Home
          </Link>

          <Link
            href="/about"
            className="text-muted hover:text-primary font-medium transition-colors duration-200 cursor-pointer"
          >
            About us
          </Link>

          <Link
            href="/markets"
            className="text-muted hover:text-primary font-medium transition-colors duration-200 cursor-pointer"
          >
            Markets
          </Link>


        </div>

        {/* Buttons */}
        <div className="flex items-center space-x-4">
          {/* Connect Wallet */}
          <button
            onClick={connectWallet}
            className="bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary/90 transition-all duration-200 transform hover:scale-105 shadow-lg shadow-primary/20 cursor-pointer"
          >
            {authenticated
              ? shortAddr(user?.wallet?.address) || "Wallet Connected"
              : "Connect Wallet"}
          </button>

          {/* Login / Logout */}
          <button
            onClick={authenticated ? logout : login}
            className={
              authenticated
                ? "bg-red-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-600 transition-all duration-200 transform hover:scale-105 shadow-lg shadow-red-400/20"
                : "bg-green-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-600 transition-all duration-200 transform hover:scale-105 shadow-lg shadow-green-400/20 cursor-pointer"
            }
          >
            {authenticated ? "Logout" : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
