"use client";

import React from "react";
import { usePrivy } from "@privy-io/react-auth";
import Link from "next/link";

const Navbar: React.FC = () => {
  const { login, connectWallet, logout, authenticated, user } = usePrivy();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

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

        {/* Desktop Links */}
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

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center space-x-4">
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

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-primary focus:outline-none"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-white shadow-lg border-t border-gray-100 flex flex-col p-6 space-y-4 animate-in slide-in-from-top-5 duration-200">
          <Link
            href="/"
            onClick={() => setIsMenuOpen(false)}
            className="text-lg font-medium text-foreground hover:text-primary"
          >
            Home
          </Link>
          <Link
            href="/about"
            onClick={() => setIsMenuOpen(false)}
            className="text-lg font-medium text-foreground hover:text-primary"
          >
            About us
          </Link>
          <Link
            href="/markets"
            onClick={() => setIsMenuOpen(false)}
            className="text-lg font-medium text-foreground hover:text-primary"
          >
            Markets
          </Link>
          <div className="h-px bg-gray-100 w-full my-2"></div>
          <button
            onClick={() => {
              connectWallet();
              setIsMenuOpen(false);
            }}
            className="bg-primary text-white px-6 py-3 rounded-lg font-semibold w-full"
          >
            {authenticated
              ? shortAddr(user?.wallet?.address) || "Wallet Connected"
              : "Connect Wallet"}
          </button>
          <button
            onClick={() => {
              authenticated ? logout() : login();
              setIsMenuOpen(false);
            }}
            className={
              authenticated
                ? "bg-red-500 text-white px-6 py-3 rounded-lg font-semibold w-full"
                : "bg-green-500 text-white px-6 py-3 rounded-lg font-semibold w-full"
            }
          >
            {authenticated ? "Logout" : "Login"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
