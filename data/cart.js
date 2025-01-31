

class Cart {
    #localStorageKey
    constructor (localStorageKey) {
      this.#localStorageKey  = localStorageKey
      this.#loadFromStorage();
    }
    
    #loadFromStorage() {
      this.cartItems =  localStorage.getItem(this.#localStorageKey) ? JSON.parse(localStorage.getItem(this.#localStorageKey)) : []
    }
      addToCart (productId) {
        let existingProduct = this.cartItems.find((product) => product.productId === productId);
        if (existingProduct) {
              let { quantity: existingQuantity } = existingProduct;
              existingProduct.quantity = Number(existingQuantity) + Number(document.querySelector(`.js-quantity-selector-${productId}`).value);
            }
            else {
              this.cartItems.push(
                {
                  productId,
                  quantity: document.querySelector(`.js-quantity-selector-${productId}`).value,
                  deliveryOptionId : '1'
                  
                }
                
              );
            }
            this.saveToLocalStorage();
        }
  
        removeFromCart (productId) {
         this.cartItems.splice(
           this.cartItems.findIndex((product) => product.productId === productId),
           1
         ),
  
         this.saveToLocalStorage() ;
       }
       
        saveToLocalStorage () {
          localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
       }
       
        updateDeliveryOption (productId,deliveryOptionId) {
         this.cartItems.find((product) => product.productId === productId).deliveryOptionId = deliveryOptionId;
         this.saveToLocalStorage();
       }

}

export let cart = new Cart('cart-oop');


// let businessCart = new Cart('cart-business');
// cart.addToCart("15b6fc6f-327a-4ec4-896f-486349e85a3d")
// businessCart.addToCart("15b6fc6f-327a-4ec4-896f-486349e85a3d")