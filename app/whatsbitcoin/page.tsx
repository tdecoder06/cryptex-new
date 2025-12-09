"use client";
import React from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { FadeIn } from "@/components/FadeIn";
import { PickaxeIcon, TrendingDownIcon, ShieldIcon } from "@/components/Icons";

const CryptoCard = ({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) => (
  <div className="glass-card p-8 rounded-3xl hover:scale-105 transition-transform duration-300 border border-orange-500/10">
    <div className="text-orange-600 mb-4">{icon}</div>
    <h3 className="text-2xl font-bold mb-4 text-orange-700">{title}</h3>
    <div className="text-muted leading-relaxed">{children}</div>
  </div>
);

export default function WhatsBitcoin() {
  return (
    <div className="w-full min-h-screen bg-background text-foreground flex flex-col font-sans">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative min-h-[60vh] flex flex-col items-center justify-center text-center px-6 pt-24 md:pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-orange-500/5 to-transparent pointer-events-none" />
        <FadeIn>
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold mb-6 text-orange-600 tracking-tighter">
            What is <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500">
              Bitcoin?
            </span>
          </h1>
        </FadeIn>
        <FadeIn delay={200}>
          <p className="text-xl md:text-2xl text-muted max-w-3xl mx-auto leading-relaxed">
            The first decentralized cryptocurrency. Digital gold. The revolution.
          </p>
        </FadeIn>
      </section>

      {/* CONTENT SECTIONS */}
      <div className="max-w-7xl mx-auto px-6 space-y-16 md:space-y-32 mb-32">

        {/* SECTION 1: ORIGIN */}
        <section className="grid md:grid-cols-2 gap-12 items-center">
          <FadeIn>
            <div className="relative">
              <div className="absolute -inset-4 bg-orange-500/10 rounded-full blur-3xl" />
              <img
                src="https://images.unsplash.com/photo-1518546305927-5a555bb7020d?q=80&w=2069&auto=format&fit=crop"
                alt="Bitcoin"
                className="relative rounded-3xl shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500"
              />
            </div>
          </FadeIn>
          <FadeIn delay={200}>
            <h2 className="text-4xl font-bold mb-6 text-orange-700">Satoshi Nakamoto</h2>
            <p className="text-lg text-muted mb-6 leading-relaxed">
              In 2008, an unknown person or group named Satoshi Nakamoto published the Bitcoin whitepaper. It proposed a "Peer-to-Peer Electronic Cash System" that didn't rely on banks.
            </p>
            <p className="text-lg text-muted leading-relaxed">
              On January 3, 2009, the Genesis Block was mined, launching the network. To this day, Satoshi's identity remains a mystery.
            </p>
          </FadeIn>
        </section>

        {/* SECTION 2: MECHANICS */}
        <section className="relative">
          <FadeIn>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl font-bold mb-6 text-orange-700">How It Works</h2>
              <p className="text-lg text-muted">
                Bitcoin runs on a Proof-of-Work blockchain, secured by miners worldwide.
              </p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8">
            <FadeIn delay={100}>
              <CryptoCard title="Mining" icon={<PickaxeIcon className="w-12 h-12" />}>
                Computers compete to solve complex math problems. The winner adds a block to the chain and earns new Bitcoin.
              </CryptoCard>
            </FadeIn>
            <FadeIn delay={300}>
              <CryptoCard title="Halving" icon={<TrendingDownIcon className="w-12 h-12" />}>
                Every 4 years, the reward for mining is cut in half. This controls inflation and ensures only 21 million BTC will ever exist.
              </CryptoCard>
            </FadeIn>
            <FadeIn delay={500}>
              <CryptoCard title="Security" icon={<ShieldIcon className="w-12 h-12" />}>
                The massive computing power behind Bitcoin makes it the most secure computer network in the world.
              </CryptoCard>
            </FadeIn>
          </div>
        </section>

        {/* SECTION 3: STORE OF VALUE */}
        <section className="bg-orange-500/5 rounded-[3rem] p-8 md:p-20 text-center relative overflow-hidden">
          <FadeIn>
            <h2 className="text-4xl font-bold mb-8 text-orange-700">Digital Gold</h2>
            <p className="text-xl text-muted max-w-4xl mx-auto mb-12 leading-relaxed">
              Unlike fiat currency which can be printed endlessly, Bitcoin is scarce. This property has made it a premier store of value for institutions and individuals alike.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {["Scarcity", "Durability", "Portability", "Divisibility"].map((tag) => (
                <span key={tag} className="px-6 py-2 bg-white rounded-full text-orange-600 font-bold shadow-sm border border-orange-200">
                  {tag}
                </span>
              ))}
            </div>
          </FadeIn>
        </section>

      </div>

      <Footer />
    </div>
  );
}