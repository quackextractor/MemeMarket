import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useCart } from '../hooks/useCart';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Trash2, Plus, Minus, Info } from 'lucide-react';
import { ModeToggle } from '@/components/ModeToggle';

const CartPage = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const { cartItems, removeItem, decreaseCount, addItem, clearCart, getTotalPrice } = useCart();

    const totalPrice = getTotalPrice();

    return (
        <div className="flex min-h-screen items-start justify-center p-8">
            <Card className="w-full max-w-4xl">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-3xl font-bold">Shopping Cart</CardTitle>
                        <div className="flex gap-2">
                            <Button variant="outline" onClick={() => navigate('/dashboard')}>
                                Back to Dashboard
                            </Button>
                            <Button variant="destructive" onClick={logout}>
                                Logout
                            </Button>
                            <ModeToggle />
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        {cartItems.length === 0 ? (
                            <div className="text-center py-10">
                                <p className="text-xl text-muted-foreground mb-4">Your cart is empty.</p>
                                <Button onClick={() => navigate('/memes')}>Browse Memes</Button>
                            </div>
                        ) : (
                            <>
                                <div className="border rounded-md">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead className="w-[100px]">Image</TableHead>
                                                <TableHead>Meme</TableHead>
                                                <TableHead>Price</TableHead>
                                                <TableHead>Quantity</TableHead>
                                                <TableHead className="text-right">Total</TableHead>
                                                <TableHead className="text-right">Actions</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {cartItems.map((item) => (
                                                <TableRow key={item.id}>
                                                    <TableCell>
                                                        <img
                                                            src={item.url}
                                                            alt={item.name}
                                                            className="h-16 w-16 object-cover rounded"
                                                        />
                                                    </TableCell>
                                                    <TableCell className="font-medium">
                                                        {item.name}
                                                        <div className="text-xs text-muted-foreground">Rating: {item.rating}/5</div>
                                                    </TableCell>
                                                    <TableCell>${item.price.toFixed(2)}</TableCell>
                                                    <TableCell>
                                                        <div className="flex items-center gap-2">
                                                            <Button
                                                                variant="outline"
                                                                size="icon"
                                                                className="h-8 w-8"
                                                                onClick={() => decreaseCount(item.id)}
                                                            >
                                                                <Minus className="h-4 w-4" />
                                                            </Button>
                                                            <span className="w-4 text-center">{item.quantity}</span>
                                                            <Button
                                                                variant="outline"
                                                                size="icon"
                                                                className="h-8 w-8"
                                                                onClick={() => addItem(item)}
                                                            >
                                                                <Plus className="h-4 w-4" />
                                                            </Button>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        ${(item.price * item.quantity).toFixed(2)}
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        <div className="flex items-center justify-end gap-2">
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                onClick={() => navigate(`/memes/${item.id}`)}
                                                                title="View Details"
                                                            >
                                                                <Info className="h-4 w-4" />
                                                            </Button>
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                onClick={() => removeItem(item.id)}
                                                                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                            </Button>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>

                                <div className="flex flex-col items-end gap-4">
                                    <div className="text-2xl font-bold">
                                        Total: ${totalPrice.toFixed(2)}
                                    </div>
                                    <div className="flex gap-4">
                                        <Button variant="outline" onClick={clearCart}>
                                            Clear Cart
                                        </Button>
                                        <Button className="px-8">
                                            Checkout
                                        </Button>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default CartPage;
