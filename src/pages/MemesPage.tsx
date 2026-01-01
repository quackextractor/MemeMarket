import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMemes, Meme } from '../hooks/useMemes';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';
import { MemeCard } from '../components/MemeCard';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Skeleton } from '../components/ui/skeleton';
import { Loader2, Search } from 'lucide-react';

const CATEGORIES = ["All", "animals", "celebrities", "gaming", "school", "random"];
const SORT_OPTIONS = [
    { label: "Name (A-Z)", value: "name-asc" },
    { label: "Rating (High-Low)", value: "rating-desc" },
    { label: "Price (Low-High)", value: "price-asc" },
];

export function MemesPage() {
    const { memes, loading, error } = useMemes();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [sortBy, setSortBy] = useState('name-asc');

    const navigate = useNavigate();

    // Infinite Scroll State
    const [page, setPage] = useState(1);
    const ITEMS_PER_PAGE = 12;
    const observerTarget = useRef<HTMLDivElement>(null);

    // Filter and Sort
    const filteredMemes = useMemo(() => {
        let result = [...memes];

        if (searchQuery) {
            result = result.filter(m => m.name.toLowerCase().includes(searchQuery.toLowerCase()));
        }

        if (selectedCategory !== 'All') {
            result = result.filter(m => m.category === selectedCategory);
        }

        result.sort((a, b) => {
            switch (sortBy) {
                case 'name-asc': return a.name.localeCompare(b.name);
                case 'rating-desc': return b.rating - a.rating;
                case 'price-asc': return a.price - b.price;
                default: return 0;
            }
        });

        return result;
    }, [memes, searchQuery, selectedCategory, sortBy]);

    // Pagination
    const visibleMemes = useMemo(() => {
        return filteredMemes.slice(0, page * ITEMS_PER_PAGE);
    }, [filteredMemes, page]);

    // Infinite Scroll Observer
    const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
        const [target] = entries;
        if (target.isIntersecting && visibleMemes.length < filteredMemes.length) {
            setPage((prev) => prev + 1);
        }
    }, [visibleMemes.length, filteredMemes.length]);

    useEffect(() => {
        const observer = new IntersectionObserver(handleObserver, {
            root: null,
            rootMargin: "20px",
            threshold: 0
        });

        if (observerTarget.current) {
            observer.observe(observerTarget.current);
        }

        return () => observer.disconnect();
    }, [handleObserver]);

    // Reset page when filters change
    useEffect(() => {
        setPage(1);
    }, [searchQuery, selectedCategory, sortBy]);

    if (error) {
        return <div className="text-center text-red-500 p-8">Error loading memes: {error.message}</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <h1 className="text-3xl font-bold text-center md:text-left bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
                    Meme Gallery
                </h1>
                <div className="flex gap-2">
                    <Button onClick={() => navigate('/cart')} variant="outline">
                        Cart ({useCart().itemCount})
                    </Button>
                    <Button onClick={() => navigate('/dashboard')} variant="outline">
                        Dashboard
                    </Button>
                    <Button variant="destructive" onClick={useAuth().logout}>
                        Logout
                    </Button>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-8 justify-between items-center bg-card p-4 rounded-lg shadow-sm border">
                <div className="relative w-full md:w-1/3">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search memes..."
                        className="pl-8"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
                    {CATEGORIES.map(cat => (
                        <Button
                            key={cat}
                            variant={selectedCategory === cat ? "default" : "outline"}
                            onClick={() => setSelectedCategory(cat)}
                            className="whitespace-nowrap"
                        >
                            {cat}
                        </Button>
                    ))}
                </div>

                <select
                    className="border rounded px-3 py-2 bg-background"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                >
                    {SORT_OPTIONS.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                </select>
            </div>

            {/* Grid */}
            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div key={i} className="flex flex-col space-y-3">
                            <Skeleton className="h-[300px] w-full rounded-xl" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-[250px]" />
                                <Skeleton className="h-4 w-[200px]" />
                            </div>
                        </div>
                    ))}
                </div>
            ) : filteredMemes.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">No memes found matching your criteria.</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {visibleMemes.map(meme => (
                        <MemeCard key={meme.id} meme={meme} />
                    ))}
                </div>
            )}

            {/* Infinite Scroll Sensor */}
            <div ref={observerTarget} className="h-10 w-full flex justify-center p-4">
                {visibleMemes.length < filteredMemes.length && (
                    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                )}
            </div>
        </div>
    );
}
