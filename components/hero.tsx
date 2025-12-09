"use client";
import React, { use } from "react";
import { usePrivy } from '@privy-io/react-auth';

const Hero = () => {
  const { login, user } = usePrivy();
  return (
    <section
      className="
        py-20 md:py-32 flex flex-col justify-center items-center text-center px-4 md:px-6
        bg-linear-to-b from-[#FAF7F1] via-[#F3EFE6] to-[#EDE9DF]
        relative overflow-hidden
      "
    >

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(196,174,116,0.18),transparent_70%)]"></div>

      <h1 className="text-4xl md:text-5xl font-bold text-[#978a48] mb-6 relative z-10">
        No Experience? No Worries.
      </h1>

      <p className="text-gray-700 max-w-xl mb-8 relative z-10">
        Join our community and get access to curated opportunities, resources,
        and support — built for beginners aiming for their first job.
      </p>

      <div className="flex items-center bg-white border border-[#e0dccf] rounded-full overflow-hidden w-full max-w-md shadow-md relative z-10">
        <input
          type="email"
          placeholder="Enter your email"
          className="flex grow px-4 py-3 focus:outline-none text-black"
        />
        <button onClick={login} className="bg-[#C9A858] hover:bg-[#B19245] transition text-white px-6 py-3 font-semibold">
          Sign Up
        </button>
      </div>
    </section>
  );
};

export default Hero;
