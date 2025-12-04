import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import React from "react";
import { FadeIn } from "@/components/FadeIn";

export default function HomePage() {
  return (
    <div className="w-full py-20 bg-white text-left">
      <Navbar />

      {/* Section 1 */}
      <div className="max-w-4xl mx-auto mb-20 px-6 pt-20">
        <FadeIn>
          <h1 className="text-4xl md:text-5xl font-bold text-[#0A1238] mb-8">
            About Us
          </h1>
          <p className="text-gray-600 mt-2 leading-relaxed">
            Cryptocurrency is about the art of the possible. We're here to open the door to the world of online purchases, from luxury watches to new real estate.
            <br /><br />
            Our mission is to accelerate the everyday use of cryptocurrencies by providing the go-to Defi Crypto Exchange for all transactions.
            <br /><br />
            Cryptex.com strives to be the go-to exchange to trade cryptocurrencies. We do this by providing our users with a wide variety of products that they can purchase with their crypto and offering a state-of-the-art platform that is easy to use for beginners and advanced users alike. Users can buy, store and trade cryptocurrencies and other items with complete peace of mind using our secure website for free.
          </p>
        </FadeIn>
      </div>

      {/* Section 2 */}
      <div className="max-w-4xl mx-auto mb-20 px-6">
        <FadeIn delay={200}>
          <h1 className="text-4xl md:text-5xl font-bold text-[#0A1238] mb-8">
            Who are We?
          </h1>
          <p className="text-gray-600 mt-2 leading-relaxed">
            Cryptex is a trusted platform designed to make crypto trading simple, secure, and accessible for everyone. We provide real-time market prices and clear insights to help users understand trends with confidence. Whether you want to buy, sell, or exchange cryptocurrencies, Cryptex offers a seamless and reliable experience, empowering you to manage your digital assets effortlessly.
          </p>
        </FadeIn>
      </div>

      {/* Section 3 */}
      <div className="max-w-4xl mx-auto mb-20 px-6">
        <FadeIn delay={400}>
          <h1 className="text-4xl md:text-5xl font-bold text-[#0A1238] mb-8">
            A Crypto Exchange Experience for Everyone
          </h1>
          <p className="text-gray-600 mt-2 leading-relaxed">
            Bitcoin is more than a digital currency. It is a revolution of the concept of money as we know it. The decentralized cash system was created by Satoshi Nakamoto, launching back in 2009. Bitcoin has since gained a lot of interest from early adopters to investors alike, now becoming a standard investment for any diversified portfolio. As cryptocurrency gains popularity, the world has watched the price surpass new all-time highs as newcomers begin to recognize the scarcity of this valuable asset, creating a rush to invest and buy Bitcoin.
          </p>
        </FadeIn>
      </div>

      {/* Section 4 */}
      <div className="max-w-4xl mx-auto mb-20 px-6">
        <FadeIn delay={600}>
          <h1 className="text-4xl md:text-5xl font-bold text-[#0A1238] mb-8">
            What we do?
          </h1>
          <h2 className="text-xl font-semibold text-[#0A1238]">Helps users analyse the market trends</h2>
          <p className="text-gray-600 mt-2 leading-relaxed mb-6">
            Users of Cryptex.com gain access to see and analyse real time crypto prices and view charts
          </p>

          <h2 className="text-xl font-semibold text-[#0A1238]">Provide an easy to use platform to buy and sell crypto</h2>
          <p className="text-gray-600 mt-2 leading-relaxed mb-6">
            Users can purchase various top cryptocurrencies with a credit card or wire transfer.
          </p>

          <h2 className="text-xl font-semibold text-[#0A1238]">Support Sellers</h2>
          <p className="text-gray-600 mt-2 leading-relaxed">
            As a go-to marketplace, users can easily list their products to sell. Products immediately become available to a growing community of crypto enthusiasts.
          </p>
        </FadeIn>
      </div>

      <Footer />
    </div>
  );
}
