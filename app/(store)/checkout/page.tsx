'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, MapPin, Phone } from 'lucide-react'; // Removed CreditCard, etc.
import { useCart } from '@/context/CartContext';

export default function Checkout() {
    const router = useRouter();
    const { items: cartItems, subtotal: cartTotal } = useCart();
    // Form State
    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        phone: ''
    });

    // Valid Google Maps Embed URL (using a query)
    // Note: In production, you should use a real API Key. This is a simple query embed.
    const [mapUrl, setMapUrl] = useState('https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15955.200947233292!2d32.582520!3d0.347596!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2suk!4v1625686000000!5m2!1sen!2suk');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Update map when address/city changes (Debounced ideally, but simple here)
    useEffect(() => {
        if (formData.address && formData.city) {
            // Simple approach to update map query - normally requires API key for Embed API v2
            // We'll keep the static map for now as dynamic search embeds require an API key restriction usually.
            // Or use a direct search link button.
        }
    }, [formData.address, formData.city]);

    const handleWhatsAppOrder = (e: React.FormEvent) => {
        e.preventDefault();

        // Construct Message
        let message = `*New Order Request*\n\n`;
        message += `*Customer Details:*\n`;
        message += `Name: ${formData.firstName} ${formData.lastName}\n`;
        message += `Phone: ${formData.phone}\n`;
        message += `Email: ${formData.email}\n`;
        message += `Address: ${formData.address}, ${formData.city}\n\n`;

        message += `*Order Summary:*\n`;
        cartItems.forEach(item => {
            message += `- ${item.name} (${item.size || 'N/A'}) x${item.quantity} - $${item.price * item.quantity}\n`;
        });

        message += `\n*Total: $${cartTotal.toFixed(2)}*\n`;
        message += `--------------------------------\n`;
        message += `Please confirm shipping availability and payment methods.`;

        const phoneNumber = '256700000000'; // Replace with actual WhatsApp number
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');

        // Optional: Redirect to success or clear cart
        // clearCart();
        // router.push('/checkout/success');

        // For now, just keep them here or maybe show a success modal.
    };

    return (
        <div className="pt-32 pb-20 px-4 min-h-screen bg-gray-50 dark:bg-black/20">
            <div className="max-w-7xl mx-auto">
                {/* Breadcrumb */}
                <div className="flex items-center text-sm text-gray-500 mb-8">
                    <Link href="/cart" className="hover:text-black dark:hover:text-white transition-colors">Cart</Link>
                    <ChevronRight size={14} className="mx-2" />
                    <span className="font-medium text-black dark:text-white">Checkout</span>
                </div>

                <div className="flex flex-col lg:flex-row gap-12">

                    {/* Left Column: Details & Map */}
                    <div className="flex-1 space-y-8">
                        <section className="bg-white dark:bg-black p-8 rounded-sm border border-gray-100 dark:border-gray-800">
                            <div className="flex items-center justify-between mb-6">
                                <h1 className="text-2xl font-bold uppercase tracking-tight">Delivery Details</h1>
                                <span className="text-xs font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full uppercase">Pay on Delivery / WhatsApp</span>
                            </div>

                            <form id="whatsapp-form" onSubmit={handleWhatsAppOrder} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="col-span-full">
                                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Email Address</label>
                                    <input required name="email" type="email" value={formData.email} onChange={handleInputChange} className="w-full bg-transparent border border-gray-200 dark:border-gray-800 p-3 rounded-sm outline-none focus:border-green-500 transition-colors" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">First Name</label>
                                    <input required name="firstName" type="text" value={formData.firstName} onChange={handleInputChange} className="w-full bg-transparent border border-gray-200 dark:border-gray-800 p-3 rounded-sm outline-none focus:border-green-500 transition-colors" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Last Name</label>
                                    <input required name="lastName" type="text" value={formData.lastName} onChange={handleInputChange} className="w-full bg-transparent border border-gray-200 dark:border-gray-800 p-3 rounded-sm outline-none focus:border-green-500 transition-colors" />
                                </div>
                                <div className="col-span-full">
                                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Address / Location</label>
                                    <input required name="address" type="text" value={formData.address} onChange={handleInputChange} className="w-full bg-transparent border border-gray-200 dark:border-gray-800 p-3 rounded-sm outline-none focus:border-green-500 transition-colors" placeholder="e.g. Plot 12, Kampala Road" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">City</label>
                                    <input required name="city" type="text" value={formData.city} onChange={handleInputChange} className="w-full bg-transparent border border-gray-200 dark:border-gray-800 p-3 rounded-sm outline-none focus:border-green-500 transition-colors" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Phone (WhatsApp)</label>
                                    <input required name="phone" type="tel" value={formData.phone} onChange={handleInputChange} className="w-full bg-transparent border border-gray-200 dark:border-gray-800 p-3 rounded-sm outline-none focus:border-green-500 transition-colors" />
                                </div>
                            </form>
                        </section>

                        {/* Google Maps Embed Placeholder */}
                        <section className="bg-white dark:bg-black p-2 rounded-sm border border-gray-100 dark:border-gray-800 h-64 relative overflow-hidden group">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15955.200947233292!2d32.582520!3d0.347596!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2suk!4v1625686000000!5m2!1sen!2suk"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                className="grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                            ></iframe>
                            <div className="absolute top-4 left-4 bg-white dark:bg-black px-3 py-1 text-xs font-bold shadow-md rounded-full flex items-center gap-2">
                                <MapPin size={12} className="text-red-500" /> Confirm Location on Map
                            </div>
                        </section>

                        {/* Commented Out Payment Section as requested
                        <section className="opacity-50 pointer-events-none filter blur-[1px]">
                            <h2 className="text-xl font-bold uppercase tracking-wide mb-6">Payment (Coming Soon)</h2>
                             ...
                        </section>
                        */}
                    </div>

                    {/* Right Column: Order Summary */}
                    <div className="flex-1 lg:max-w-md">
                        <div className="bg-white dark:bg-black border border-gray-100 dark:border-gray-800 p-6 md:p-8 sticky top-32 rounded-sm shadow-xl shadow-green-900/5">
                            <h2 className="text-xl font-bold uppercase tracking-wide mb-6">Order Summary</h2>

                            <div className="space-y-4 mb-8 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                                {cartItems.map((item) => (
                                    <div key={`${item.id}-${item.size}`} className="flex gap-4">
                                        <div className="relative w-16 h-20 bg-gray-100 dark:bg-gray-800 rounded-sm overflow-hidden flex-shrink-0">
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                className="object-cover"
                                            />
                                            <span className="absolute top-0 right-0 bg-black text-white text-[10px] h-5 w-5 flex items-center justify-center rounded-bl-md font-bold">{item.quantity}</span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-bold truncate">{item.name}</p>
                                            <p className="text-xs text-gray-500">{item.size} / {item.color || 'Standard'}</p>
                                        </div>
                                        <p className="text-sm font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                ))}
                                {cartItems.length === 0 && (
                                    <p className="text-sm text-gray-500 italic">Your cart is empty.</p>
                                )}
                            </div>

                            <div className="border-t border-b border-gray-100 dark:border-gray-800 py-6 mb-6 space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Subtotal</span>
                                    <span className="font-medium">${cartTotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Shipping</span>
                                    <span className="font-medium text-green-600">Calculated on WhatsApp</span>
                                </div>
                            </div>

                            <div className="flex justify-between text-lg font-bold mb-8">
                                <span>Total</span>
                                <span>${cartTotal.toFixed(2)}</span>
                            </div>

                            <button
                                form="whatsapp-form"
                                type="submit"
                                disabled={cartItems.length === 0}
                                className="w-full bg-[#25D366] text-white py-4 font-bold uppercase tracking-widest hover:bg-[#128C7E] transition-colors flex items-center justify-center gap-3 shadow-lg shadow-green-500/20 rounded-sm disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Phone size={20} /> Order via WhatsApp
                            </button>
                            <p className="text-[10px] text-gray-400 text-center mt-4">
                                You will be redirected to WhatsApp to complete your order details with our team.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
