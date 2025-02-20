// Load the products from the products.js file
import { cart } from "../data/cart.js";
import { products, loadProducts } from "../data/products.js";
import { updateCartQuantity } from "./utils/updateQuantity.js";

let productsGrid = document.querySelector(".js-products-grid");
let productsHtml = "";

const homePageUrl = new URL(window.location);

loadProducts(renderProductsGrid);

export function renderProductsGrid() {
  products.forEach((product) => {
    if (homePageUrl.searchParams.has("search")) {
      let searchParam = homePageUrl.searchParams.get("search").trim();
      let searchWords = searchParam.split(/\s+/); // Split search term into individual words
      let regexPattern = searchWords
        .map((word) => {
          let singular = word.replace(/s$/, ""); // Remove trailing 's' for singular form
          let plural = word.endsWith("s") ? word : word + "s"; // Add 's' for plural form
          return `(${singular}|${plural})`;
        })
        .join("|"); // Append .* to each word and join with |
      let regex = new RegExp(regexPattern, "i"); // basically second argument contains flag in RegExp
      if (!regex.test(product.name)) {
        return;
      }
    }
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
              src= "${product.getStatsUrl()}">
            <div class="product-rating-count link-primary">
                ${product.rating.count} 
            </div>
          </div>

          <div class="product-price">
            ${product.getPrice()}
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

          ${product.extraInfo()}

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id=${
            product.id
          }>
            Add to Cart
          </button>
        </div>`;
  });
  productsGrid.innerHTML += productsHtml;

  if (!productsHtml) {
    productsGrid.innerHTML += `<div class="empty-results-message" data-testid="empty-results-message">
          No products matched your search.
        </div>`;
  }
  // all add to cart buttons
  let allAddToCartButtons = document.querySelectorAll(".js-add-to-cart");
  // adding event listener to all add to cart buttons
  allAddToCartButtons.forEach((button) => {
    const { productId } = button.dataset; // getting the product id
    // the opacity of add to cart (when we click) becomes 1 from 0
    const addedToCartMessage = document.querySelector(
      `.js-added-to-cart${productId}`
    ); // getting the added to cart message element
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
      cart.addToCart(productId);

      // updating the cart image number
      document.querySelector(".cart-quantity").innerHTML = updateCartQuantity(
        cart.cartItems
      );

      // updating the checkout header
    });
  });
}

function searchBar() {
  const searchBar = document.querySelector(".js-search-bar");
  const searchButton = document.querySelector(".js-search-button");

  function onSearch() {
    searchBar.value
      ? homePageUrl.searchParams.set("search", searchBar.value)
      : homePageUrl.searchParams.delete("search"); // Update the search parameter
    window.location.href = homePageUrl.toString(); // Set the updated URL
  }

  searchButton.addEventListener("click", onSearch);
  searchBar.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      onSearch();
    }
  });
}

searchBar();
window.addEventListener("load", () => {
  if (cart.cartItems.length === 0) {
    document.querySelector(".cart-quantity").innerText = " ";
  } else {
    document.querySelector(".cart-quantity").innerHTML = updateCartQuantity(
      cart.cartItems
    );
  }
});
