function updateButton(removeFromCart, renderCheckoutHeader, paymentSummary, saveToLocalStorage, cart) {
  function updateBtnEvClback(button, productId) {
    let input = document.querySelector(`.js-new-quantity-input-${productId}`);
    let quantityLabel = document.querySelector(`.js-quantity-label-${productId}`);
    if (button.innerHTML.trim() === "Update") {
      button.innerHTML = "Save";
      quantityLabel.hidden = true;
      input.hidden = false;
      input.focus();
    } else {
      quantityLabel.hidden = false;
      quantityLabel.innerHTML = input.value;
      if (input.value == 0) {
        removeFromCart.call(cart, productId); // Ensure correct context
        saveToLocalStorage.call(cart); // Ensure correct context
        document.querySelector(`.js-cart-item-container-${productId}`).remove();
        renderCheckoutHeader(cart.cartItems);
        paymentSummary();
        return;
      }
      input.hidden = true;
      button.innerHTML = "Update";

      cart.cartItems.find((product) => product.productId === productId).quantity = input.value;
      saveToLocalStorage.call(cart); // Ensure correct context
      renderCheckoutHeader(cart.cartItems);
      paymentSummary();
    }
  }

  // Setting event listener on all update buttons
  document.querySelectorAll(".update-quantity-link").forEach((button) => {
    const { productId } = button.dataset; // Getting the product id
    // Adding event listener to all update buttons
    button.addEventListener("click", () => {
      updateBtnEvClback(button, productId);
    });
    document.querySelector(`.js-cart-item-container-${productId}`).addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        updateBtnEvClback(button, productId);
      }
    });
  });
}

export default updateButton;