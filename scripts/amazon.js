// Load the products from the products.js file
import { cart , addToCart } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
import { updateCartQuantity } from "./utils/updateQuantity.js";
let productsGrid = document.querySelector(".js-products-grid");
let productsHtml = "";
products.forEach((product) => {
  let div = document.createElement("div");
  // const ratingStars = '';
  productsHtml += `
            <div class="product-container">
            <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src= "images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
                ${product.rating.count} 
            </div>
          </div>

          <div class="product-price">
            $${formatCurrency(product.priceCents)}
          </div>

          <div class="product-quantity-container ">
            <select class = "js-quantity-selector-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id=${product.id}>
            Add to Cart
          </button>
        </div>`;
});
productsGrid.innerHTML += productsHtml;

  // updating the cart image number function

// all add to cart buttons
let allAddToCartButtons = document.querySelectorAll(".js-add-to-cart");
// adding event listener to all add to cart buttons
allAddToCartButtons.forEach((button) => {
  const { productId } = button.dataset; // getting the product id
  // the opacity of add to cart (when we click) becomes 1 from 0 
  const addedToCartMessage = document.querySelector(`.js-added-to-cart${productId}`); // getting the added to cart message element
  button.addEventListener("click", () => {
    addedToCartMessage.classList.add("added-to-cart-appear");
    addedToCartMessage.classList.remove("added-to-cart-disappear");
    let timer = setTimeout(() => {
      addedToCartMessage.classList.add("added-to-cart-disappear");
      addedToCartMessage.classList.remove("added-to-cart-appear");
    }, 1000);

    button.addEventListener("click", () => {
      clearTimeout(timer);
    });
    // pushing the product to the cart array
    addToCart(productId);
    
    // updating the cart image number
    document.querySelector(".cart-quantity")
        .innerHTML = updateCartQuantity(cart);

  });
});

window.addEventListener("load", () => {
  if (cart.length === 0) {
    document.querySelector(".cart-quantity").innerText = " ";
  }
  else {
    document.querySelector(".cart-quantity")
        .innerHTML = updateCartQuantity(cart);
  }
});

