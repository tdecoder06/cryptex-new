"use client";
import React from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { FadeIn } from "@/components/FadeIn";
import { ZapIcon, LaptopIcon, CoinsIcon } from "@/components/Icons";

const CryptoCard = ({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) => (
  <div className="glass-card p-8 rounded-3xl hover:scale-105 transition-transform duration-300 border border-gray-400/10">
    <div className="text-gray-600 mb-4">{icon}</div>
    <h3 className="text-2xl font-bold mb-4 text-gray-600">{title}</h3>
    <div className="text-muted leading-relaxed">{children}</div>
  </div>
);

export default function WhatsLitecoin() {
  return (
    <div className="w-full min-h-screen bg-background text-foreground flex flex-col font-sans">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative min-h-[60vh] flex flex-col items-center justify-center text-center px-6 pt-24 md:pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-gray-400/5 to-transparent pointer-events-none" />
        <FadeIn>
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold mb-6 text-gray-700 tracking-tighter">
            What is <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-gray-600 to-gray-400">
              Litecoin?
            </span>
          </h1>
        </FadeIn>
        <FadeIn delay={200}>
          <p className="text-xl md:text-2xl text-muted max-w-3xl mx-auto leading-relaxed">
            The silver to Bitcoin&apos;s gold. Fast, cheap, and reliable payments.
          </p>
        </FadeIn>
      </section>

      {/* CONTENT SECTIONS */}
      <div className="max-w-7xl mx-auto px-6 space-y-16 md:space-y-32 mb-32">

        {/* SECTION 1: ORIGIN */}
        <section className="grid md:grid-cols-2 gap-12 items-center">
          <FadeIn>
            <div className="relative">
              <div className="absolute -inset-4 bg-gray-400/10 rounded-full blur-3xl" />
              <img
                src="https://cryptologos.cc/logos/litecoin-ltc-logo.png?v=029"
                alt="Litecoin"
                className="relative rounded-3xl shadow-2xl -rotate-3 hover:rotate-0 transition-transform duration-500 bg-white p-4 w-64 h-64 object-contain mx-auto"
              />
            </div>
          </FadeIn>
          <FadeIn delay={200}>
            <h2 className="text-4xl font-bold mb-6 text-gray-700">Charlie Lee</h2>
            <p className="text-lg text-muted mb-6 leading-relaxed">
              Created in 2011 by Charlie Lee, a former Google engineer. Litecoin was one of the first {"altcoins"} derived from Bitcoin&apos;s open-source code.
            </p>
            <p className="text-lg text-muted leading-relaxed">
              Lee intended Litecoin to be a {"lite"} version of Bitcoin—faster transaction times and lower fees, making it better suited for smaller, everyday payments.
            </p>
          </FadeIn>
        </section>

        {/* SECTION 2: MECHANICS */}
        <section className="relative">
          <FadeIn>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl font-bold mb-6 text-gray-700">Key Differences</h2>
              <p className="text-lg text-muted">
                While similar to Bitcoin, Litecoin has some key technical distinctions.
              </p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8">
            <FadeIn delay={100}>
              <CryptoCard title="Speed" icon={<ZapIcon className="w-12 h-12" />}>
                Litecoin blocks are generated every 2.5 minutes, compared to Bitcoin&apos;s 10 minutes. This means faster confirmations.
              </CryptoCard>
            </FadeIn>
            <FadeIn delay={300}>
              <CryptoCard title="Scrypt" icon={<LaptopIcon className="w-12 h-12" />}>
                Litecoin uses the Scrypt hashing algorithm, which was designed to be more accessible to consumer-grade hardware than Bitcoin&apos;s SHA-256.
              </CryptoCard>
            </FadeIn>
            <FadeIn delay={500}>
              <CryptoCard title="Supply" icon={<CoinsIcon className="w-12 h-12" />}>
                There will be 84 million LTC, exactly 4 times the supply of Bitcoin (21 million).
              </CryptoCard>
            </FadeIn>
          </div>
        </section>

        {/* SECTION 3: USAGE */}
        <section className="bg-gray-400/5 rounded-[3rem] p-8 md:p-20 text-center relative overflow-hidden">
          <FadeIn>
            <h2 className="text-4xl font-bold mb-8 text-gray-700">Payments</h2>
            <p className="text-xl text-muted max-w-4xl mx-auto mb-12 leading-relaxed">
              Because of its speed and low fees, Litecoin is one of the most widely accepted cryptocurrencies for payments. It is often used to transfer funds between exchanges quickly.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {["Payments", "Transfers", "Testing", "Liquidity", "Adoption"].map((tag) => (
                <span key={tag} className="px-6 py-2 bg-white rounded-full text-gray-600 font-bold shadow-sm border border-gray-200">
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