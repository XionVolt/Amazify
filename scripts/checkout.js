import { renderOrderSummary } from "./checkout/orderSummary.js";
import { paymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts } from "../data/products.js";
import renderCheckoutHeader from "./checkout/checkoutHeader.js";
import { cart } from "../data/cart.js";

Promise.all([
  new Promise((resolve) => {
    loadProducts(() => {
      resolve(); 
    });
  })
])
  .then(() => {
    renderOrderSummary();
    paymentSummary();
  })

renderCheckoutHeader(cart.cartItems);
