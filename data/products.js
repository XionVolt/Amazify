import formatCurrency  from '../scripts/utils/money.js';


export class Product {
  constructor (id, image, name, rating, priceCents ) {
    this.id = id;
    this.image = image;
    this.name = name;
    this.rating = rating;
    this.priceCents = priceCents; 
  }

  getStatsUrl() {
    return `images/ratings/rating-${this.rating.stars * 10}.png`
  }

  getPrice() {
    return `$${formatCurrency(this.priceCents)}`;
  }
  extraInfo() {
    return '';
  }

}


// all classes

export class Clothing extends Product {
  constructor (sizeChartLink,id, image, name, rating, priceCents) {
    super(id, image, name, rating, priceCents);
    this.sizeChartLink = sizeChartLink;
  }
  extraInfo() {
    return `<a href="${this.sizeChartLink}" target="_blank">Size Chart</a>`;
  }
}

export class Appliance extends Product {
  constructor (instructionLink,warrantyLink,id, image, name, rating, priceCents) {
    super(id, image, name, rating, priceCents);
    this.instructionLink = instructionLink;
    this.warrantyLink = warrantyLink;
  }
  extraInfo() {
    return `<a href="${this.instructionLink}" target="_blank">Instructions</a>  <a href="${this.warrantyLink}" target="_blank">Warranty</a>`;
  }
  
}

// products array 
export let products = []


export function loadProducts(func) {
 const promise =  fetch('https://supersimplebackend.dev/products').then((response) => {
    
    return response.json(); 
  })
  .then((data) => {
    products =  data.map((Item) => {
      if (Item.type === "clothing") {
        return new Clothing(Item.sizeChartLink, Item.id, Item.image, Item.name, Item.rating, Item.priceCents);
      }
      else if (Item.type === "appliance") {
        return new Appliance(Item.instructionLink,Item.warrantyLink,Item.id, Item.image, Item.name, Item.rating, Item.priceCents);
      }
      else {
        return new Product(Item.id, Item.image, Item.name, Item.rating, Item.priceCents);
      }
    });
    
  }).then(() => {
    func()
  });

  return promise
}



// get corresponding product by id
export function getProduct(productId) {
   return products.find(product => product.id === productId);
}
