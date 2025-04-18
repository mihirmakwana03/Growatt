import React from "react";

const TermsAndConditions = () => {
    return (
        <div className="container mx-auto px-4 py-10">
            <div className="bg-[#0a0a0a] shadow-lg rounded-lg p-6 md:p-10">
                <h2 className="text-4xl font-bold text-center text-gradient p-12 mb-6">
                    Terms and Conditions
                </h2>
                <p className="text-white leading-relaxed mb-6">
                    Welcome to our graphic design company! These terms and conditions outline the rules
                    and regulations for the use of our services.
                </p>
                <div className="space-y-10">
                    {/* Point 1 */}
                    <div className="flex items-center space-x-4">
                    <div className="bg-blue-500 text-white rounded-full h-12 w-12 flex items-center justify-center text-lg font-bold">
                        1
                    </div>
                    <div>
                        <h5 className="text-2xl font-semibold text-blue-400 mb-2">
                            Acceptance of Terms
                        </h5>
                        <p className="text-white leading-relaxed">
                            By accessing this website, you agree to comply with and be bound by
                            these terms and conditions. If you disagree with any part of these
                            terms, please do not use our website.
                        </p>
                    </div>
                </div>

                {/* Point 2 */}
                <div className="flex items-center space-x-4">
                    <div className="bg-green-500 text-white rounded-full h-12 w-12 flex items-center justify-center text-lg font-bold">
                        2
                    </div>
                    <div>
                        <h5 className="text-2xl font-semibold text-green-400 mb-2">
                            Use of Services
                        </h5>
                        <p className="text-white leading-relaxed">
                            Our graphic design services are provided for creative and professional use only. Any unauthorized reproduction or distribution of our designs is strictly prohibited.
                        </p>
                    </div>
                </div>

                {/* Point 3 */}
                <div className="flex items-center space-x-4">
                    <div className="bg-red-500 text-white rounded-full h-12 w-12 flex items-center justify-center text-lg font-bold">
                        3
                    </div>
                    <div>
                        <h5 className="text-2xl font-semibold text-red-400 mb-2">
                            Intellectual Property
                        </h5>
                        <p className="text-white leading-relaxed">
                            All designs, logos, and creative assets produced by our company remain our intellectual property unless otherwise agreed upon in writing.
                        </p>
                    </div>
                </div>

                {/* Point 4 */}
                <div className="flex items-center space-x-4">
                    <div className="bg-yellow-500 text-white rounded-full h-12 w-12 flex items-center justify-center text-lg font-bold">
                        4
                    </div>
                    <div>
                        <h5 className="text-2xl font-semibold text-yellow-400 mb-2">
                            Modifications
                        </h5>
                        <p className="text-white leading-relaxed">
                            We reserve the right to update or modify these terms at any time
                            without prior notice. Your continued use of the website constitutes
                            your acceptance of any changes.
                        </p>
                    </div>
                </div>

                {/* Point 5 */}
                <div className="flex items-center space-x-4">
                    <div className="bg-purple-500 text-white rounded-full h-12 w-12 flex items-center justify-center text-lg font-bold">
                        5
                    </div>
                    <div>
                        <h5 className="text-2xl font-semibold text-purple-400 mb-2">
                            Contact Us
                        </h5>
                        <p className="text-white leading-relaxed">
                            If you have any questions about these Terms and Conditions, please
                            contact us.
                        </p>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
};

export default TermsAndConditions;
