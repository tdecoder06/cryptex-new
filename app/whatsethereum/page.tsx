"use client";
import React from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { FadeIn } from "@/components/FadeIn";
import { ScrollIcon, FuelIcon, LeafIcon } from "@/components/Icons";

const CryptoCard = ({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) => (
  <div className="glass-card p-8 rounded-3xl hover:scale-105 transition-transform duration-300 border border-purple-500/10">
    <div className="text-purple-600 mb-4">{icon}</div>
    <h3 className="text-2xl font-bold mb-4 text-purple-600">{title}</h3>
    <div className="text-muted leading-relaxed">{children}</div>
  </div>
);

export default function WhatsEthereum() {
  return (
    <div className="w-full min-h-screen bg-background text-foreground flex flex-col font-sans">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative min-h-[60vh] flex flex-col items-center justify-center text-center px-6 pt-24 md:pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-purple-500/5 to-transparent pointer-events-none" />
        <FadeIn>
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold mb-6 text-purple-700 tracking-tighter">
            What is <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-600 to-indigo-500">
              Ethereum?
            </span>
          </h1>
        </FadeIn>
        <FadeIn delay={200}>
          <p className="text-xl md:text-2xl text-muted max-w-3xl mx-auto leading-relaxed">
            The world computer. Smart contracts. The foundation of Web3.
          </p>
        </FadeIn>
      </section>

      {/* CONTENT SECTIONS */}
      <div className="max-w-7xl mx-auto px-6 space-y-16 md:space-y-32 mb-32">

        {/* SECTION 1: ORIGIN */}
        <section className="grid md:grid-cols-2 gap-12 items-center">
          <FadeIn>
            <div className="relative">
              <div className="absolute -inset-4 bg-purple-500/10 rounded-full blur-3xl" />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Ethereum_logo_2014.svg/1200px-Ethereum_logo_2014.svg.png"
                alt="Ethereum"
                className="relative rounded-3xl shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500 bg-white p-8 w-64 h-64 object-contain mx-auto"
              />
            </div>
          </FadeIn>
          <FadeIn delay={200}>
            <h2 className="text-4xl font-bold mb-6 text-purple-700">Vitalik Buterin</h2>
            <p className="text-lg text-muted mb-6 leading-relaxed">
              Proposed in 2013 by programmer Vitalik Buterin, Ethereum launched in 2015. While Bitcoin was designed as money, Ethereum was designed as a platform.
            </p>
            <p className="text-lg text-muted leading-relaxed">
              It introduced the concept of "Smart Contracts"—programmable code that runs on the blockchain, enabling developers to build decentralized applications (DApps).
            </p>
          </FadeIn>
        </section>

        {/* SECTION 2: MECHANICS */}
        <section className="relative">
          <FadeIn>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl font-bold mb-6 text-purple-700">The Ecosystem</h2>
              <p className="text-lg text-muted">
                Ethereum is the busiest blockchain in the world, powering thousands of apps.
              </p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8">
            <FadeIn delay={100}>
              <CryptoCard title="Smart Contracts" icon={<ScrollIcon className="w-12 h-12" />}>
                Self-executing contracts with the terms of the agreement directly written into code. No lawyers needed.
              </CryptoCard>
            </FadeIn>
            <FadeIn delay={300}>
              <CryptoCard title="Gas Fees" icon={<FuelIcon className="w-12 h-12" />}>
                To run code on the "World Computer", you pay a fee in ETH called "Gas". This compensates the network for computing power.
              </CryptoCard>
            </FadeIn>
            <FadeIn delay={500}>
              <CryptoCard title="Proof of Stake" icon={<LeafIcon className="w-12 h-12" />}>
                Ethereum 2.0 switched to Proof of Stake, reducing its energy consumption by 99.95% compared to Bitcoin.
              </CryptoCard>
            </FadeIn>
          </div>
        </section>

        {/* SECTION 3: WEB3 */}
        <section className="bg-purple-500/5 rounded-[3rem] p-8 md:p-20 text-center relative overflow-hidden">
          <FadeIn>
            <h2 className="text-4xl font-bold mb-8 text-purple-700">The Birth of Web3</h2>
            <p className="text-xl text-muted max-w-4xl mx-auto mb-12 leading-relaxed">
              Ethereum enabled the creation of DeFi (Decentralized Finance), NFTs (Non-Fungible Tokens), and DAOs (Decentralized Autonomous Organizations). It is the backbone of the new internet.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {["DeFi", "NFTs", "DAOs", "Stablecoins", "Metaverse", "Gaming"].map((tag) => (
                <span key={tag} className="px-6 py-2 bg-white rounded-full text-purple-600 font-bold shadow-sm border border-purple-200">
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
