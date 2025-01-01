export const cart = [
    {
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 2
    },
    {
      productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity: 11
    }
];

export function addToCart (productId) {
    let existingProduct = cart.find((product) => product.productId === productId);
      if (existingProduct) {
        let { quantity: existingQuantity } = existingProduct;
        existingProduct.quantity = Number(existingQuantity) + Number(document.querySelector(`.js-quantity-selector-${productId}`).value);
        
      }
      else {
        cart.push(
          {
            productId,
            quantity: document.querySelector(`.js-quantity-selector-${productId}`).value
  
          }
  
        );
      }
  }
