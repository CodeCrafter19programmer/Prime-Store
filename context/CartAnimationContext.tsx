'use client';

import { createContext, useContext, useState, useRef, ReactNode, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CartAnimationContextType {
    startAnimation: (rect: DOMRect, image: string) => void;
}

const CartAnimationContext = createContext<CartAnimationContextType | undefined>(undefined);

export function CartAnimationProvider({ children }: { children: ReactNode }) {
    const [animation, setAnimation] = useState<{ rect: DOMRect; image: string; id: number } | null>(null);
    const [cartRect, setCartRect] = useState<DOMRect | null>(null);

    // Update cart rect on resize/scroll or periodically
    useEffect(() => {
        const updateCartRect = () => {
            const el = document.getElementById('cart-icon-container');
            if (el) {
                setCartRect(el.getBoundingClientRect());
            }
        };

        updateCartRect();
        window.addEventListener('resize', updateCartRect);
        window.addEventListener('scroll', updateCartRect);

        return () => {
            window.removeEventListener('resize', updateCartRect);
            window.removeEventListener('scroll', updateCartRect);
        };
    }, []);

    const startAnimation = (rect: DOMRect, image: string) => {
        const el = document.getElementById('cart-icon-container');
        if (el) setCartRect(el.getBoundingClientRect()); // Refresh to be safe

        setAnimation({ rect, image, id: Date.now() });
    };

    return (
        <CartAnimationContext.Provider value={{ startAnimation }}>
            {children}
            <AnimatePresence>
                {animation && cartRect && (
                    <FlyingItem
                        key={animation.id}
                        startRect={animation.rect}
                        endRect={cartRect}
                        image={animation.image}
                        onComplete={() => setAnimation(null)}
                    />
                )}
            </AnimatePresence>
        </CartAnimationContext.Provider>
    );
}

function FlyingItem({ startRect, endRect, image, onComplete }: { startRect: DOMRect; endRect: DOMRect; image: string; onComplete: () => void }) {
    return (
        <motion.img
            src={image}
            initial={{
                position: 'fixed',
                top: startRect.top,
                left: startRect.left,
                width: startRect.width,
                height: startRect.height,
                opacity: 1,
                zIndex: 9999,
                pointerEvents: 'none',
                borderRadius: '8px' // Assuming rounded corners on products
            }}
            animate={{
                top: endRect.top + (endRect.height / 2) - 10, // Center to icon
                left: endRect.left + (endRect.width / 2) - 10,
                width: 20,
                height: 20,
                opacity: 0.5,
                scale: 0.2
            }}
            transition={{ duration: 0.8, ease: "easeInOut" }} // Slower, clear movement
            onAnimationComplete={onComplete}
            style={{ objectFit: 'cover' }}
        />
    );
}

export function useCartAnimation() {
    const context = useContext(CartAnimationContext);
    if (context === undefined) {
        throw new Error('useCartAnimation must be used within a CartAnimationProvider');
    }
    return context;
}
