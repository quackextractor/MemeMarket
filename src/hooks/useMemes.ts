import { useState, useEffect } from 'react';
import { useFetch } from './useFetch';

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
    price: number; // Derived from rating * 25 as per assignment
}

interface ImgflipResponse {
    success: boolean;
    data: {
        memes: Omit<Meme, 'rating' | 'category' | 'price'>[];
    };
}

const CATEGORIES = ["animals", "celebrities", "gaming", "school", "random"];

export function useMemes() {
    const { data: rawData, loading, error } = useFetch<ImgflipResponse>('https://api.imgflip.com/get_memes');
    const [memes, setMemes] = useState<Meme[]>([]);

    useEffect(() => {
        if (rawData && rawData.success) {
            const storedMetadata = JSON.parse(localStorage.getItem('memeMetadata') || '{}');
            let hasNewMetadata = false;

            const processedMemes = rawData.data.memes.map((meme) => {
                let metadata = storedMetadata[meme.id];

                if (!metadata) {
                    // Generate new random data if not exists
                    metadata = {
                        rating: Math.floor(Math.random() * 5) + 1,
                        category: CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)],
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

    return { memes, loading, error };
}
