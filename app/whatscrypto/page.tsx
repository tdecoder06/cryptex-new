"use client";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { FadeIn } from "@/components/FadeIn";
import { GlobeIcon, SearchIcon, LockIcon } from "@/components/Icons";

const CryptoCard = ({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) => (
  <div className="glass-card p-8 rounded-3xl hover:scale-105 transition-transform duration-300 border border-primary/10">
    <div className="text-primary mb-4">{icon}</div>
    <h3 className="text-2xl font-bold mb-4 text-primary">{title}</h3>
    <div className="text-muted leading-relaxed">{children}</div>
  </div>
);

export default function WhatsCrypto() {

  return (
    <div className="w-full min-h-screen bg-background text-foreground flex flex-col font-sans">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative min-h-[60vh] flex flex-col items-center justify-center text-center px-6 pt-24 md:pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-primary/5 to-transparent pointer-events-none" />
        <FadeIn>
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold mb-6 text-primary tracking-tighter">
            What is <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-green-600">
              Cryptocurrency?
            </span>
          </h1>
        </FadeIn>
        <FadeIn delay={200}>
          <p className="text-xl md:text-2xl text-muted max-w-3xl mx-auto leading-relaxed">
            The future of money is digital, decentralized, and secure.
          </p>
        </FadeIn>
      </section>

      {/* CONTENT SECTIONS */}
      <div className="max-w-7xl mx-auto px-6 space-y-16 md:space-y-32 mb-32">

        {/* SECTION 1: DEFINITION */}
        <section className="grid md:grid-cols-2 gap-12 items-center">
          <FadeIn>
            <div className="relative">
              <div className="absolute -inset-4 bg-green-500/10 rounded-full blur-3xl" />
              <img
                src="https://images.unsplash.com/photo-1518546305927-5a555bb7020d?q=80&w=2069&auto=format&fit=crop"
                alt="Crypto"
                className="relative rounded-3xl shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500"
              />
            </div>
          </FadeIn>
          <FadeIn delay={200}>
            <h2 className="text-4xl font-bold mb-6 text-primary">Digital Gold</h2>
            <p className="text-lg text-muted mb-6 leading-relaxed">
              Cryptocurrency is a digital or virtual currency secured by cryptography, making it nearly impossible to counterfeit or double-spend.
            </p>
            <p className="text-lg text-muted leading-relaxed">
              Unlike traditional currency issued by governments (fiat), cryptocurrencies operate on decentralized networks based on blockchain technology—a distributed ledger enforced by a disparate network of computers.
            </p>
          </FadeIn>
        </section>

        {/* SECTION 2: BLOCKCHAIN */}
        <section className="relative">
          <FadeIn>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl font-bold mb-6 text-primary">The Power of Blockchain</h2>
              <p className="text-lg text-muted">
                Imagine a book where everyone can write, but no one can erase. That&apos;s blockchain.
              </p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8">
            <FadeIn delay={100}>
              <CryptoCard title="Decentralized" icon={<GlobeIcon className="w-12 h-12" />}>
                No single entity controls the network. It lives on thousands of computers worldwide, making it resistant to censorship and failure.
              </CryptoCard>
            </FadeIn>
            <FadeIn delay={300}>
              <CryptoCard title="Transparent" icon={<SearchIcon className="w-12 h-12" />}>
                Every transaction is recorded on a public ledger. Anyone can verify the data, ensuring total accountability.
              </CryptoCard>
            </FadeIn>
            <FadeIn delay={500}>
              <CryptoCard title="Immutable" icon={<LockIcon className="w-12 h-12" />}>
                Once data is written to the blockchain, it cannot be changed or deleted. This creates an unalterable history of truth.
              </CryptoCard>
            </FadeIn>
          </div>
        </section>

        {/* SECTION 3: SMART CONTRACTS */}
        <section className="bg-primary/5 rounded-[3rem] p-8 md:p-20 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            {/* Abstract BG pattern could go here */}
          </div>
          <FadeIn>
            <h2 className="text-4xl font-bold mb-8 text-primary">Smart Contracts</h2>
            <p className="text-xl text-muted max-w-4xl mx-auto mb-12 leading-relaxed">
             {"If X happens, then execute Y."}<br />
              Smart contracts are self-executing programs that run automatically when conditions are met. They eliminate middlemen, reduce costs, and enable the world of DeFi (Decentralized Finance).
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {["DeFi", "NFTs", "DAOs", "Gaming"].map((tag) => (
                <span key={tag} className="px-6 py-2 bg-white rounded-full text-primary font-bold shadow-sm border border-primary/10">
                  {tag}
                </span>
              ))}
            </div>
          </FadeIn>
        </section>

        {/* SECTION 4: FUTURE */}
        <section className="grid md:grid-cols-2 gap-16 items-center">
          <FadeIn>
            <h2 className="text-4xl font-bold mb-6 text-primary">The Future is Here</h2>
            <p className="text-lg text-muted mb-6 leading-relaxed">
              We are witnessing the biggest transfer of wealth and technology in history. From banking the unbanked to tokenizing real-world assets like real estate and art.
            </p>
            <p className="text-lg text-muted leading-relaxed">
              Understanding these concepts isn&apos;t just about finance—it&apos;s about understanding the next evolution of the internet (Web3).
            </p>
          </FadeIn>
          <FadeIn delay={200}>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-100 p-6 rounded-2xl text-center">
                <div className="text-3xl font-bold text-green-700 mb-2">24/7</div>
                <div className="text-sm text-green-800">Markets Never Sleep</div>
              </div>
              <div className="bg-blue-100 p-6 rounded-2xl text-center">
                <div className="text-3xl font-bold text-blue-700 mb-2">100%</div>
                <div className="text-sm text-blue-800">User Ownership</div>
              </div>
              <div className="bg-purple-100 p-6 rounded-2xl text-center">
                <div className="text-3xl font-bold text-purple-700 mb-2">$2T+</div>
                <div className="text-sm text-purple-800">Market Cap</div>
              </div>
              <div className="bg-orange-100 p-6 rounded-2xl text-center">
                <div className="text-3xl font-bold text-orange-700 mb-2">Global</div>
                <div className="text-sm text-orange-800">Borderless Access</div>
              </div>
            </div>
          </FadeIn>
        </section>

      </div>

      <Footer />
    </div>
  );
}
