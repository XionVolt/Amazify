/* Some Important Methods */
/* 1. `jasmine.objectContaining()` :  is a matcher in Jasmine that is used to check if an object contains a subset of properties. It allows you to verify that an object has specific key-value pairs without needing to match the entire object.
    When you use `jasmine.objectContaining()`, you can specify only the properties you care about, and Jasmine will check if those properties exist in the actual object:
Usage: 
jasmine.objectContaining is typically used in expect statements to assert that an object contains certain properties.

Syntax: 
expect(actual).toEqual(jasmine.objectContaining(expected));
actual: The object you are testing.
expected: An object containing the key-value pairs you expect to be present in the actual object

 Now , Why the Error Occurs if we not use `jasmine.objectContaining()` ? 
--> Exact Match Requirement: When using toEqual without `jasmine.objectContaining()`, Jasmine requires an exact match between the expected and actual objects. Any additional properties or differences in the object structure will cause the test to fail.
--> Type Differences(this is the main issue our test was failing without `jasmine.objectContaining()`): If the actual object is an instance of a class (e.g., Product), and the expected object is a plain object, the test will fail because their types do not match.

2. expect().toContain() : is a matcher in Jasmine that is used to check if an array or string contains a specific value. It allows you to verify that an array or string contains a specific element or substring. So instead of checking all values present in the array/string (in correct order) with `.toEqual()`, you can go for `.toContain()` to check if the expected values are present atleast , in the given array or string. 

 */


import { Product, Clothing, Appliance } from "../../data/products.js";

// Test for Product class
describe('product suit', () => {
describe("Product class", () => {
    let newProduct;
    beforeEach(() => {
     newProduct = new Product("1",  "images/products/product1.jpg", "product1", { stars: 4.5, count: 100 }, 1000);
    })
  it("should create a new product object", () => {
    expect(newProduct).toEqual(jasmine.objectContaining({
      id: "1",
      image: "images/products/product1.jpg",
      name: "product1",
      rating: { stars: 4.5, count: 100 },
      priceCents: 1000
    }));
    
  });


  it ("methods-test" ,  () =>  {
  
  expect(newProduct.getStatsUrl()).toEqual(`images/ratings/rating-${newProduct.rating.stars * 10}.png`);

expect(newProduct.getPrice()).toEqual("$10.00");

expect(newProduct.extraInfo()).toEqual('');
  });

});

describe("Clothing class", () => {
    let newClothing;
    beforeEach(() => {
      newClothing  = new Clothing('xyz.sizechartlink',"2", "images/products/product2.jpg", "product2", { stars: 4.5, count: 100 }, 1750);
    })
  it("should create a new clothing object", () => {

    expect(newClothing).toEqual(jasmine.objectContaining({
      sizeChartLink: 'xyz.sizechartlink',
      id: "2",
      image: "images/products/product2.jpg",
      name: "product2",
      rating: { stars: 4.5, count: 100 },
      priceCents: 1750,
    }));
  });

  it ("methods-test" ,  () =>  {
    expect(newClothing.getStatsUrl()).toEqual(`images/ratings/rating-${newClothing.rating.stars * 10}.png`);
  
  expect(newClothing.getPrice()).toEqual("$17.50");
  
  expect(newClothing.extraInfo()).toContain(`<a href="${newClothing.sizeChartLink}" target="_blank">Size Chart</a>`);
});
  

});

describe("Appliance class", () => {
  let newAppliance;
  beforeEach(() => {
    newAppliance = new Appliance('xyz.instructionlink','xyz.warrantylink',"3", "images/products/product3.jpg", "product3", { stars: 4.5, count: 100 }, 1000);
  });

  it("should create a new appliance object", () => {
    expect(newAppliance).toEqual(jasmine.objectContaining({
      instructionLink: 'xyz.instructionlink',
      warrantyLink: 'xyz.warrantylink',
      id: "3",
      image: "images/products/product3.jpg",
      name: "product3",
      rating: { stars: 4.5, count: 100 },
      priceCents: 1000
    }));
  });

  it("methods-test", () => {
    expect(newAppliance.getStatsUrl()).toEqual(`images/ratings/rating-${newAppliance.rating.stars * 10}.png`);
    expect(newAppliance.getPrice()).toEqual("$10.00");
    expect(newAppliance.extraInfo()).toContain(`<a href="${newAppliance.instructionLink}" target="_blank">Instructions</a>  <a href="${newAppliance.warrantyLink}" target="_blank">Warranty</a>`);
  });
});
});