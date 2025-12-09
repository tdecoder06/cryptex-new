import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full bg-white py-8 md:py-12 border-t">
      <div className="max-w-7xl mx-auto px-6 md:px-10">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* LEFT LOGO + COPYRIGHT */}
          <div className="flex flex-col items-start">
            {/* Logo placeholder — replace with your logo img */}
            <h1 className="text-3xl font-extrabold text-[#0A1238] flex items-center gap-2">
              <span className="text-green-600">♦️</span> CRYPTEX
            </h1>

            <p className="text-gray-500 text-sm mt-2">
              © Cryptex.com 2025
            </p>
          </div>

          {/* COMPANY */}
          <div>
            <h3 className="font-semibold text-lg text-[#0A1238] mb-3">Company</h3>
            <ul className="flex flex-col gap-2 text-gray-600 text-sm cursor-pointer">
              <li>
                <Link href="/about">About</Link>
              </li>


              <li>
                <Link href="/terms">Terms of Service</Link>
              </li>
              <li>
                <Link href="/privacy">Privacy</Link>
              </li>
              <li>
                <Link href="/contact">Contact Us</Link>
              </li>
              <li>
                <Link href="/faq">FAQs</Link>
              </li>


            </ul>
          </div>

          {/* LEARNING CENTER */}
          <div>
            <h3 className="font-semibold text-lg text-[#0A1238] mb-3">Learning Center</h3>

            <div className="grid grid-cols-2 gap-x-8 text-sm">
              <ul className="flex flex-col gap-2 text-gray-600">
                <li>
                  <Link href="/whatscrypto">What is Crypto?</Link>
                </li>
                <li>
                  <Link href="/whatsbitcoin">What is Bitcoin?</Link>
                </li>
                <li>
                  <Link href="/whatsblockchain">What is Blockchain?</Link>
                </li>
                <li>
                  <Link href="/whatsethereum">What is Ethereum?</Link>
                </li>
                <li>
                  <Link href="/whatslitecoin">What is Litecoin?</Link>
                </li>
              </ul>


            </div>
          </div>

          {/* ESCROW SERVICES */}

        </div>

      </div>
    </footer>
  );
};

export default Footer;
