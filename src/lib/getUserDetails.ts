/* eslint-disable @typescript-eslint/no-explicit-any */
/* lib/getUserDetails.ts */
import { jwtDecode } from "jwt-decode";
import { API_BASE_URL } from "../config";

export async function getUserDetails(token: string) {
  try {
    console.log('getUserDetails: Decoding token:', token?.substring(0, 20) + '...');
    const decoded = jwtDecode<any>(token);
    const userId = decoded?.id;
    console.log('getUserDetails: User ID:', userId);

    if (!userId) {
      console.error('getUserDetails: No user ID found in token');
      return null;
    }

    const apiUrl = `${API_BASE_URL}/userroute/user/${userId}`;
    console.log('getUserDetails: Fetching from:', apiUrl);

    const res = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('getUserDetails: API response status:', res.status);
    if (!res.ok) {
      const errorText = await res.text();
      console.error('getUserDetails: API error response:', errorText);
      throw new Error(`Failed to fetch user data: ${res.status} - ${errorText}`);
    }

    const userData = await res.json();
    console.log('getUserDetails: User data received:', { role: userData.role, username: userData.username });
    return { userId, userData };
  } catch (error) {
    console.error("Error in getUserDetails:", error);
    return null;
  }
}
