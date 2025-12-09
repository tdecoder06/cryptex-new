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
        <Marquee />
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








