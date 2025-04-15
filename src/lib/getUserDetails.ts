/* eslint-disable @typescript-eslint/no-explicit-any */
/* lib/getUserDetails.ts */
import { jwtDecode } from "jwt-decode";
import { API_BASE_URL } from "../config";

export async function getUserDetails(token: string) {
  try {
    const decoded = jwtDecode<any>(token);
    const userId = decoded?.id;

    const res = await fetch(`${API_BASE_URL}/userroute/user/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch user data");
    }

    const userData = await res.json();
    return { userId, userData };
  } catch (error) {
    console.error("Error in getUserDetails:", error);
    return null;
  }
}
