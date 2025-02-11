import dayjs from "https://cdn.skypack.dev/dayjs";
import { formatCurrency } from '../scripts/utils/money.js';
import { loadProducts, getProduct } from "./products.js";
import { updateCartQuantity } from "../scripts/utils/updateQuantity.js";
import { cart } from "./cart.js";

// loadProducts 

export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(order) {
  orders.unshift(order);
  saveToStorage();
}

function saveToStorage() {
  localStorage.setItem('orders', JSON.stringify(orders));
}

async function renderOrderGrid() {
  const orderGrid = document.querySelector('.js-orders-grid');
  let orderContainer = "";

  await loadProducts(() => {}); // Ensure products are loaded before processing orders

  orders.forEach((order) => {
    let allProducts = ``;
    order.products.forEach((product) => {
      const matchedProduct = getProduct(product.productId);
      allProducts += `
        <div class="product-image-container">
          <img src="${matchedProduct.image}">
        </div>
        <div class="product-details">
          <div class="product-name">
            ${matchedProduct.name}
          </div>
          <div class="product-delivery-date">
            Arriving on: ${dayjs(product.estimatedDeliveryTime.split('T')[0]).format('MMMM D')}
          </div>
          <div class="product-quantity">
            Quantity: ${product.quantity}
          </div>
          <button class="buy-again-button button-primary js-buy-again-button" data-product-id=${product.productId}>
            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message js-bu">Buy it again</span>
          </button>
        </div>
        <div class="product-actions">
          <a href="tracking.html">
            <button class="track-package-button button-secondary">
              Track package
            </button>
          </a>
        </div>
      `;
    });

    orderContainer += `
      <div class="order-container">
        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>${dayjs(order.orderTime.split('T')[0]).format('MMMM D')}</div>
            </div>
            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>$${formatCurrency(order.totalCostCents)}</div>
            </div>
          </div>
          <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${order.id}</div>
          </div>
        </div>
        <div class="order-details-grid">
          ${allProducts} <!-- Insert allProducts here -->
        </div>
      </div>
    `;
  });

  orderGrid.innerHTML = orderContainer;
}

if (window.location.pathname === '/orders.html') {
  async function runStepByStep(params) {
    

  await  renderOrderGrid();
  document.querySelector('.js-cart-quantity').innerHTML = updateCartQuantity(cart.cartItems) || ''

  const All_buy_again_buttons = document.querySelectorAll('.js-buy-again-button');

  All_buy_again_buttons.forEach((button)=>{
    button.addEventListener('click',()=>{
      const { productId } = button.dataset;
      console.log(button.dataset)
      button.classList.add('added-to-cart')
      if (!Array(button.classList).includes('added-to-cart') ) {
        button.innerHTML = '✓ Added'
        console.log(productId)
       const timer =  setTimeout(()=> {
            button.innerHTML = ''
            button.insertAdjacentHTML('afterbegin','<img class="buy-again-icon" src="images/icons/buy-again.png">')
            button.insertAdjacentHTML('beforeend','<span class="buy-again-message js-bu">Buy it again</span>')
        },1200)

        cart.addToCart(productId);
        document.querySelector('.js-cart-quantity').innerHTML = updateCartQuantity(cart.cartItems) || ''
        button.addEventListener("click", () => {
          clearTimeout(timer);
        });
      }

    })
  })

}
  runStepByStep()
}