import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Meme } from '../hooks/useMemes';
import { useCart } from '../hooks/useCart';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { ShoppingCart } from 'lucide-react';


import { BlurImage } from './BlurImage';

interface MemeCardProps {
    meme: Meme;
}

export function MemeCard({ meme }: MemeCardProps) {
    const navigate = useNavigate();
    const [isAdded, setIsAdded] = useState(false);
    const { addItem } = useCart();

    const handleAddToCart = (e: React.MouseEvent) => {
        e.stopPropagation();
        addItem(meme);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    return (
        <div className="h-full">
            <Card className="flex flex-col h-full overflow-hidden">
                <CardHeader className="p-4">
                    <CardTitle className="text-lg truncate" title={meme.name}>
                        {meme.name}
                    </CardTitle>
                    <div className="text-xs text-muted-foreground capitalize">
                        {meme.category} • ⭐ {meme.rating}
                    </div>
                </CardHeader>
                <CardContent className="p-0 flex-grow relative">
                    <BlurImage
                        src={meme.url}
                        alt={meme.name}
                        className="w-full h-64"
                    />
                    <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                        ${meme.price}
                    </div>
                </CardContent>
                <CardFooter className="p-4 flex gap-2">
                    <Button variant="outline" className="flex-1" onClick={() => navigate(`/memes/${meme.id}`)}>
                        Details
                    </Button>
                    <Button
                        onClick={handleAddToCart}
                        className={`flex-1 ${isAdded ? 'bg-green-700 hover:bg-green-800 text-white disabled:opacity-100' : ''}`}
                        disabled={isAdded}
                        aria-label={isAdded ? "Added to cart" : `Add ${meme.name} to cart`}
                    >
                        {isAdded ? (
                            <>Added!</>
                        ) : (
                            <>
                                <ShoppingCart className="w-4 h-4 mr-2" aria-hidden="true" />
                                Add
                            </>
                        )}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
