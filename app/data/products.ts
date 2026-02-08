export async function getProducts() {
  try {
    const response = await fetch("/api/products", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.status}`);
    }

    const data = await response.json();
    return data.products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}