export interface IOrder {
    id: string;
    userId: string;
    status: 'Pending' | 'Completed' | 'Cancelled' | string;
    totalAmount: number;
    createdAt: string;
    updatedAt: string;
    transactionId: string;
    user: {
      id: string;
      username: string;
      hashedPassword: number[];
      salt: number[];
      email: string;
      role: string;
      profilePicture: {
        id: string;
        url: string;
      };
      userDetails: {
        city: string;
        country: string;
        fullName: string;
        postalCode: string;
        phoneNumber: string;
        addressLine1: string;
        addressLine2: string;
        stateProvince: string;
      };
      loyaltyStatus: string;
      orderPoint: number;
      createdAt: string;
      updatedAt: string;
      updatedById: string;
    };
    transaction: {
      id: string;
      transactionId: string;
      orderId: string;
      amount: number;
      status: string;
      createdAt: string;
    };
    orderDetails: Array<{
      id: string;
      sku: string;
      orderId: string;
      productId: string;
      quantity: number;
      price: number;
      total: number;
      productName: string;
      categoryName: string;
      sizeName: string;
      createdAt: string;
      product: {
        id: string;
        title: string;
        brandName: string;
        color: string;
        sku: string;
        images: Array<{
          id: string;
          url: string;
        }>;
        itemLocation: string;
        sizeId: string;
        sizeType: string | null;
        categoryId: string;
        subCategoryId: string | null;
        parentCategoryId: string | null;
        regularPrice: number;
        salePrice: number;
        platFormPrice: number | null;
        discountPercent: number;
        stockQuantity: number;
        condition: string;
        description: string;
        status: string;
        createdAt: string;
        updatedAt: string;
        updatedById: string | null;
      };
    }>;
  }
  