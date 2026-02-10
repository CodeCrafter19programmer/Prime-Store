export default function Shipping() {
    return (
        <div className="pt-32 pb-20 px-4 max-w-3xl mx-auto min-h-screen">
            <h1 className="text-4xl font-bold mb-8 uppercase tracking-tighter">Shipping & Returns</h1>

            <div className="prose dark:prose-invert max-w-none space-y-8">
                <section>
                    <h2 className="text-xl font-bold uppercase tracking-wider mb-4">Shipping Policy</h2>
                    <p className="text-gray-600 dark:text-gray-400">
                        We offer free standard shipping on all orders over $200. Standard shipping typically takes 3-5 business days.
                        Express shipping options are available at checkout for an additional fee.
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 mt-4">
                        Orders placed before 2 PM EST are processed the same business day. Orders placed after 2 PM EST or on weekends/holidays will be processed the next business day.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold uppercase tracking-wider mb-4">Returns & Exchanges</h2>
                    <p className="text-gray-600 dark:text-gray-400">
                        We accept returns within 30 days of purchase. Items must be unworn, unwashed, and in their original condition with tags attached.
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 mt-4">
                        To initiate a return, please visit our <a href="/contact" className="underline hover:text-black dark:hover:text-white">Contact Page</a> or email support@primestore.com with your order number.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold uppercase tracking-wider mb-4">International Shipping</h2>
                    <p className="text-gray-600 dark:text-gray-400">
                        We currently ship to select countries internationally. Customs duties and taxes are calculated at checkout and are the responsibility of the customer.
                    </p>
                </section>
            </div>
        </div>
    )
}
