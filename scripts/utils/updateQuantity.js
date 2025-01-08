export function updateCartQuantity (cart) {
    return cart.reduce ((total, product) => total + Number(product.quantity), 0);
  }