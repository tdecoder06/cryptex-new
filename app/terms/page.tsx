import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

export default function TermsPage() {
    return (
        <div className="w-full py-20 bg-white text-left">

            {/* Section 1 */}
            <div className="max-w-4xl mx-auto mb-20 ">
                <h1 className="text-4xl md:text-5xl font-bold text-[#0A1238] mb-8 ">
                    Cryptex&apos;s Terms of Service
                </h1>
                <p className="text-gray-600 mt-2 leading-relaxed">
                    Welcome to Cryptex. By accessing or using our website, platform, or any services we provide (collectively, the {"Services"}), you agree to comply with and be bound by these Terms and Conditions ({"Terms"}). Please read them carefully.
                </p>

                <div className="max-w-4xl mx-auto mb-20 mt-4 ">
                    
                    <h2>1. Acceptance of Terms
                    </h2>
                    <p className="text-gray-600 mt-2 leading-relaxed">
                        By accessing or using Cryptex, you acknowledge that you have read, understood, and agree to be bound by these Terms. If you do not agree, you must stop using the Services immediately.

                    </p>

                    <h2 className="mt-4">2. Eligibility

                    </h2>
                    <p className="text-gray-600 mt-2 leading-relaxed">
                        You must be at least 18 years old or the age of legal majority in your jurisdiction to use Cryptex. By using the Services, you confirm that you meet this requirement.


                    </p>

                    <h2 className="mt-4">
                        3. Crypto Disclaimer
                    </h2>
                    <p className="text-gray-600 mt-2 leading-relaxed">
                        Cryptex provides tools, information, and features related to cryptocurrency trading, analysis, or portfolio management. We do not provide financial, investment, or legal advice.
                        Cryptocurrencies are highly volatile, and you acknowledge that:
                        You use Cryptex at your own risk.
                        You are solely responsible for your investment decisions.
                        Cryptex is not responsible for profits, losses, or damages arising from your use of cryptocurrency markets.
                    </p>
                    <h2 className="mt-4">4. User Accounts</h2>
                    <p className="text-gray-600 mt-2 leading-relaxed">
To access certain features, you may be required to create an account. You agree to:
Provide accurate and complete information.
Maintain confidentiality of your login credentials.
Take responsibility for all activities under your account.
Cryptex reserves the right to suspend or terminate accounts that violate these Terms.</p>
                        <h2 className="mt-4"></h2>
                        <p className="text-gray-600 mt-2 leading-relaxed"></p>
                        <h2 className="mt-4"> 5. Prohibited Activities</h2>
                        <p className="text-gray-600 mt-2 leading-relaxed">You agree NOT to:
Use Cryptex for illegal or fraudulent purposes.
Interfere with platform security or functionality.
Upload malicious code, bots, or attempt unauthorized access.
Use the platform to launder money or fund illegal activities.
Any violation may result in account termination and legal action.
                        </p>
                        <h2 className="mt-4">6. Platform Availability</h2>
                        <p className="text-gray-600 mt-2 leading-relaxed">
Cryptex strives to maintain continuous platform availability, but we do not guarantee:
Uninterrupted access
Error-free performance
Protection from system failures or cyber-attacks
We are not liable for losses caused by downtime, maintenance, or technical issues.
                        </p>
                    <h2 className="mt-4">   7. Third-Party Services </h2>
                        <p className="text-gray-600 mt-2 leading-relaxed">
Cryptex may integrate or link to third-party services such as exchanges, wallets, or analytics tools. We are not responsible for:

Content or actions of third-party platforms

Security or availability of external services

You use third-party integrations at your own risk.
                        </p>
                    
                    <h2 className="mt-4">8. Intellectual Property  </h2>
                        <p className="text-gray-600 mt-2 leading-relaxed">
All content on Cryptex—including text, code, logos, trademarks, graphics, and features—is owned by Cryptex. You may not:

Copy

Modify

Redistribute

Reproduce any part of the platform without prior written permission.
                        </p>
                       

                       <h2 className="mt-4"> 9. Limitation of Liability </h2>
                        <p className="text-gray-600 mt-2 leading-relaxed">
To the maximum extent permitted by law:

Cryptex is not liable for indirect, incidental, or consequential damages.

We are not responsible for losses related to cryptocurrency volatility.

Use of the platform is entirely at your own risk.
                        </p>


                        <h2 className="mt-4">10. Privacy Policy  </h2>
                        <p className="text-gray-600 mt-2 leading-relaxed">
By using Cryptex, you consent to the data practices outlined in our Privacy Policy. We may collect certain user information to improve our services.
                        </p>

                        <h2 className="mt-4"> 11. Termination </h2>
                        <p className="text-gray-600 mt-2 leading-relaxed">
Cryptex may suspend or terminate access to the Services at any time for:

Violations of these Terms

Suspicious or illegal activity

Platform misuse

Upon termination, your right to use the Services ends immediately.
                        </p>

                        <h2 className="mt-4">  12. Changes to Terms</h2>
                        <p className="text-gray-600 mt-2 leading-relaxed">
Cryptex may update these Terms at any time. Continued use of the platform after changes indicates acceptance of the updated Terms.
                        </p>

                        <h2 className="mt-4">  13. Governing Law</h2>
                        <p className="text-gray-600 mt-2 leading-relaxed">
These Terms are governed by the laws of your jurisdiction unless otherwise specified. Any disputes will be resolved in accordance with applicable legal procedures.
                        </p>

                        
                        <h2 className="mt-4">14. Contact Information </h2>
                        <p className="text-gray-600 mt-2 leading-relaxed">
For questions or support, you may contact us at:<a href="#">support@cryptex.com</a> 


                        </p>

                        <h2 className="mt-8">By using Cryptex, you acknowledge that you have read and agree to these Terms and Conditions. </h2>








                </div>







            </div>






            <Navbar />
            <Footer />
        </div>
    );
}
