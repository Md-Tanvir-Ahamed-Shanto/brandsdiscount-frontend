export interface IUser {
    id: string;
    username: string;
    email: string;
    role: "Admin" | "User" | "OtherRole"; // Adjust based on available roles
    profilePicture: string | null;
    loyaltyStatus: "Not_Eligible" | "Eligible" | "OtherStatus"; // Adjust as needed
    orderPoint: number;
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
    updatedById: string | null;
    hashedPassword: Record<number, number>; // Uint8Array alternative
    salt: Record<number, number>; // Uint8Array alternative
  }
  
  export interface ISize {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string; 
  }
  
  export interface ICategory {
    id: string;
    name: string;
    parentCategoryId: string | null;
    createdAt: string;
    updatedAt: string; 
  }