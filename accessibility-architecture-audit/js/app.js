import { fetchProducts } from "./api.js";

const STORAGE = { products: "a11y-products", cart: "audit-cart", user: "a11y-user" };
const state = { products: [], category: "all", query: "", sort: "default", cart: load(STORAGE.cart, []), user: load(STORAGE.user, null) };
const $ = selector => document.querySelector(selector);
const els = {
  grid: $("#product-grid"), search: $("#product-search"), categories: $("#category-tabs"), sort: $("#sort-products"),
  error: $("#error-banner"), errorMessage: $("#error-message"), loading: $("#loading-skeleton"), cartCount: $("#cart-count"),
  authStatus: $("#auth-status"), authButton: $("#auth-button"), authDialog: $("#auth-dialog"), authForm: $("#auth-form"),
  productDialog: $("#product-dialog"), productForm: $("#product-form"), productDialogTitle: $("#product-dialog-title")
};

function load(key, fallback) { try { const value = localStorage.getItem(key); return value ? JSON.parse(value) : fallback; } catch { return fallback; } }
function save(key, value) { try { localStorage.setItem(key, JSON.stringify(value)); } catch { showError("Your browser could not save local state. Changes may be lost after refresh."); } }
function showError(message) { if (!els.error) return; els.errorMessage.textContent = message; els.error.hidden = false; }
function hideError() { if (els.error) els.error.hidden = true; }
function setLoading(value) { if (els.loading) els.loading.hidden = !value; els.grid?.setAttribute("aria-busy", String(value)); }
function escapeHtml(value) { return String(value).replace(/[&<>\"]/g, c => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;" }[c])); }

function getCategories() { return ["all", ...new Set(state.products.map(p => p.category))]; }
function filteredProducts() {
  const query = state.query.trim().toLowerCase();
  const items = state.products.filter(p => state.category === "all" || p.category === state.category).filter(p => !query || `${p.title} ${p.description}`.toLowerCase().includes(query));
  if (state.sort === "price-asc") items.sort((a,b) => a.price-b.price);
  if (state.sort === "price-desc") items.sort((a,b) => b.price-a.price);
  if (state.sort === "name") items.sort((a,b) => a.title.localeCompare(b.title));
  return items;
}

function renderCategories() {
  els.categories?.replaceChildren(...getCategories().map(category => {
    const button = document.createElement("button"); button.type = "button"; button.className = "button secondary"; button.textContent = category === "all" ? "All" : category;
    button.setAttribute("aria-pressed", String(state.category === category)); button.addEventListener("click", () => { state.category = category; render(); }); return button;
  }));
}
function renderProducts() {
  if (!els.grid) return; els.grid.replaceChildren(); const items = filteredProducts();
  if (!items.length) { const empty = document.createElement("p"); empty.textContent = "No products match your search."; els.grid.append(empty); return; }
  for (const product of items) {
    const article = document.createElement("article"); article.className = "card";
    article.innerHTML = `<p class="eyebrow">${escapeHtml(product.category)}</p><h3></h3><p></p><strong>$${Number(product.price).toFixed(2)}</strong><div class="button-row"><button class="button add" type="button">Add to cart</button><button class="button secondary edit" type="button">Edit</button><button class="button secondary delete" type="button">Delete</button></div>`;
    article.querySelector("h3").textContent = product.title; article.querySelector("p:nth-of-type(2)").textContent = product.description;
    article.querySelector(".add").addEventListener("click", () => addToCart(product)); article.querySelector(".edit").addEventListener("click", () => openProductForm(product)); article.querySelector(".delete").addEventListener("click", () => deleteProduct(product.id)); els.grid.append(article);
  }
}
function updateCartCount() { if (els.cartCount) els.cartCount.textContent = String(state.cart.length); }
function addToCart(product) { state.cart.push({ id: product.id, title: product.title, price: product.price }); save(STORAGE.cart, state.cart); updateCartCount(); }

function openProductForm(product = null) {
  els.productDialogTitle.textContent = product ? "Edit product" : "Add product";
  $("#product-id").value = product?.id ?? ""; $("#product-title").value = product?.title ?? ""; $("#product-category").value = product?.category ?? ""; $("#product-price").value = product?.price ?? ""; $("#product-description").value = product?.description ?? "";
  els.productDialog.showModal();
}
function saveProduct() {
  const id = $("#product-id").value; const product = { id: id ? Number(id) : Date.now(), title: $("#product-title").value.trim(), category: $("#product-category").value.trim(), price: Number($("#product-price").value), description: $("#product-description").value.trim() };
  if (!product.title || !product.category || !Number.isFinite(product.price) || !product.description) return;
  if (id) state.products = state.products.map(item => item.id === product.id ? { ...item, ...product } : item); else state.products.unshift(product);
  save(STORAGE.products, state.products); els.productDialog.close(); render();
}
function deleteProduct(id) { if (!confirm("Delete this product from the local catalog?")) return; state.products = state.products.filter(p => p.id !== id); save(STORAGE.products, state.products); render(); }

function updateAuthUI() { els.authStatus.textContent = state.user ? `Signed in as ${state.user.email}` : "Guest"; els.authButton.textContent = state.user ? "Sign out" : "Sign in"; }
function signIn(email) { state.user = { email, signedInAt: new Date().toISOString() }; save(STORAGE.user, state.user); updateAuthUI(); }
function signOut() { state.user = null; save(STORAGE.user, null); updateAuthUI(); }

async function init() {
  setLoading(true); hideError();
  try {
    const cached = load(STORAGE.products, null);
    state.products = Array.isArray(cached) && cached.length ? cached : await fetchProducts();
    save(STORAGE.products, state.products); render();
  } catch (error) { console.error(error); showError("We could not load the product catalogue. Check your connection and try again."); }
  finally { setLoading(false); }
}
function render() { renderCategories(); renderProducts(); updateCartCount(); updateAuthUI(); }

els.search?.addEventListener("input", e => { state.query = e.target.value; renderProducts(); });
els.sort?.addEventListener("change", e => { state.sort = e.target.value; renderProducts(); });
$("#retry-products")?.addEventListener("click", init); $("#open-create")?.addEventListener("click", () => openProductForm()); $("#cancel-product")?.addEventListener("click", () => els.productDialog.close());
els.productForm?.addEventListener("submit", e => { e.preventDefault(); if (els.productForm.reportValidity()) saveProduct(); });
els.authButton?.addEventListener("click", () => state.user ? signOut() : els.authDialog.showModal());
els.authForm?.addEventListener("submit", e => { if (e.submitter?.value !== "submit") return; e.preventDefault(); if (els.authForm.reportValidity()) { signIn($("#auth-email").value.trim()); els.authDialog.close(); } });

init();
