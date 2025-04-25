import { useGetSkuProductQuery } from '@/api';

// useMultipleProductData.ts
export const useMultipleProductData = (scannedProducts: string[]) => {
    const { data: productData0 } = useGetSkuProductQuery(
        scannedProducts[0] ?? null
    );
    const { data: productData1 } = useGetSkuProductQuery(
        scannedProducts[1] ?? null
    );
    const { data: productData2 } = useGetSkuProductQuery(
        scannedProducts[2] ?? null
    );
    const { data: productData3 } = useGetSkuProductQuery(
        scannedProducts[3] ?? null
    );
    const { data: productData4 } = useGetSkuProductQuery(
        scannedProducts[4] ?? null
    );
    const { data: productData5 } = useGetSkuProductQuery(
        scannedProducts[5] ?? null
    );
    const { data: productData6 } = useGetSkuProductQuery(
        scannedProducts[6] ?? null
    );
    const { data: productData7 } = useGetSkuProductQuery(
        scannedProducts[7] ?? null
    );
    const { data: productData8 } = useGetSkuProductQuery(
        scannedProducts[8] ?? null
    );
    const { data: productData9 } = useGetSkuProductQuery(
        scannedProducts[9] ?? null
    );

    return [
        productData0,
        productData1,
        productData2,
        productData3,
        productData4,
        productData5,
        productData6,
        productData7,
        productData8,
        productData9
    ].filter(Boolean);
};
