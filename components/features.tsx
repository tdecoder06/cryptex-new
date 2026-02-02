
"use client";

import React, { useEffect, useState } from "react";
import { FadeIn } from "./FadeIn";
import { OAuthProvider } from "appwrite";

import {
  ShieldIcon,
  CreditCardIcon,
  ZapIcon,
  HeadphonesIcon,
  CoinsIcon,
  SettingsIcon,
} from "./Icons";

import { account } from "@/components/appwrite";
import type { Models } from "appwrite";

const Features = () => {
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);

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

  const features = [
    {
      icon: <ShieldIcon className="w-8 h-8" />,
      title: "Secure Storage",
      description:
        "Industry-leading security systems to ensure your crypto assets are safe and always available.",
    },
    {
      icon: <CreditCardIcon className="w-8 h-8" />,
      title: "Instant Deposits",
      description:
        "Deposit funds easily with your credit/debit card or bank transfer. US customers enjoy instant ACH.",
    },
    {
      icon: <ZapIcon className="w-8 h-8" />,
      title: "Fast Withdrawals",
      description:
        "Cash out your funds directly to your bank account in seconds, available 24/7.",
    },
    {
      icon: <HeadphonesIcon className="w-8 h-8" />,
      title: "24/7 Support",
      description:
        "Our dedicated support team is here to help you with any questions or issues around the clock.",
    },
    {
      icon: <CoinsIcon className="w-8 h-8" />,
      title: "Low Fees",
      description:
        "Pay only 0.1% on every market trade and benefit from competitive rebates on high volume orders.",
    },
    {
      icon: <SettingsIcon className="w-8 h-8" />,
      title: "Powerful API",
      description:
        "Connect your trading bots and applications with our high-performance REST and WebSocket APIs.",
    },
  ];

  return (
    <div className="py-16 md:py-24 bg-[#d7e8ef]">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-[#1b2c38]">
            Why Choose <span className="text-[#2e5c74]">Cryptex</span>?
          </h2>
          <p className="text-[#4a5b63] text-lg mt-2 leading-relaxed">
            We provide the best experience for both beginners and experienced traders.
          </p>
        </div>

        {/* FEATURE GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <FadeIn key={index} delay={index * 100}>
              <div className="p-10 rounded-3xl bg-white shadow-[0_8px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_26px_rgba(0,0,0,0.12)] transition-all duration-300 h-full">
                <div className="w-16 h-16 bg-[#c8dce5] text-[#2e5c74] rounded-2xl flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3 text-[#1b2c38]">
                  {feature.title}
                </h3>
                <p className="text-[#4a5b63] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* CTA SECTION (Hidden if logged in) */}
        {!user && (
          <div className="mt-24 rounded-3xl p-16 text-center bg-[#c9dce5] shadow-[0_8px_20px_rgba(0,0,0,0.08)]">
            <h2 className="text-4xl font-bold mb-6 text-[#1b2c38]">
              Start Trading Today
            </h2>
            <p className="text-[#4a5b63] mb-8 max-w-2xl mx-auto">
              Join the world's most comprehensive crypto ecosystem.
            </p>

            <button
              onClick={handleLogin}
              className="bg-[#2e5c74] text-white px-10 py-4 rounded-2xl text-lg shadow-md hover:bg-[#244b5f] hover:shadow-lg transition-all cursor-pointer"
            >
              Create Free Account
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Features;
