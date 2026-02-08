export interface CartItem {
  id: number;
  name: string;
  price: number;
  qty: number;
  size?: string;
  images?: string[]; // ✅ FIX
}
