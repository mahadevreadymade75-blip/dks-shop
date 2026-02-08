# 🛒 WhatsApp E-Commerce Store (Next.js)

A modern, fast, and mobile-first **WhatsApp-based E-Commerce web application** built using **Next.js App Router**, **TypeScript**, and **Tailwind CSS**.  
Customers can browse products, apply filters, and place orders directly via **WhatsApp**.

---

## 🚀 Features

### 🧩 Core Features
- ⚡ Built with **Next.js 14 (App Router)**
- 🧠 **TypeScript** for type safety
- 🎨 **Tailwind CSS** for modern UI
- 📱 Fully **responsive (mobile-first)** design

### 🛍️ Product System
- Multiple categories:
  - Men
  - Women
  - Shoes
  - Kids
  - Home & Kitchen
  - Watches
- Product image slider (auto-slide)
- Product details page
- Clean product card UI

### 🔍 Filters & Sorting
- Category-based filters
- Price range filter
- Sort by price (Low → High, High → Low)
- URL-based filters (persist on refresh)
- Active filter chips with clear ❌ button
- Product count badge

### ⚙️ UX Enhancements
- Smooth filter animations
- Skeleton loaders on filter change
- Scrollable filter bars (not fixed)
- Clean error-free TypeScript setup

### 📦 Cart & Order
- Add to cart
- View cart
- Place order via **WhatsApp**
- Lightweight cart state management

---

## 🧱 Tech Stack

| Technology | Usage |
|----------|------|
| Next.js 14 | App Router & routing |
| TypeScript | Strong typing |
| Tailwind CSS | Styling |
| React Hooks | State & effects |
| WhatsApp API | Order handling |
| Local Data | Product management |

---

## 📁 Project Structure

```
app/
 ├─ page.tsx
 ├─ men/
 ├─ women/
 ├─ shoes/
 ├─ watches/
 ├─ kids/
 ├─ home-kitchen/
 ├─ product/[id]/
 ├─ cart/
 ├─ checkout/
components/
 ├─ Navbar.tsx
 ├─ Footer.tsx
 ├─ ProductCard.tsx
 ├─ CartItem.tsx
context/
 ├─ CartContext.tsx
data/
 ├─ products.ts
types/
 ├─ product.ts
public/
 ├─ men/
 ├─ women/
 ├─ shoes/
 ├─ watches/
 ├─ kids/
 ├─ home-kitchen/
```

---

## 🖼️ Product Images

All product images are served from the **`/public`** folder.

Example:
```
/public/shoes/s1.0.jpg
/public/watches/watch1.jpg
```

---

## 🧪 Development Setup

```bash
git clone https://github.com/your-username/whatsapp-ecommerce.git
cd whatsapp-ecommerce
npm install
npm run dev
```

Open 👉 http://localhost:3000

---

## 👨‍💻 Author

**Mukesh Lilawat**  
Full-Stack Developer  
Next.js | Java | Spring Boot | React  

---

⭐ Star this repo if you find it useful!
