import { cart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import formatCurrency from "../utils/money.js";
import { updateCartQuantity } from "../utils/updateQuantity.js";
import { addOrder } from "../../data/orders.js";
import { renderOrderSummary } from "./orderSummary.js";
import renderCheckoutHeader from "../checkout/checkoutHeader.js";

export function paymentSummary() {
  let productPriceCents = 0;
  let shippingPriceCents = 0;
  let paymentSummaryHTML;
  if (cart.cartItems.length === 0) {
    cart.cartItems.push({ quantity: 0 });
  }
  cart.cartItems.forEach((cartItem) => {
    if (cart.cartItems.length > 0 && cartItem.quantity) {
      const product = getProduct(cartItem.productId);
      productPriceCents += product.priceCents * cartItem.quantity;
      shippingPriceCents += getDeliveryOption(
        cartItem.deliveryOptionId
      ).priceCents;
    } else {
      productPriceCents = 0;
      shippingPriceCents = 0;
    }

    const totalbeforeTax = productPriceCents + shippingPriceCents;
    const taxCents = totalbeforeTax * 0.1;
    const total = totalbeforeTax + taxCents;
    paymentSummaryHTML = `
          <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${updateCartQuantity(cart.cartItems)}):</div>
            <div class="payment-summary-money">$${formatCurrency(
              productPriceCents
            )}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(
              shippingPriceCents
            )}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(
              totalbeforeTax
            )}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(
              taxCents
            )}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(total)}</div>
          </div>

          <button class="place-order-button button-primary js-place-order">
            Place your order
          </button>
       `;
  });
  document.querySelector(".js-payment-summary").innerHTML = paymentSummaryHTML;
  // the backend is send 400 status , will solve this  later
  document.querySelector(".js-place-order").addEventListener("click", async () => {
    try {
   const response = await fetch("https://supersimplebackend.dev/orders", {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(
        { cart: cart.cartItems }
      ),
    })
    cart.cartItems = []
    cart.saveToLocalStorage.call(cart)
    updateCartQuantity(cart.cartItems)
    renderOrderSummary(cart.cartItems)
    renderCheckoutHeader(cart.cartItems)
    window.location.href = "orders.html"
    const order = await response.json() // use await because parsing the response body into JSON takes time ,if you don't use await, response.json() returns a Promise, not the actual data.
    addOrder(order)
  }
  catch {
    console.log('Unexpected error! Try again later.')  // will make element for show this to page 
  }
  });
}
