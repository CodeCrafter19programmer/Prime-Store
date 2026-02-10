'use client';

import { motion } from 'framer-motion';

export default function FAQ() {
    const faqs = [
        {
            q: "How do I track my order?",
            a: "Once your order has shipped, you will receive an email containing your tracking number. You can also track your order from your account dashboard."
        },
        {
            q: "What is your return policy?",
            a: "We accept returns within 30 days of the purchase date. Items must be unworn, unwashed, and with all original tags attached. Final sale items cannot be returned."
        },
        {
            q: "Do you ship internationally?",
            a: "Yes, we ship to over 50 countries worldwide. International shipping rates and delivery times vary by location."
        },
        {
            q: "Can I change or cancel my order?",
            a: "We sort and process orders immediately. Once an order has been placed, we are unable to make any changes. If you need to cancel, please contact us within 1 hour of placing your order."
        },
        {
            q: "How do I find my size?",
            a: "Please refer to our Size Guide located on each product page. If you are still unsure, feel free to contact our support team for personal advice."
        },
    ];

    return (
        <div className="pt-32 pb-20 px-4 min-h-screen">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold uppercase tracking-tight mb-4 text-center">Frequently Asked Questions</h1>
                <p className="text-gray-500 text-center mb-16">Everything you need to know about Prime Store.</p>

                <div className="space-y-6">
                    {faqs.map((faq, i) => (
                        <details key={i} className="group border-b border-gray-100 dark:border-gray-800 pb-6 cursor-pointer">
                            <summary className="flex justify-between items-center font-bold text-lg list-none select-none hover:text-gray-600 transition-colors">
                                {faq.q}
                                <span className="transition-transform group-open:rotate-180">+</span>
                            </summary>
                            {/* Using simple div here to avoid hydration issues with AnimatePresence inside details/summary for now unless needed */}
                            <div className="mt-4 text-gray-500 leading-relaxed overflow-hidden">
                                {faq.a}
                            </div>
                        </details>
                    ))}
                </div>

                <div className="mt-16 bg-gray-50 dark:bg-gray-900 p-8 text-center rounded-sm">
                    <h3 className="font-bold text-xl mb-4">Still have questions?</h3>
                    <p className="text-gray-500 mb-6">Can't find the answer you're looking for? Please chat to our friendly team.</p>
                    <a href="/contact" className="inline-block bg-black dark:bg-white text-white dark:text-black px-8 py-3 font-bold uppercase tracking-wider hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors">
                        Contact Support
                    </a>
                </div>
            </div>
        </div>
    )
}
