export default function Settings() {
    return (
        <div className="max-w-4xl">
            <h1 className="text-3xl font-bold uppercase tracking-tight mb-8">Settings</h1>
            <div className="bg-white dark:bg-black border border-gray-100 dark:border-gray-800 p-8 rounded-sm space-y-8">
                <div>
                    <h3 className="text-lg font-bold mb-4">General Settings</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Store Name</label>
                            <input type="text" defaultValue="Prime Store" className="w-full bg-transparent border border-gray-300 dark:border-gray-700 p-3 outline-none focus:border-black dark:focus:border-white transition-colors" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Support Email</label>
                            <input type="email" defaultValue="support@primestore.com" className="w-full bg-transparent border border-gray-300 dark:border-gray-700 p-3 outline-none focus:border-black dark:focus:border-white transition-colors" />
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-100 dark:border-gray-900 pt-8">
                    <h3 className="text-lg font-bold mb-4">Currency & Region</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Currency</label>
                            <select className="w-full bg-transparent border border-gray-300 dark:border-gray-700 p-3 outline-none focus:border-black dark:focus:border-white transition-colors">
                                <option>USD ($)</option>
                                <option>EUR (€)</option>
                                <option>GBP (£)</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-100 dark:border-gray-900 pt-8">
                    <h3 className="text-lg font-bold mb-4">Payment Gateways</h3>
                    <div className="space-y-4">
                        <label className="flex items-center gap-3 p-4 border border-gray-100 dark:border-gray-800 rounded-sm cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900">
                            <input type="checkbox" defaultChecked className="w-5 h-5 accent-black dark:accent-white" />
                            <div>
                                <span className="font-bold block">Credit Card (Stripe)</span>
                                <span className="text-xs text-gray-500">Enable credit card payments via Stripe</span>
                            </div>
                        </label>
                        <label className="flex items-center gap-3 p-4 border border-gray-100 dark:border-gray-800 rounded-sm cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900">
                            <input type="checkbox" className="w-5 h-5 accent-black dark:accent-white" />
                            <div>
                                <span className="font-bold block">PayPal</span>
                                <span className="text-xs text-gray-500">Enable PayPal payments</span>
                            </div>
                        </label>
                    </div>
                </div>

                <div className="border-t border-gray-100 dark:border-gray-900 pt-8">
                    <h3 className="text-lg font-bold mb-4">Shipping & Delivery</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Standard Shipping Rate</label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                                <input type="number" defaultValue="0.00" className="w-full pl-8 pr-3 py-3 bg-transparent border border-gray-300 dark:border-gray-700 rounded-sm outline-none focus:border-black dark:focus:border-white transition-colors" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Free Shipping Threshold</label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                                <input type="number" defaultValue="100.00" className="w-full pl-8 pr-3 py-3 bg-transparent border border-gray-300 dark:border-gray-700 rounded-sm outline-none focus:border-black dark:focus:border-white transition-colors" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-100 dark:border-gray-900 pt-8">
                    <h3 className="text-lg font-bold mb-4">Store Policies</h3>
                    <div className="space-y-6">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Refund Policy</label>
                            <textarea rows={4} className="w-full p-3 bg-transparent border border-gray-300 dark:border-gray-700 rounded-sm outline-none focus:border-black dark:focus:border-white transition-colors" placeholder="Enter refund policy..."></textarea>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-100 dark:border-gray-900 pt-8 flex justify-end">
                    <button className="bg-black dark:bg-white text-white dark:text-black px-6 py-3 font-bold uppercase tracking-widest hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors">
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    )
}
