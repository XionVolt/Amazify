// internal dependencies
import { cart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import formatCurrency from ".././utils/money.js";
import { deliveryOptions, getDeliveryOption , calculateDeliveryDate } from "../../data/deliveryOptions.js";
import { paymentSummary } from "./paymentSummary.js";
import renderCheckoutHeader from "./checkoutHeader.js";
import updateButton from "./updateButton.js";

export function renderOrderSummary() {
  let cartSummaryHtml = "";

  cart.cartItems.forEach((cartItem) => {
    const { productId } = cartItem;
    const matchedProduct = getProduct(productId);
    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    let deliveryDate = calculateDeliveryDate(deliveryOption.deliveryDays);

    cartSummaryHtml += `          <div class="cart-item-container js-cart-item-container-${productId}">
            <div class="delivery-date js-delivery-date-${productId}">
              Delivery Date: ${deliveryDate}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchedProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                    ${matchedProduct.name}
                </div>
                <div class="product-price">
                    ${matchedProduct.getPrice()}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label js-quantity-label-${productId}">${cartItem.quantity
      }</span>
                  </span>
                    <input class="js-new-quantity-input-${productId} new-quantity-input" type="number" value="${cartItem.quantity
      }" hidden min="0">
                  <span class="update-quantity-link link-primary js-update-link" data-product-id="${productId}">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${productId}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options" data-product-id="${productId}">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${deliveryOptionsHTML(matchedProduct, cartItem)}
              </div>
            </div>
          </div>`;
  });
  function deliveryOptionsHTML(matchedProduct, cartItem) {
    let deliveryOptionsHtml = "";
    deliveryOptions.forEach((option) => {
      const isChecked = cartItem.deliveryOptionId === option.id;
      let deliveryDate = calculateDeliveryDate(option.deliveryDays);
      let price = option.priceCents
        ? formatCurrency(option.priceCents)
        : "FREE";
      deliveryOptionsHtml += `<label class="delivery-option js-delivery-option" data-delivery-option-id="${option.id
        }" data-product-id="${matchedProduct.id}" >
                    <input type="radio" ${isChecked ? "checked" : ""}
                      class="delivery-option-input"
                      name="delivery-option-${matchedProduct.id}"  >
                    <div>
                      <div class="delivery-option-date">
                        ${deliveryDate}
                      </div>
                      <div class="delivery-option-price">
                        ${price} - Shipping
                      </div>
                    </div>
                  </label>`;
    });
    return deliveryOptionsHtml;
  }
  document.querySelector(".js-order-summary").innerHTML = cartSummaryHtml;
  document.querySelectorAll(".js-delete-link").forEach((link) => {
    link.addEventListener("click", () => {
      const { productId } = link.dataset;
      cart.removeFromCart(productId);
      renderOrderSummary(); 
      paymentSummary();
      renderCheckoutHeader(cart.cartItems);
    });
  });

  window.addEventListener("load", () => {
    
    renderCheckoutHeader(cart.cartItems);
  });

  // update button functionality function , call
  updateButton(cart.removeFromCart,renderCheckoutHeader,paymentSummary,cart.saveToLocalStorage,cart);

  document.querySelectorAll(".js-delivery-option").forEach((option) => {
    option.addEventListener("click", () => {
      const { productId, deliveryOptionId } = option.dataset;
      cart.updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
      paymentSummary();
    });
  });
}