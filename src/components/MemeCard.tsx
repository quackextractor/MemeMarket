import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Meme } from '../hooks/useMemes';
import { useCart } from '../hooks/useCart';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Heart, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';

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
        <motion.div whileHover={{ scale: 1.02 }} className="h-full">
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
                    <Button
                        onClick={handleAddToCart}
                        className={`flex-1 ${isAdded ? 'bg-green-600 hover:bg-green-700' : ''}`}
                        disabled={isAdded}
                    >
                        {isAdded ? (
                            <>Added!</>
                        ) : (
                            <>
                                <ShoppingCart className="w-4 h-4 mr-2" />
                                Add
                            </>
                        )}
                    </Button>
                </CardFooter>
            </Card>
        </motion.div>
    );
}
