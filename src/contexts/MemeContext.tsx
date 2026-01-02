import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useFetch } from '../hooks/useFetch';

export interface Meme {
    id: string;
    name: string;
    url: string;
    width: number;
    height: number;
    box_count: number;
    // Augmented fields
    rating: number;
    category: string;
    price: number;
}

interface ImgflipResponse {
    success: boolean;
    data: {
        memes: Omit<Meme, 'rating' | 'category' | 'price'>[];
    };
}

interface MemeContextType {
    memes: Meme[];
    loading: boolean;
    error: Error | null;
}

const MemeContext = createContext<MemeContextType | undefined>(undefined);

const CATEGORY_OPTIONS = ["animals", "celebrities", "gaming", "school", "random"];

export function MemeProvider({ children }: { children: ReactNode }) {
    const { data: rawData, loading, error } = useFetch<ImgflipResponse>('https://api.imgflip.com/get_memes');
    const [memes, setMemes] = useState<Meme[]>([]);

    useEffect(() => {
        if (rawData && rawData.success) {
            const storedMetadata = JSON.parse(localStorage.getItem('memeMetadata') || '{}');
            let hasNewMetadata = false;

            const processedMemes = rawData.data.memes.map((meme) => {
                let metadata = storedMetadata[meme.id];

                if (!metadata) {
                    metadata = {
                        rating: Math.floor(Math.random() * 5) + 1,
                        category: CATEGORY_OPTIONS[Math.floor(Math.random() * CATEGORY_OPTIONS.length)],
                    };
                    storedMetadata[meme.id] = metadata;
                    hasNewMetadata = true;
                }

                return {
                    ...meme,
                    rating: metadata.rating,
                    category: metadata.category,
                    price: metadata.rating * 25,
                };
            });

            if (hasNewMetadata) {
                localStorage.setItem('memeMetadata', JSON.stringify(storedMetadata));
            }

            setMemes(processedMemes);
        }
    }, [rawData]);

    return (
        <MemeContext.Provider value={{ memes, loading, error }}>
            {children}
        </MemeContext.Provider>
    );
}

export function useMemeContext() {
    const context = useContext(MemeContext);
    if (context === undefined) {
        throw new Error('useMemeContext must be used within a MemeProvider');
    }
    return context;
}
