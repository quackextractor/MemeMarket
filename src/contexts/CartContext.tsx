import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface CartItem {
    id: string;
    name: string;
    url: string;
    price: number;
}

interface CartContextType {
    cartItems: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (itemId: string) => void;
    clearCart: () => void;
    cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const addToCart = (item: CartItem) => {
        setCartItems((prev) => [...prev, item]);
    };

    const removeFromCart = (itemId: string) => {
        setCartItems((prev) => prev.filter((item) => item.id !== itemId));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                clearCart,
                cartCount: cartItems.length,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
