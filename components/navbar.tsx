

"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { account } from "@/components/appwrite";
import type { Models } from "appwrite";
import { OAuthProvider } from "appwrite";


const Navbar: React.FC = () => {
  const [user, setUser] =
    useState<Models.User<Models.Preferences> | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // ✅ RESTORED

  useEffect(() => {
    account
      .get()
      .then((res) => setUser(res))
      .catch(() => setUser(null));
  }, []);

  const handleLogin = () => {
    account.createOAuth2Session(
        OAuthProvider.Google,
      "http://localhost:3000",
      "http://localhost:3000"
    );
  };

  const handleLogout = async () => {
    await account.deleteSession("current");
    setUser(null);
  };

  return (
    <div className="glass fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-xl">♦️</span>
          </div>
          <span className="text-2xl font-bold text-foreground">
            CRYPTEX
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/" className="hover:text-primary">Home</Link>
          <Link href="/about" className="hover:text-primary">About Us</Link>
          <Link href="/markets" className="hover:text-primary">Markets</Link>
        </div>

        {/* Desktop Auth */}
        <div className="hidden md:flex">
          {user ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-6 py-2 rounded-lg"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={handleLogin}
              className="bg-green-500 text-white px-6 py-2 rounded-lg"
            >
              Login
            </button>
          )}
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)} // ✅ WORKING TOGGLE
            className="text-2xl"
          >
            {isMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white px-6 py-6 flex flex-col space-y-5 shadow-lg">

          <Link
            href="/"
            onClick={() => setIsMenuOpen(false)}
            className="text-lg font-medium hover:text-primary"
          >
            Home
          </Link>

          <Link
            href="/about"
            onClick={() => setIsMenuOpen(false)}
            className="text-lg font-medium hover:text-primary"
          >
            About Us
          </Link>

          <Link
            href="/markets"
            onClick={() => setIsMenuOpen(false)}
            className="text-lg font-medium hover:text-primary"
          >
            Markets
          </Link>

          {user ? (
            <button
              onClick={() => {
                handleLogout();
                setIsMenuOpen(false);
              }}
              className="bg-red-500 text-white px-6 py-3 rounded-lg w-full mt-4"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => {
                handleLogin();
                setIsMenuOpen(false);
              }}
              className="bg-green-500 text-white px-6 py-3 rounded-lg w-full mt-4"
            >
              Login
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;

