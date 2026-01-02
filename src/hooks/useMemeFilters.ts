import { useState, useMemo, useEffect } from 'react';
import { Meme } from '../contexts/MemeContext';
import { ITEMS_PER_PAGE } from '../constants';

interface UseMemeFiltersProps {
    memes: Meme[];
}

export function useMemeFilters({ memes }: UseMemeFiltersProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [sortBy, setSortBy] = useState('name-asc');
    const [page, setPage] = useState(1);
    const [debouncedQuery, setDebouncedQuery] = useState('');

    // Debounce Search
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedQuery(searchQuery);
        }, 300);

        return () => clearTimeout(handler);
    }, [searchQuery]);

    // Reset page when filters change
    useEffect(() => {
        setPage(1);
    }, [searchQuery, selectedCategory, sortBy]);

    // Filter and Sort
    const filteredMemes = useMemo(() => {
        let result = [...memes];

        if (debouncedQuery) {
            const lowerQuery = debouncedQuery.toLowerCase();
            result = result.filter(m => m.name.toLowerCase().includes(lowerQuery));
        }

        if (selectedCategory !== 'All') {
            result = result.filter(m => m.category === selectedCategory);
        }

        result.sort((a, b) => {
            switch (sortBy) {
                case 'name-asc': return a.name.localeCompare(b.name);
                case 'rating-desc': return b.rating - a.rating;
                case 'price-asc': return a.price - b.price;
                case 'size-asc': return (a.width * a.height) - (b.width * b.height);
                case 'size-desc': return (b.width * b.height) - (a.width * a.height);
                default: return 0;
            }
        });

        return result;
    }, [memes, debouncedQuery, selectedCategory, sortBy]);

    // Pagination
    const visibleMemes = useMemo(() => {
        return filteredMemes.slice(0, page * ITEMS_PER_PAGE);
    }, [filteredMemes, page]);

    const loadMore = () => setPage(prev => prev + 1);
    const hasMore = visibleMemes.length < filteredMemes.length;

    return {
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        sortBy,
        setSortBy,
        visibleMemes,
        filteredMemesCount: filteredMemes.length,
        loadMore,
        hasMore
    };
}
