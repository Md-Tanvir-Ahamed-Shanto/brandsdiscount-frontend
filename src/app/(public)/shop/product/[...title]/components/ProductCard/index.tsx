"use client";
import { useState, useEffect } from "react";
import { sizeChartMap } from "@/static";
import { ISingleProduct, ISingleProductVariant } from "@/types";
import { ProductStock } from "./ProductStock";
import { OfferCard } from "./OfferCard";
import { SizeChart } from "./SizeChart";
import { AvailablePaymentMethods } from "./AvailablePayments";
import AdditionalInformation from "../AdditionalInformation";
import AuthModal from "../AuthModal";

const ProductCard = ({
  product,
  quantity,
  setQuantity,
  isAllowedForFirstItemDiscount,
}: {
  product: ISingleProduct;
  quantity: number;
  setQuantity: (quantity: number) => void;
  isAllowedForFirstItemDiscount?: boolean;
}) => {
  const [selectedVariant, setSelectedVariant] =
    useState<ISingleProductVariant | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [currentImage, setCurrentImage] = useState<string>("");

  const sizeChartImage = product.categoryId
    ? sizeChartMap[product.categoryId as keyof typeof sizeChartMap]
    : undefined;

  // Get all available colors (include out-of-stock too)
  const availableColors = Array.from(
    new Set([
      ...(product.color ? [product.color] : []),
      ...(product.variants?.map((v) => v.color) || []),
    ])
  );

  // Get sizes for selected color
  const getSizesForColor = (color: string) => {
    const sizes: { size: string; stock: number }[] = [];

    // If selected color is main product color
    if (color === product.color) {
      if (product.sizes) {
        sizes.push({
          size: product.sizes,
          stock: product.stockQuantity ?? 0,
        });
      } else {
        sizes.push({
          size: "One Size",
          stock: product.stockQuantity ?? 0,
        });
      }
    }

    // Add variant sizes for the selected color
    const variantSizes =
      product.variants
        ?.filter((v) => v.color === color)
        .map((v) => ({
          size: v.sizes || "One Size",
          stock: v.stockQuantity ?? 0,
        })) || [];

    return [...sizes, ...variantSizes];
  };

  // Get image for selected color
  const getImageForColor = (color: string) => {
    if (color === product.color) {
      return product.images?.[0] || "";
    }
    const variant = product.variants?.find((v) => v.color === color);
    return variant?.images?.[0] || product.images?.[0] || "";
  };

  const handleColorSelection = (color: string) => {
    setSelectedColor(color);
    setSelectedSize("");
    setSelectedVariant(null);
    setCurrentImage(getImageForColor(color));
    setQuantity(1);
  };

  const handleSizeSelection = (size: string) => {
    setSelectedSize(size);

    // If size belongs to main product
    if (
      selectedColor === product.color &&
      (product.sizes === size || (!product.sizes && size === "One Size"))
    ) {
      setSelectedVariant(null);
    } else {
      // Find matching variant
      const variant = product.variants?.find(
        (v) =>
          v.color === selectedColor &&
          (v.sizes === size || (!v.sizes && size === "One Size"))
      );
      setSelectedVariant(variant || null);
    }
    setQuantity(1);
  };

  useEffect(() => {
    // Auto-select first available color
    if (availableColors.length > 0) {
      handleColorSelection(availableColors[0]);
    }
  }, [product]);

  return (
    <>
      <div className="container mx-auto p-4 md:p-6 max-w-5xl bg-white rounded-xl shadow-xl mt-1">
        <div className="md:flex md:space-x-8">
          {/* Image */}
          <div className="md:w-1/2 max-w-[480px] mx-auto overflow-hidden">
            <img
              src={currentImage || product.images[0] || ""}
              alt={product.title}
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Details */}
          <div className="md:w-1/2 mt-6 md:mt-0 flex flex-col justify-between">
            <div>
              {product.brandName && (
                <p className="text-sm font-medium text-[#e01922] mb-1">
                  Brand: {product.brandName}
                </p>
              )}
              <h1 className="text-2xl lg:text-3xl font-bold text-[#212529] leading-tight">
                {product.title}
              </h1>

              {/* Color Options */}
              <div className="mt-3">
                <p className="text-sm font-medium text-gray-700 mb-1">
                  Select Color:
                </p>
                <div className="flex flex-wrap gap-2">
                  {availableColors.map((color) => {
                    const hasStock =
                      (color === product.color
                        ? product.stockQuantity ?? 0
                        : product.variants?.find((v) => v.color === color)
                            ?.stockQuantity ?? 0) > 0;

                    return (
                      <span
                        key={color}
                        className={`px-3 py-1 text-sm border rounded-md cursor-pointer ${
                          selectedColor === color
                            ? "border-primary bg-primary/10"
                            : "hover:border-primary"
                        } ${!hasStock ? "opacity-50 cursor-not-allowed" : ""}`}
                        onClick={() => hasStock && handleColorSelection(color)}
                      >
                        {color}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Size Options */}
              {selectedColor && (
                <div className="mt-3">
                  <p className="text-sm font-medium text-gray-700 mb-1">
                    Select Size:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {getSizesForColor(selectedColor).map(({ size, stock }) => (
                      <span
                        key={size}
                        className={`px-3 py-1 text-sm border rounded-md cursor-pointer ${
                          selectedSize === size
                            ? "border-primary bg-primary/10"
                            : "hover:border-primary"
                        } ${stock <= 0 ? "opacity-50 cursor-not-allowed" : ""}`}
                        onClick={() => stock > 0 && handleSizeSelection(size)}
                      >
                        {size}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Chart */}
              <SizeChart chartImage={sizeChartImage} />

              {/* Price */}
              <div className="mt-4">
                <p className="text-lg font-semibold text-gray-900">
                  Price: $
                  {selectedVariant
                    ? selectedVariant.salePrice.toFixed(2)
                    : (product.salePrice || 0).toFixed(2)}
                  {((selectedVariant
                    ? selectedVariant.regularPrice
                    : product.regularPrice) || 0) >
                    ((selectedVariant
                      ? selectedVariant.salePrice
                      : product.salePrice) || 0) && (
                    <span className="ml-2 text-sm line-through text-gray-500 opacity-75">
                      $
                      {(
                        selectedVariant
                          ? selectedVariant.regularPrice
                          : product.regularPrice || 0
                      ).toFixed(2)}
                    </span>
                  )}
                  {!selectedVariant && product.toggleFirstDeal && (
                    <span className="ml-2 text-sm text-green-600">
                      (10% off first purchase)
                    </span>
                  )}
                </p>
              </div>

              {/* Stock */}
              <ProductStock
                product={
                  selectedVariant
                    ? {
                        ...product,
                        stockQuantity: selectedVariant.stockQuantity,
                      }
                    : product
                }
              />

              {/* Offer Card */}
              <OfferCard
                product={product}
                isAllowedForFirstItemDiscount={isAllowedForFirstItemDiscount}
              />

              {/* Quantity */}
              <div className="mb-5">
                <label
                  htmlFor="quantity"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Quantity:
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={quantity}
                  min={1}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    const maxStock = selectedVariant
                      ? selectedVariant.stockQuantity ?? 0
                      : product.stockQuantity ?? 0;
                    if (value > maxStock) {
                      setQuantity(maxStock ?? 1);
                    } else if (value < 1) {
                      setQuantity(1);
                    } else {
                      setQuantity(value);
                    }
                  }}
                  disabled={
                    product.status === "outofstock" ||
                    (selectedVariant
                      ? selectedVariant.stockQuantity === 0
                      : product.stockQuantity === 0)
                  }
                  max={
                    selectedVariant
                      ? selectedVariant.stockQuantity
                      : product.stockQuantity
                  }
                  className="w-24 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-150"
                />
              </div>
            </div>

            {/* Auth Modal + Payment */}
            <div>
              <AuthModal
                product={
                  selectedVariant
                    ? {
                        ...product,
                        color: selectedVariant.color,
                        sizes:
                          selectedVariant.sizes ||
                          (selectedVariant.sizes ? "" : "One Size"),
                        stockQuantity: selectedVariant.stockQuantity,
                        regularPrice: selectedVariant.regularPrice,
                        salePrice: selectedVariant.salePrice,
                      }
                    : product
                }
                quantity={quantity}
              />
              <AvailablePaymentMethods />
            </div>
          </div>
        </div>
      </div>

      {/* Additional Info */}
      <div className="py-12 container mx-auto">
        <AdditionalInformation product={product} />
      </div>
    </>
  );
};

export { ProductCard };
