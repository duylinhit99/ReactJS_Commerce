export function getCart() {
  try {
    return JSON.parse(localStorage.getItem("cart") || "{}");
  } catch {
    return {};
  }
}

export function setCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function getCartTotalQty(cart = getCart()) {
  return Object.values(cart).reduce((sum, qty) => sum + Number(qty), 0);
}

export function addProductToCart(productId) {
  const cart = getCart();
  cart[productId] = (cart[productId] || 0) + 1;
  setCart(cart);
  return getCartTotalQty(cart);
}

export function incrementCartItem(productId) {
  const cart = getCart();
  cart[productId] = (cart[productId] || 0) + 1;
  setCart(cart);
  return getCartTotalQty(cart);
}

export function decrementCartItem(productId) {
  const cart = getCart();
  if (cart[productId] > 1) {
    cart[productId] -= 1;
  } else {
    delete cart[productId];
  }
  setCart(cart);
  return getCartTotalQty(cart);
}
