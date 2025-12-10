import React from 'react';
import Navbar from '../components/navbar';
import Hero from '../components/hero';
import Marquee from 'react-fast-marquee';
import MarketTable from '../components/market-table';
import Features from '../components/features';
import Info from '../components/info';
import Footer from '@/components/footer';
import { FadeIn } from '@/components/FadeIn';
import PluginComponent from '@/components/plugin';









export default function Home() {

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Navbar />
      <FadeIn>
        <Hero />
      </FadeIn>
      <FadeIn delay={200}>
        <div className="py-4 border-y border-white/5 bg-white/5 backdrop-blur-sm mb-12">
          <Marquee gradient={false} speed={40} className="py-2">
            <div className="flex gap-8 px-4 text-sm font-medium text-gray-400">
              <span className="text-white">BTC <span className="text-green-400">+2.4%</span></span>
              <span>ETH <span className="text-green-400">+1.8%</span></span>
              <span>SOL <span className="text-red-400">-0.5%</span></span>
              <span className="text-white">ADA <span className="text-green-400">+5.2%</span></span>
              <span>DOT <span className="text-green-400">+3.1%</span></span>
              <span>DOGE <span className="text-red-400">-1.2%</span></span>
              <span className="text-white">MATIC <span className="text-green-400">+0.8%</span></span>
              <span>LINK <span className="text-green-400">+4.5%</span></span>
              <span>UNI <span className="text-red-400">-2.1%</span></span>
              <span className="text-white">AVAX <span className="text-green-400">+6.7%</span></span>
              <span>ATOM <span className="text-green-400">+1.5%</span></span>
              <span>LTC <span className="text-red-400">-0.3%</span></span>
            </div>
          </Marquee>
        </div>
      </FadeIn>
      <FadeIn delay={400}>
        <MarketTable />
        <PluginComponent />
      </FadeIn>
      <FadeIn delay={600}>
        <Features />
      </FadeIn>
      <FadeIn delay={800}>
        <Info />
      </FadeIn>



      <Footer />


    </div>
  );
}








