import { updateCartQuantity } from "../utils/updateQuantity.js";
function renderCheckoutHeader (cart) {
    if (updateCartQuantity(cart) <= 1) {
     document.querySelector('.js-return-to-home-link').innerHTML = `${updateCartQuantity(cart)} item`;
    }
    else {
     document.querySelector('.js-return-to-home-link').innerHTML = `${updateCartQuantity(cart)} items`;
    }
}
export default renderCheckoutHeader;