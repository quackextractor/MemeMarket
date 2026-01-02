import { useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMemes } from '../hooks/useMemes';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';
import { useMemeFilters } from '../hooks/useMemeFilters';
import { MemeCard } from '../components/MemeCard';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Skeleton } from '../components/ui/skeleton';
import { Loader2, Search } from 'lucide-react';
import { ModeToggle } from '@/components/ModeToggle';
import { ErrorState } from '@/components/ErrorState';
import { CATEGORIES, SORT_OPTIONS } from '@/constants';

export function MemesPage() {
    const { memes, loading, error } = useMemes();
    const navigate = useNavigate();
    const {
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        sortBy,
        setSortBy,
        visibleMemes,
        filteredMemesCount,
        loadMore,
        hasMore
    } = useMemeFilters({ memes });

    const observerTarget = useRef<HTMLDivElement>(null);

    // Infinite Scroll Observer
    const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
        const [target] = entries;
        if (target.isIntersecting && hasMore) {
            loadMore();
        }
    }, [hasMore, loadMore]);

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

    if (error) {
        return <ErrorState message={error.message} onRetry={() => window.location.reload()} />;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <h1 className="text-3xl font-bold text-center md:text-left">
                    Memes
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
                    <ModeToggle />
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

                <div className="flex gap-2 flex-wrap w-full md:w-auto pb-2 md:pb-0">
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
            ) : filteredMemesCount === 0 ? (
                <div className="text-center py-12 text-muted-foreground">No memes found matching your criteria.</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {visibleMemes.map((meme) => (
                        <div key={meme.id}>
                            <MemeCard meme={meme} />
                        </div>
                    ))}
                </div>
            )}

            {/* Infinite Scroll Sensor */}
            <div ref={observerTarget} className="h-10 w-full flex justify-center p-4">
                {hasMore && (
                    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                )}
            </div>
        </div>
    );
}
