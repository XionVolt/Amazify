export const cart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];
export function addToCart (productId) {
    let existingProduct = cart.find((product) => product.productId === productId);
      if (existingProduct) {
        let { quantity: existingQuantity } = existingProduct;
        existingProduct.quantity = Number(existingQuantity) + Number(document.querySelector(`.js-quantity-selector-${productId}`).value);
        
        saveToLocalStorage();
      }
      else {
        cart.push(
          {
            productId,
            quantity: document.querySelector(`.js-quantity-selector-${productId}`).value
  
          }
          
        );
        saveToLocalStorage();
      }
  }
export function removeFromCart (productId) {
  cart.splice(
    cart.findIndex((product) => product.productId === productId),
    1
  );
  saveToLocalStorage();
};

function saveToLocalStorage () {
  localStorage.setItem("cart", JSON.stringify(cart));
  
};
