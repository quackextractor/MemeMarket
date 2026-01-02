import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Skeleton } from './ui/skeleton';

interface BlurImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src: string;
    alt: string;
}

export function BlurImage({ src, alt, className, ...props }: BlurImageProps) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const img = new Image();
        img.src = src;
        img.onload = () => setIsLoading(false);
    }, [src]);

    return (
        <div className={cn("relative overflow-hidden", className)}>
            {isLoading && (
                <Skeleton className="absolute inset-0 w-full h-full" />
            )}
            <img
                src={src}
                alt={alt}
                className={cn(
                    "transition-all duration-500 ease-in-out w-full h-full object-cover",
                    isLoading ? "opacity-0 scale-105 blur-lg" : "opacity-100 scale-100 blur-0",
                    className
                )}
                {...props}
            />
        </div>
    );
}
