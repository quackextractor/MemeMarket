import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMemes } from '../hooks/useMemes';
import { Button } from '../components/ui/button';
import { MemeCard } from '../components/MemeCard';
import { useCart } from '../hooks/useCart';
import { Skeleton } from '../components/ui/skeleton';
import { ArrowLeft, ShoppingCart, Star } from 'lucide-react';
import { ModeToggle } from '@/components/ModeToggle';

export default function MemeDetailPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { memes, loading: memesLoading, error } = useMemes();
    const [relatedMemes, setRelatedMemes] = useState<typeof memes>([]);
    const { addItem } = useCart();
    const [isAdded, setIsAdded] = useState(false);

    // Find the current meme
    // Note: In a real app with backend, we would fetch by ID. 
    // Here we rely on the list having all items or refetching the list.
    const meme = memes.find(m => m.id === id);

    useEffect(() => {
        if (meme) {
            // Find related memes (same category, excluding current)
            const related = memes
                .filter(m => m.category === meme.category && m.id !== meme.id)
                .sort(() => 0.5 - Math.random()) // Randomize
                .slice(0, 3);
            setRelatedMemes(related);
        }
    }, [meme, memes]);

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8 text-center">
                <p className="text-red-500 mb-4">Error loading meme: {error.message}</p>
                <Button onClick={() => navigate('/memes')}>Back to Gallery</Button>
            </div>
        );
    }

    if (memesLoading || !meme) {
        return (
            <div className="container mx-auto px-4 py-8">
                <Button variant="ghost" className="mb-6" disabled>
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Gallery
                </Button>
                <div className="grid md:grid-cols-2 gap-8">
                    <Skeleton className="h-[400px] w-full rounded-xl" />
                    <div className="space-y-4">
                        <Skeleton className="h-10 w-3/4" />
                        <Skeleton className="h-6 w-1/2" />
                        <Skeleton className="h-24 w-full" />
                    </div>
                </div>
            </div>
        );
    }

    const handleAddToCart = () => {
        addItem(meme);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <Button
                    variant="ghost"
                    onClick={() => navigate('/memes')}
                >
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Gallery
                </Button>
                <Button
                    variant="outline"
                    onClick={() => navigate('/cart')}
                >
                    <ShoppingCart className="mr-2 h-4 w-4" /> Go to Cart
                </Button>
                <div className="ml-2">
                    <ModeToggle />
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
                {/* Image Section */}
                <div className="flex justify-center bg-muted/50">
                    <img
                        src={meme.url}
                        alt={meme.name}
                        className="max-h-[600px] w-auto object-contain"
                    />
                </div>

                {/* Details Section */}
                <div className="space-y-6">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">
                            {meme.name}
                        </h1>
                        <div className="flex items-center gap-4 text-muted-foreground">
                            <span className="capitalize px-3 py-1 bg-secondary rounded-full text-sm font-medium">
                                {meme.category}
                            </span>
                            <div className="flex items-center text-yellow-500 font-bold">
                                <Star className="w-4 h-4 mr-1 fill-current" />
                                {meme.rating}
                            </div>
                            <span className="text-sm">
                                {meme.width} x {meme.height} px
                            </span>
                        </div>
                    </div>

                    <div className="text-2xl font-bold">
                        ${meme.price}
                    </div>

                    <div className="flex gap-4">
                        <Button
                            size="lg"
                            className={`w-full md:w-auto ${isAdded ? 'bg-green-600 hover:bg-green-700' : ''}`}
                            onClick={handleAddToCart}
                            disabled={isAdded}
                        >
                            {isAdded ? (
                                <>Added!</>
                            ) : (
                                <>
                                    <ShoppingCart className="mr-2 h-5 w-5" />
                                    Add to Cart
                                </>
                            )}
                        </Button>
                    </div>

                    <div className="p-4 bg-muted/50 rounded-lg">
                        <h3 className="font-semibold mb-2">Meme Details</h3>
                        <dl className="grid grid-cols-2 gap-2 text-sm">
                            <dt className="text-muted-foreground">ID:</dt>
                            <dd className="font-mono">{meme.id}</dd>
                            <dt className="text-muted-foreground">Box Count:</dt>
                            <dd>{meme.box_count}</dd>
                        </dl>
                    </div>
                </div>
            </div>

            {/* Related Memes */}
            {
                relatedMemes.length > 0 && (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold">More {meme.category} Memes</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {relatedMemes.map(related => (
                                <MemeCard key={related.id} meme={related} />
                            ))}
                        </div>
                    </div>
                )
            }
        </div >
    );
}
