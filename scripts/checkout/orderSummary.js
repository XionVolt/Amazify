// internal dependencies
import { cart, removeFromCart, updateDeliveryOption } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import formatCurrency from ".././utils/money.js";
import { updateCartQuantity } from "../utils/updateQuantity.js";
import { saveToLocalStorage } from "../../data/cart.js";
import { deliveryOptions, getDeliveryOption } from "../../data/deliveryOptions.js";
import { paymentSummary } from "./paymentSummary.js";
// external dependencies
import dayjs from "https://cdn.skypack.dev/dayjs";
export function renderOrderSummary() {
  let cartSummaryHtml = "";

  cart.forEach((cartItem) => {
    const { productId } = cartItem;
    const matchedProduct = getProduct(productId);

    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    let deliveryDate = dayjs()
      .add(deliveryOption.deliveryDays, "day")
      .format("dddd, MMMM D");

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
                    $${formatCurrency(matchedProduct.priceCents)}
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
      let deliveryDate = dayjs()
        .add(option.deliveryDays, "day")
        .format("dddd, MMMM D");
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
      removeFromCart(productId);
      renderOrderSummary();
      paymentSummary();
    });
  });

  window.addEventListener("load", () => {
    document.querySelector(".return-to-home-link").innerText =
      updateCartQuantity(cart);
  });

  // callback of update button event listener
  function upadateButtonLogic(button, productId) {
    // getting the product id
    let input = document.querySelector(`.js-new-quantity-input-${productId}`);
    let quantityLabel = document.querySelector(
      `.js-quantity-label-${productId}`
    );
    if (button.innerHTML.trim() === "Update") {
      button.innerHTML = "Save";
      quantityLabel.hidden = true;
      input.hidden = false;
      input.focus();
    } else {
      quantityLabel.hidden = false;
      quantityLabel.innerHTML = input.value;
      if (input.value == 0) {
        removeFromCart(productId);
        saveToLocalStorage();
        document.querySelector(`.js-cart-item-container-${productId}`).remove();
        document.querySelector(".return-to-home-link").innerText =
          updateCartQuantity(cart);
        paymentSummary();
        return;
      }
      input.hidden = true;
      button.innerHTML = "Update";

      cart.find((product) => product.productId === productId).quantity =
        input.value;
      saveToLocalStorage();
      document.querySelector(".return-to-home-link").innerText =
        updateCartQuantity(cart);
      paymentSummary();
    }
  }
  //  setting event listener in all update buttons
  document.querySelectorAll(".update-quantity-link").forEach((button) => {
    const { productId } = button.dataset; // getting the product id
    // adding event listener to all update buttons
    button.addEventListener("click", () => {
      upadateButtonLogic(button, productId);
    });
    document
      .querySelector(`.js-cart-item-container-${productId}`)
      .addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          upadateButtonLogic(button, productId);
        }
      });
  });

  document.querySelectorAll(".js-delivery-option").forEach((option) => {
    option.addEventListener("click", () => {
      const { productId, deliveryOptionId } = option.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
      paymentSummary();
    });
  });
}