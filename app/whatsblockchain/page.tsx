"use client";
import React from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { FadeIn } from "@/components/FadeIn";
import { GlobeIcon, EyeIcon, LockIcon } from "@/components/Icons";

const CryptoCard = ({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) => (
  <div className="glass-card p-8 rounded-3xl hover:scale-105 transition-transform duration-300 border border-blue-500/10">
    <div className="text-blue-600 mb-4">{icon}</div>
    <h3 className="text-2xl font-bold mb-4 text-blue-600">{title}</h3>
    <div className="text-muted leading-relaxed">{children}</div>
  </div>
);

export default function WhatsBlockchain() {
  return (
    <div className="w-full min-h-screen bg-background text-foreground flex flex-col font-sans">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative min-h-[60vh] flex flex-col items-center justify-center text-center px-6 pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent pointer-events-none" />
        <FadeIn>
          <h1 className="text-6xl md:text-8xl font-bold mb-6 text-blue-700 tracking-tighter">
            What is <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
              Blockchain?
            </span>
          </h1>
        </FadeIn>
        <FadeIn delay={200}>
          <p className="text-xl md:text-2xl text-muted max-w-3xl mx-auto leading-relaxed">
            The underlying technology of trust. A shared, immutable ledger.
          </p>
        </FadeIn>
      </section>

      {/* CONTENT SECTIONS */}
      <div className="max-w-7xl mx-auto px-6 space-y-32 mb-32">

        {/* SECTION 1: THE LEDGER */}
        <section className="grid md:grid-cols-2 gap-12 items-center">
          <FadeIn>
            <div className="relative">
              <div className="absolute -inset-4 bg-blue-500/10 rounded-full blur-3xl" />
              <img
                src="https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2032&auto=format&fit=crop"
                alt="Blockchain"
                className="relative rounded-3xl shadow-2xl -rotate-3 hover:rotate-0 transition-transform duration-500"
              />
            </div>
          </FadeIn>
          <FadeIn delay={200}>
            <h2 className="text-4xl font-bold mb-6 text-blue-700">A Chain of Blocks</h2>
            <p className="text-lg text-muted mb-6 leading-relaxed">
              Imagine a digital notebook that is shared among thousands of computers. When a page is full (a block), it gets sealed with a digital wax seal (hash) and added to the stack.
            </p>
            <p className="text-lg text-muted leading-relaxed">
              If anyone tries to change a previous page, the seal breaks, and everyone knows it was tampered with. This is immutability.
            </p>
          </FadeIn>
        </section>

        {/* SECTION 2: CORE CONCEPTS */}
        <section className="relative">
          <FadeIn>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl font-bold mb-6 text-blue-700">Core Concepts</h2>
              <p className="text-lg text-muted">
                Three pillars that make blockchain revolutionary.
              </p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8">
            <FadeIn delay={100}>
              <CryptoCard title="Decentralization" icon={<GlobeIcon className="w-12 h-12" />}>
                No single boss. The network is run by users (nodes) all over the world, making it impossible to shut down.
              </CryptoCard>
            </FadeIn>
            <FadeIn delay={300}>
              <CryptoCard title="Transparency" icon={<EyeIcon className="w-12 h-12" />}>
                The ledger is public. Anyone can view the history of transactions, ensuring total accountability.
              </CryptoCard>
            </FadeIn>
            <FadeIn delay={500}>
              <CryptoCard title="Security" icon={<LockIcon className="w-12 h-12" />}>
                Cryptography ensures that only you can access your funds. Math protects your money, not a bank vault.
              </CryptoCard>
            </FadeIn>
          </div>
        </section>

        {/* SECTION 3: USE CASES */}
        <section className="bg-blue-500/5 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
          <FadeIn>
            <h2 className="text-4xl font-bold mb-8 text-blue-700">Beyond Money</h2>
            <p className="text-xl text-muted max-w-4xl mx-auto mb-12 leading-relaxed">
              Blockchain isn't just for Bitcoin. It's being used to revolutionize supply chains, healthcare records, voting systems, and digital identity.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {["Supply Chain", "Healthcare", "Voting", "Identity", "Real Estate", "Gaming"].map((tag) => (
                <span key={tag} className="px-6 py-2 bg-white rounded-full text-blue-600 font-bold shadow-sm border border-blue-200">
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
