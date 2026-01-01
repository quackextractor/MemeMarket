import { useNavigate } from 'react-router-dom';
import { Meme } from '../hooks/useMemes';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Heart, ShoppingCart } from 'lucide-react';

interface MemeCardProps {
    meme: Meme;
}

export function MemeCard({ meme }: MemeCardProps) {
    const navigate = useNavigate();
    const handleAddToCart = () => {
        // TODO: Implement cart functionality
        console.log('Added to cart:', meme.name);
    };

    return (
        <Card className="flex flex-col h-full overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="p-4">
                <CardTitle className="text-lg truncate" title={meme.name}>
                    {meme.name}
                </CardTitle>
                <div className="text-xs text-muted-foreground capitalize">
                    {meme.category} • ⭐ {meme.rating}
                </div>
            </CardHeader>
            <CardContent className="p-0 flex-grow relative group">
                <img
                    src={meme.url}
                    alt={meme.name}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                />
                <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                    ${meme.price}
                </div>
            </CardContent>
            <CardFooter className="p-4 flex gap-2">
                <Button variant="outline" className="flex-1" onClick={() => navigate(`/memes/${meme.id}`)}>
                    Details
                </Button>
                <Button onClick={handleAddToCart} className="flex-1">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add
                </Button>
            </CardFooter>
        </Card>
    );
}
