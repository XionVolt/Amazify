import { cart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import formatCurrency from "../utils/money.js";
import { updateCartQuantity } from "../utils/updateQuantity.js";

export function paymentSummary() {
  let productPriceCents = 0;
  let shippingPriceCents = 0;
  let paymentSummaryHTML;
  if (cart.length === 0) {
    cart.push({ quantity: 0 });
  }
  cart.forEach((cartItem) => {
    if (cart.length > 0 && cartItem.quantity) {
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
            <div>Items (${updateCartQuantity(cart)}):</div>
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

          <button class="place-order-button button-primary">
            Place your order
          </button>
       `;
  });
  document.querySelector(".js-payment-summary").innerHTML = paymentSummaryHTML;
}
