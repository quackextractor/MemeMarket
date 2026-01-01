import { createContext, ReactNode, useMemo } from 'react';
import { Meme } from '../hooks/useMemes';
import { useLocalStorage } from '../hooks/useLocalStorage';

export interface CartItem extends Meme {
    quantity: number;
}

interface CartContextType {
    cartItems: CartItem[];
    addItem: (meme: Meme) => void;
    removeItem: (id: string) => void;
    decreaseCount: (id: string) => void;
    clearCart: () => void;
    getTotalPrice: () => number;
    itemCount: number;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [cartItems, setCartItems] = useLocalStorage<CartItem[]>('cart', []);

    const addItem = (meme: Meme) => {
        setCartItems(prev => {
            const existingItem = prev.find(item => item.id === meme.id);
            if (existingItem) {
                return prev.map(item =>
                    item.id === meme.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { ...meme, quantity: 1 }];
        });
    };

    const removeItem = (id: string) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
    };

    const decreaseCount = (id: string) => {
        setCartItems(prev => {
            const existingItem = prev.find(item => item.id === id);
            if (existingItem!.quantity > 1) { // We know it exists if we are calling this
                return prev.map(item =>
                    item.id === id
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                );
            } else {
                return prev.filter(item => item.id !== id);
            }
        });
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const itemCount = useMemo(() => cartItems.reduce((count, item) => count + item.quantity, 0), [cartItems]);

    const value = {
        cartItems,
        addItem,
        removeItem,
        decreaseCount,
        clearCart,
        getTotalPrice,
        itemCount
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}
