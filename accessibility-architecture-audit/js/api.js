const API_URL = "https://fakestoreapi.com/products";

export async function fetchProducts() {
  const response = await fetch(API_URL, { headers: { Accept: "application/json" } });
  if (!response.ok) throw new Error(`API request failed (${response.status})`);
  const data = await response.json();
  if (!Array.isArray(data)) throw new Error("Unexpected API response.");
  return data;
}
