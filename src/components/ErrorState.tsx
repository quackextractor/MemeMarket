import { Button } from './ui/button';
import { AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ErrorStateProps {
    message?: string;
    onRetry?: () => void;
    showHomeButton?: boolean;
}

export function ErrorState({ message = "Something went wrong", onRetry, showHomeButton = false }: ErrorStateProps) {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center p-8 text-center bg-red-50 border border-red-200 rounded-lg">
            <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
            <h3 className="text-lg font-semibold text-red-700 mb-2">Error</h3>
            <p className="text-red-600 mb-4">{message}</p>
            <div className="flex gap-2">
                {onRetry && (
                    <Button variant="outline" onClick={onRetry} className="border-red-200 text-red-700 hover:bg-red-100">
                        Try Again
                    </Button>
                )}
                {showHomeButton && (
                    <Button variant="default" onClick={() => navigate('/dashboard')}>
                        Go to Dashboard
                    </Button>
                )}
            </div>
        </div>
    );
}
