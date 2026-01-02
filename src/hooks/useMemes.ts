import { useMemeContext, Meme } from '../contexts/MemeContext';

export type { Meme };

export function useMemes() {
    return useMemeContext();
}
