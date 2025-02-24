import formatCurrency from "../scripts/utils/money.js";

export class Product {
  constructor(id, image, name, rating, priceCents,keywords) {
    this.id = id;
    this.image = image;
    this.name = name;
    this.rating = rating;
    this.priceCents = priceCents;
    this.keywords = keywords
  }

  getStatsUrl() {
    return `images/ratings/rating-${this.rating.stars * 10}.png`;
  }

  getPrice() {
    return `$${formatCurrency(this.priceCents)}`;
  }
  extraInfo() {
    return "";
  }
}

// all classes

export class Clothing extends Product {
  constructor(sizeChartLink, id, image, name, rating, priceCents,keywords) {
    super(id, image, name, rating, priceCents,keywords);
    this.sizeChartLink = sizeChartLink;
  }
  extraInfo() {
    return `<a href="${this.sizeChartLink}" target="_blank">Size Chart</a>`;
  }
}

export class Appliance extends Product {
  constructor(
    instructionLink,
    warrantyLink,
    id,
    image,
    name,
    rating,
    priceCents,
    keywords
  ) {
    super(id, image, name, rating, priceCents,keywords);
    this.instructionLink = instructionLink;
    this.warrantyLink = warrantyLink;
  }
  extraInfo() {
    return `<a href="${this.instructionLink}" target="_blank">Instructions</a>  <a href="${this.warrantyLink}" target="_blank">Warranty</a>`;
  }
}

// products array
export let products = [];

export async function loadProducts(func) {
  const response = await fetch("https://supersimplebackend.dev/products")
      const data = await response.json()
    products = await data.map((Item) => {
      // console.log(Item.keywords)
      if (Item.type === "clothing") {
          return new Clothing(
            Item.sizeChartLink,
            Item.id,
            Item.image,
            Item.name,
            Item.rating,
            Item.priceCents,
            Item.keywords
      )} else if (Item.type === "appliance") {
          return new Appliance(
            Item.instructionLink,
            Item.warrantyLink,
            Item.id,
            Item.image,
            Item.name,
            Item.rating,
            Item.priceCents,
            Item.keywords

          );
        } else {
          return new Product(
            Item.id,
            Item.image,
            Item.name,
            Item.rating,
            Item.priceCents,
            Item.keywords
          );
        }
      });
      func();
    }





//  for now we are styling error element in here , if we scale the project put it in css file
export function displayErrorMessage(message) {
  const errorContainer = document.createElement("div");
  errorContainer.style.textAlign = "center";
  errorContainer.style.fontFamily = "Monospace";
  errorContainer.style.fontSize = "1.5em";
  errorContainer.style.color = "#ff0000";
  errorContainer.style.marginTop = "20px";
  errorContainer.style.padding = "10px";
  errorContainer.style.border = "1px solid #ff0000";
  errorContainer.style.borderRadius = "5px";
  errorContainer.style.backgroundColor = "#ffe6e6";
  errorContainer.style.maxWidth = "600px";
  errorContainer.style.margin = "20px auto";
  errorContainer.innerText = `Error: ${message} !`;
  document.body.appendChild(errorContainer);
  if (document.body.className === "js-checkout-body") {
    errorContainer.style.setProperty("margin-inline", "auto");
    errorContainer.style.setProperty("margin-top", "-240px");
    errorContainer.innerText = `Error: ${message} !`;
  }
}

// get corresponding product by id
export function getProduct(productId) {
  return products.find((product) => product.id === productId);
}
