import { fetchProducts } from "./api.js";

const state = {
  products: [],
  category: "all",
  query: "",
  sort: "default",
  cart: loadCart()
};

const els = {
  grid: document.querySelector("#product-grid"),
  search: document.querySelector("#product-search"),
  categories: document.querySelector("#category-tabs"),
  sort: document.querySelector("#sort-products"),
  error: document.querySelector("#error-banner"),
  loading: document.querySelector("#loading-skeleton"),
  cartCount: document.querySelector("#cart-count")
};

function loadCart() {
  try { return JSON.parse(localStorage.getItem("audit-cart") || "[]"); }
  catch { return []; }
}

function saveCart() {
  try { localStorage.setItem("audit-cart", JSON.stringify(state.cart)); }
  catch { showError("Your browser could not save cart preferences."); }
}

function showError(message) {
  if (!els.error) return;
  els.error.textContent = message;
  els.error.hidden = false;
}

function hideError() {
  if (els.error) els.error.hidden = true;
}

function setLoading(isLoading) {
  if (els.loading) els.loading.hidden = !isLoading;
  if (els.grid) els.grid.setAttribute("aria-busy", String(isLoading));
}

function getCategories() {
  return ["all", ...new Set(state.products.map(p => p.category))];
}

function renderCategories() {
  if (!els.categories) return;
  els.categories.replaceChildren(...getCategories().map(category => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "button secondary";
    button.textContent = category === "all" ? "All" : category;
    button.setAttribute("aria-pressed", String(state.category === category));
    button.addEventListener("click", () => { state.category = category; render(); });
    return button;
  }));
}

function filteredProducts() {
  const query = state.query.trim().toLowerCase();
  let items = state.products.filter(p => state.category === "all" || p.category === state.category)
    .filter(p => !query || `${p.title} ${p.description}`.toLowerCase().includes(query));

  if (state.sort === "price-asc") items.sort((a, b) => a.price - b.price);
  if (state.sort === "price-desc") items.sort((a, b) => b.price - a.price);
  if (state.sort === "name") items.sort((a, b) => a.title.localeCompare(b.title));
  return items;
}

function addToCart(product) {
  state.cart.push({ id: product.id, title: product.title, price: product.price });
  saveCart();
  updateCartCount();
}

function updateCartCount() {
  if (els.cartCount) els.cartCount.textContent = String(state.cart.length);
}

function renderProducts() {
  if (!els.grid) return;
  els.grid.replaceChildren();
  const items = filteredProducts();
  if (!items.length) {
    const empty = document.createElement("p");
    empty.textContent = "No products match your search.";
    els.grid.append(empty);
    return;
  }
  for (const product of items) {
    const article = document.createElement("article");
    article.className = "card";
    article.innerHTML = `<p class="eyebrow">${escapeHtml(product.category)}</p><h3></h3><p></p><strong>$${product.price.toFixed(2)}</strong><div><button class="button" type="button">Add to cart</button></div>`;
    article.querySelector("h3").textContent = product.title;
    article.querySelector("p:nth-of-type(2)").textContent = product.description;
    article.querySelector("button").addEventListener("click", () => addToCart(product));
    els.grid.append(article);
  }
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"]/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[char]));
}

function render() {
  renderCategories();
  renderProducts();
  updateCartCount();
}

async function init() {
  setLoading(true);
  hideError();
  try {
    state.products = await fetchProducts();
    render();
  } catch (error) {
    console.error(error);
    showError("We could not load the product catalogue. Please check your connection and try again.");
  } finally {
    setLoading(false);
  }
}

els.search?.addEventListener("input", event => { state.query = event.target.value; renderProducts(); });
els.sort?.addEventListener("change", event => { state.sort = event.target.value; renderProducts(); });
document.querySelector("#retry-products")?.addEventListener("click", init);

init();
