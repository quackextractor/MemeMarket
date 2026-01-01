import { useState, useEffect } from 'react';

interface FetchState<T> {
    data: T | null;
    loading: boolean;
    error: Error | null;
}

export function useFetch<T>(url: string): FetchState<T> {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        let isMounted = true;
        setLoading(true);

        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Error fetching data: ${response.statusText}`);
                }
                return response.json();
            })
            .then((data) => {
                if (isMounted) {
                    setData(data);
                    setError(null);
                }
            })
            .catch((err) => {
                if (isMounted) {
                    setError(err);
                }
            })
            .finally(() => {
                if (isMounted) {
                    setLoading(false);
                }
            });

        return () => {
            isMounted = false;
        };
    }, [url]);

    return { data, loading, error };
}
