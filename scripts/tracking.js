import { updateCartQuantity } from "../scripts/utils/updateQuantity.js";
import { cart } from "../data/cart.js";


if (window.location.pathname==='/orders.html')
document.querySelector(".js-cart-quantity").innerHTML = updateCartQuantity(
  cart.cartItems
);
// file in progress ...