'use client';
import { useState, useRef, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Plus, Minus, ShoppingCart } from 'lucide-react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import { useBulkUpdateMutation } from '@/api/admin/barCode/bulkUpdate';
import { useMultipleProductData } from './useMultipleProductData';

const ProductList = ({
    initialScannedSkus
}: {
    initialScannedSkus: string[];
}) => {
    // State for all scanned products
    const [scannedProducts, setScannedProducts] = useState<string[]>([]);

    // State for quantities, using SKU as key
    const [quantities, setQuantities] = useState<Record<string, number>>({});

    // Audio ref for check sound
    const audioRef = useRef<HTMLAudioElement | null>(null);
    // Function to play check sound
    const playCheckSound = () => {
        if (audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play().catch((error) => {
                console.error('Error playing sound:', error);
            });
        }
    };

    const [updateBulk, { isLoading }] = useBulkUpdateMutation();

    // Combine all product data
    const allProducts = useMultipleProductData(initialScannedSkus);

    useEffect(() => {
        // Run only if initialScannedSkus is non-empty
        if (initialScannedSkus.length === 0) return;

        initialScannedSkus.forEach((sku, i) => {
            setTimeout(
                () => {
                    playCheckSound();
                    setScannedProducts((prev) => [...prev, sku]);
                    setQuantities((prev) => ({ ...prev, [sku]: 1 }));
                    toast.success(`Product ${sku} scanned`);
                },
                (i + 1) * 3000
            ); // staggered delay
        });
    }, [initialScannedSkus]);

    // Function to increase quantity
    const increaseQuantity = (sku: string) => {
        setQuantities((prev) => ({
            ...prev,
            [sku]: (prev[sku] || 1) + 1
        }));
    };

    // Function to decrease quantity, but not below 1
    const decreaseQuantity = (sku: string) => {
        setQuantities((prev) => ({
            ...prev,
            [sku]: Math.max(1, (prev[sku] || 1) - 1)
        }));
    };

    // Function to confirm all products
    const confirmAllProducts = async () => {
        if (allProducts.length === 0) return;

        // Create the product objects array
        const productsData = allProducts.map((product) => ({
            sku: product.sku,
            quantity: quantities[product.sku] || 1
        }));

        // Log the data format
        console.log({
            data: productsData
        });

        try {
            const response = await updateBulk({
                data: productsData
            }).unwrap(); // Ensure id is passed

            if (response?.success) {
                // Show success toast
                toast.success(
                    `${productsData.length} products checkout successfully!!`
                );
                playCheckSound();

                // ✅ Reset quantities to 0 for only scanned products
                setQuantities((prev) => {
                    const updatedQuantities = { ...prev };
                    scannedProducts.forEach((sku) => {
                        updatedQuantities[sku] = 0; // or delete if you want to completely remove
                    });
                    return updatedQuantities;
                });

                // ✅ Optionally clear scanned products
                setScannedProducts([]);
                window.location.reload();
            }
        } catch (err: unknown) {
            const errorMessage =
                (err as { data?: { message?: string } })?.data?.message ||
                'Failed to update product';
            toast.error(errorMessage);
            console.error('Error updating product:', err);
        }
    };

    if (isLoading) {
        return 'loading...';
    }
    return (
        <div className='container mx-auto p-4'>
            {/* Audio element for check sound */}
            <audio ref={audioRef} src='/sounds/check.mp3' />

            <div className='mb-4 flex justify-between items-center'>
                <h1 className='text-2xl font-bold'>Product Scanner</h1>
                <Button
                    onClick={confirmAllProducts}
                    disabled={allProducts.length === 0}
                    className='ml-auto'
                >
                    <ShoppingCart className='mr-2 h-4 w-4' /> Confirm All
                    Products
                </Button>
            </div>

            {allProducts.length === 0 ? (
                <div className='text-center p-8 border rounded-md bg-gray-50'>
                    <p className='text-gray-500'>Waiting for products...</p>
                </div>
            ) : (
                <Table>
                    <TableHeader>
                        <TableRow className='bg-gray-500'>
                            <TableHead className='!text-white'>SKU</TableHead>
                            <TableHead className='!text-white'>Title</TableHead>
                            <TableHead className='!text-white'>Brand</TableHead>
                            <TableHead className='!text-white'>Price</TableHead>
                            <TableHead className='!text-white'>Stock</TableHead>
                            <TableHead className='!text-white'>
                                Quantity
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {allProducts.map((product) => (
                            <TableRow key={product.sku}>
                                <TableCell className='font-medium'>
                                    {product.sku}
                                </TableCell>
                                <TableCell>{product.title}</TableCell>
                                <TableCell>{product.brandName}</TableCell>
                                <TableCell>
                                    ${product.salePrice.toFixed(2)}
                                </TableCell>
                                <TableCell>{product.stockQuantity}</TableCell>
                                <TableCell>
                                    <div className='flex items-center gap-2'>
                                        <Button
                                            variant='outline'
                                            size='icon'
                                            onClick={() =>
                                                decreaseQuantity(product.sku)
                                            }
                                            disabled={
                                                (quantities[product.sku] ||
                                                    1) <= 1
                                            }
                                        >
                                            <Minus className='h-4 w-4 text-black' />
                                        </Button>
                                        <span className='w-8 text-center'>
                                            {quantities[product.sku] || 1}
                                        </span>
                                        <Button
                                            variant='outline'
                                            size='icon'
                                            onClick={() =>
                                                increaseQuantity(product.sku)
                                            }
                                        >
                                            <Plus className='h-4 w-4 text-black' />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </div>
    );
};

export default ProductList;
