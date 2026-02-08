export interface CartItem {
  id: number;
  name: string;
  price: number;
  originalPrice?: number; // ✅ ADDED for discount display
  qty: number;
  size?: string;
  images?: string[]; // ✅ FIX
}