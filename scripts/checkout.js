import { cart, removeFromCart } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
import { updateCartQuantity } from "./utils/updateQuantity.js";
import { saveToLocalStorage } from "../data/cart.js";
let cartSummaryHtml = "";
cart.forEach((cartItem) => {
  const { productId } = cartItem;
  let matchedProduct = products.find((product) => product.id === productId);
  cartSummaryHtml += `          <div class="cart-item-container js-cart-item-container-${productId}">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchedProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                    ${matchedProduct.name}
                </div>
                <div class="product-price">
                    $${formatCurrency(matchedProduct.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label js-quantity-label-${productId}">${cartItem.quantity
    }</span>
                  </span>
                    <input class="js-new-quantity-input-${productId} new-quantity-input" type="number" value="${cartItem.quantity}" hidden min="0">
                  <span class="update-quantity-link link-primary js-update-link" data-product-id="${productId}">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${productId}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                <label class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${productId}">
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </label>
                <label class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${productId}">
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15  
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </label>
                <label class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${productId}">
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>`;
});

document.querySelector(".js-order-summary").innerHTML = cartSummaryHtml;
document.querySelectorAll(".js-delete-link").forEach((link) => {
  link.addEventListener("click", () => {
    const { productId } = link.dataset;
    removeFromCart(productId);
    document.querySelector(`.js-cart-item-container-${productId}`).remove();
    document.querySelector(".return-to-home-link").innerText = updateCartQuantity(cart);
  });
});


window.addEventListener("load", () => {
  document.querySelector(".return-to-home-link").innerText = updateCartQuantity(cart);
})
function upadateButtonLogic(button, productId) {

  // getting the product id
  let input = document.querySelector(`.js-new-quantity-input-${productId}`);
  let quantityLabel = document.querySelector(`.js-quantity-label-${productId}`);
  if (button.innerHTML.trim() === 'Update') {
    button.innerHTML = 'Save'
    quantityLabel.hidden = true;
    input.hidden = false;
    input.focus();
  }
  else {
    quantityLabel.hidden = false;
    quantityLabel.innerHTML = input.value;
    if (input.value == 0) {
      removeFromCart(productId);
      saveToLocalStorage();
      document.querySelector(`.js-cart-item-container-${productId}`).remove();
      document.querySelector(".return-to-home-link").innerText = updateCartQuantity(cart);
      return;
    }
    input.hidden = true;
    button.innerHTML = 'Update'

    cart.find((product) => product.productId === productId).quantity = input.value;
    saveToLocalStorage();
    document.querySelector(".return-to-home-link").innerText = updateCartQuantity(cart);
  }

}
//  setting event listener in all update buttons 
document.querySelectorAll(".update-quantity-link").
  forEach((button) => {
    const { productId } = button.dataset; // getting the product id
    // adding event listener to all update buttons
    button.addEventListener("click", () => { upadateButtonLogic(button, productId) });
    document.querySelector(`.js-cart-item-container-${productId}`).addEventListener("keydown", (event) => {
      if (event.key === "Enter") { upadateButtonLogic(button, productId) }
    });

  });