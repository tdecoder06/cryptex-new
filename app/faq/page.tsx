
import Footer from "@/components/footer";

import Navbar from "@/components/navbar";
import React from "react";

export default function FaqPage() {
    return (
        <div className="w-full py-20 bg-white text-left">

            {/* Section 1 */}
            <div className="max-w-4xl mx-auto mb-20 ">
                <h1 className="text-4xl md:text-5xl font-bold text-[#0A1238] mb-8 ">
Cryptex – Frequently Asked Questions (FAQ)</h1>
               

                <div className="max-w-4xl mx-auto mb-20 mt-4 ">
                    

                        <h2 className="mt-4">
                        1. What is Cryptex?</h2>
<p className="text-gray-600 mt-2 leading-relaxed">
Cryptex is a crypto-based platform that provides tools, analytics, and features to help users track, manage, and understand their cryptocurrency activity. We do **not** store private keys or provide financial advice.

</p>

<h2 className="mt-4">
                        2. Is Cryptex a crypto exchange?</h2>
<p className="text-gray-600 mt-2 leading-relaxed">
No. Cryptex is not an exchange. We provide tools and features such as tracking, analytics, and wallet connections, but users buy or sell assets through their own preferred exchanges.
</p>

<h2 className="mt-4">
                        3. Is Cryptex safe to use?</h2>
<p className="text-gray-600 mt-2 leading-relaxed">
Yes. We use industry-standard encryption, secure servers, and strict access controls to protect your information. Cryptex never stores private keys, seed phrases, or sensitive wallet credentials.
</p>


<h2 className="mt-4">
                        4. Does Cryptex store my cryptocurrency?
</h2>
<p className="text-gray-600 mt-2 leading-relaxed">
No. Cryptex is a non-custodial platform. Your funds remain in your own wallets or exchanges.
</p>


<h2 className="mt-4">
                        5. How do I connect my wallet?</h2>
<p className="text-gray-600 mt-2 leading-relaxed">
You can connect your wallet using supported providers such as MetaMask, WalletConnect, or other popular options. Simply click the Connect Wallet button on the platform and follow the on-screen instructions.
</p>


<h2 className="mt-4">
                        6. What should I do if my wallet isn’t connecting?
</h2>
<p className="text-gray-600 mt-2 leading-relaxed">
Try these steps:
</p>
<p className="text-gray-600 mt-2 leading-relaxed">
<li>Refresh the page</li>
<li>Ensure your wallet extension/app is updated</li>
<li>Switch networks if needed</li>
<li>Clear browser cache</li>
</p>
<p className="text-gray-600 mt-2 leading-relaxed">
If the issue continues, contact support at support@cryptex.com  (mailto:support@cryptex.com).

</p>




<h2 className="mt-4">
                       7. Does Cryptex charge any fees?</h2>
<p className="text-gray-600 mt-2 leading-relaxed">
Cryptex does not charge hidden fees. Any network or gas fees depend on the blockchain you are interacting with and are outside our control.
</p>


<h2 className="mt-4">
                        8. Can I trade cryptocurrencies directly on Cryptex?</h2>
<p className="text-gray-600 mt-2 leading-relaxed">
Not at the moment. Cryptex focuses on portfolio tracking, analysis, and tools. You can track assets purchased from different exchanges.

</p>


<h2 className="mt-4">
                        9. Do you offer financial or investment advice?</h2>
<p className="text-gray-600 mt-2 leading-relaxed">
No. Cryptex does not offer financial, legal, or investment advice. All crypto decisions are your responsibility.
</p>


<h2 className="mt-4">
                        10. What should I do if I find a bug or issue?</h2>
<p className="text-gray-600 mt-2 leading-relaxed">
We appreciate bug reports. You can email us at support@cryptex.com  (mailto:support@cryptex.com) with:



</p>
<p className="text-gray-600 mt-2 leading-relaxed">
<li>Description of the issue
</li>
<li>Device/browser used</li>
<li>Screenshots or video (optional)</li>
</p>


<h2 className="mt-4">
                        11. How do I delete my Cryptex account?
</h2>
<p className="text-gray-600 mt-2 leading-relaxed">
You can request account deletion by contacting us at **[support@cryptex.com](mailto:support@cryptex.com)**. Your data will be deleted according to our Privacy Policy.
</p>


<h2 className="mt-4">
                        12. Does Cryptex support all cryptocurrencies?</h2>
<p className="text-gray-600 mt-2 leading-relaxed">
Cryptex supports most major cryptocurrencies and networks. Support expands regularly based on user demand.
</p>


<h2 className="mt-4">
                        13. How do I stay updated on new Cryptex features?</h2>
<p className="text-gray-600 mt-2 leading-relaxed">
Follow our announcements on the platform or subscribe to email updates during registration.
</p>


<h2 className="mt-4">
                        14. How do I contact customer support?</h2>
<p className="text-gray-600 mt-2 leading-relaxed">
You can reach us anytime at:
<ul><li>
    support@cryptex.com  (mailto:support@cryptex.com)</li></ul>
</p>


                       
                    
            </div>
            </div>






            <Navbar />
            <Footer />
        </div>
    );
}