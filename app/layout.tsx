

// import type { Metadata } from "next";
// import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
// import "./globals.css";
// import localFont from "next/font/local";
// import Script from "next/script";

// import ClientWrappers from "@/providers/PrivyProviders";

// import SolanaProvider from "@/providers/SolanaProvider";

// const homeVideo = localFont({
//   src: "../public/fonts/myfont/HomeVideo-BLG6G.ttf",
//   variable: "--font-home-video",
// });
// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// const playfair = Playfair_Display({
//   variable: "--font-playfair",
//   subsets: ["latin"],
// });

// export const metadata: Metadata = {
//   title: "Cryptex | Modern Crypto Exchange",
//   description: "The most popular and trusted crypto exchange",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <head>
//         <Script
//           id="init-wallets"
//           strategy="beforeInteractive"
//           dangerouslySetInnerHTML={{
//             __html: `
//                window.navigator.wallets = window.navigator.wallets || [];
//              `,
//           }}
//         />
//         <Script
//           src="https://plugin.jup.ag/plugin-v1.js"
//           strategy="beforeInteractive"
//           data-preload
//           defer
//         />
//       </head>
//       <body
//         className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${homeVideo.variable} antialiased`}
//       >
//         <ClientWrappers>
//           <SolanaProvider>
//             {children}
//           </SolanaProvider>
//         </ClientWrappers>
//       </body>
//     </html>
//   );
// }


import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";

import ClientWrappers from "@/providers/PrivyProviders";
import SolanaProvider from "@/providers/SolanaProvider";

const homeVideo = localFont({
  src: "../public/fonts/myfont/HomeVideo-BLG6G.ttf",
  variable: "--font-home-video",
});
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cryptex | Modern Crypto Exchange",
  description: "The most popular and trusted crypto exchange",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} 
        ${geistMono.variable} 
        ${playfair.variable} 
        ${homeVideo.variable} antialiased`}
      >
        <ClientWrappers>
          <SolanaProvider>
            {children}
          </SolanaProvider>
        </ClientWrappers>
      </body>
    </html>
  );
}
