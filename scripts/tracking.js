import dayjs from "https://cdn.skypack.dev/dayjs";
import { updateCartQuantity } from "../scripts/utils/updateQuantity.js";
import { orders } from "../data/orders.js";
import { cart } from "../data/cart.js";
import { loadProducts,getProduct } from "../data/products.js";

if (window.location.pathname === "/tracking.html") {
  document.querySelector(".js-cart-quantity").innerHTML =
    updateCartQuantity(cart.cartItems) || "";

  let mainElement = document.querySelector(".main");
  let windowUrl = new URL(window.location);

  async function renderProductTrackingGrid() {
    const orderIdSearch = windowUrl.searchParams.get("orderId");
    const productIdSearch = windowUrl.searchParams.get("productId");

    const SearchedOrder = orders.find((order) => order.id === orderIdSearch);
    const SearchedProduct = SearchedOrder.products.find(
      (product) => product.productId === productIdSearch
    );
    await loadProducts(()=>{})
    const ProductToDisplay  = getProduct(productIdSearch)

    
    // progressbar_logic
    const currentTime = Number(new dayjs().format('dddd, MMMM D').split(' ').at(-1))
    const orderTime =  Number(SearchedOrder.orderTime.split('T')[0].split('-').at(-1));
    const DeliveryTime = Number(SearchedProduct.estimatedDeliveryTime.split('T')[0].split('-').at(-1));

    const Progress_bar_progress = ((currentTime - orderTime)  / (DeliveryTime - orderTime)) * 100

    let contentToAdd = `
        <div class="order-tracking">
          <a class="back-to-orders-link link-primary" href="orders.html">
            View all orders
          </a>
  
          <div class="delivery-date">
            Arriving on ${dayjs(SearchedProduct.estimatedDeliveryTime.split('T')[0]).format('dddd, MMMM D')}
          </div>
  
          <div class="product-info">
            ${ProductToDisplay.name}
          </div>
  
          <div class="product-info">
            Quantity: ${SearchedProduct.quantity}
          </div>
  
          <img class="product-image" src="${ProductToDisplay.image}">
  
          <div class="progress-labels-container">
            <div class="progress-label">
              Preparing
            </div>
            <div class="progress-label current-status">
              Shipped
            </div>
            <div class="progress-label">
              Delivered
            </div>
          </div>
  
          <div class="progress-bar-container">
            <div class="progress-bar"></div>
          </div>
        </div>`;
    mainElement.innerHTML = contentToAdd;
    console.log()

    const ProgressBar = document.querySelector('.progress-bar')
    setTimeout(() => {
      ProgressBar.style.width = `${Progress_bar_progress}%`;
    }, 2);
  
   
  }
  renderProductTrackingGrid();
}