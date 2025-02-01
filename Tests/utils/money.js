/* Some Important terms */
// -->Test suit : A test suite is a collection of test cases that are intended to test a specific aspect of the code. A test suite may contain one or more test cases.
// -->Test case : A test case is a set of conditions which is used to determine whether a system under test works correctly.

/* Some Important methods */

// 1. describe block :  A describe block is a way to group tests in Jasmine. It takes two arguments: a string and a function. The string is the name of the test suite, and the function is the suite of tests(test-cases).
// 2. it block(Used to make Test Cases) : An it block is a way to make tests in Jasmine (we can make multiple tests in single describe block). It takes two arguments: a string and a function. The string is the name of the test, and the function is the test.


import formatCurrency  from "../../scripts/utils/money.js"

describe("money suit", () => {
    describe("first 2 tests", () => {

        // ** hooks are used to run some code before or after the test cases **

        // creating hooks 
        afterAll(() => {
            // Code Inside afterAll will run after all the test cases
        });
        beforeEach(() => {
            // Code Inside beforeEach will run before each test case
        });
        afterEach(() => {
            // Code Inside afterEach will run after each test case
        });

        it("first test", () => {
            spyOn(localStorage, "getItem").and.callFake(() => {
                return JSON.stringify([]);
            });

            
            localStorage.getItem("cart");
            expect(formatCurrency(1000)).toEqual("10.00");


            // we have to spy on the method , to use certain method like (toHaveBeenCalledTimes) , (toHaveBeenCalledWith) etc . 
            // expect(spyOn(localStorage , 'setItem').and.callFake(()=>{return packag})).toHaveBeenCalledTimes(1);
            expect(localStorage.getItem).toHaveBeenCalledTimes(1);
            // console.log(localStorage.setItem()) // mocked localstorage method `setitem` on line 13 , that's why it not work as expected
            spyOn(localStorage, "removeItem") // in 1st argument we have to pass the object and in 2nd argument we have to pass the method name of that object we wanna disa
            localStorage.removeItem("p"); // its like disabling removeItem method of localstorage
            spyOn(localStorage,'setItem')
            localStorage.setItem('cart',JSON.stringify([]));
            expect(localStorage.setItem).toHaveBeenCalledWith("cart", JSON.stringify([]));

            // check most recent call , on spyOn method 
            // example of most recent call
            expect(localStorage.setItem.calls.mostRecent().args).toEqual(["cart",JSON.stringify([])]);

        });
        
        it("second test", () => {
            expect(formatCurrency(2000)).toEqual("20.00");
            spyOn(localStorage , 'setItem');
            localStorage.setItem("cart", JSON.stringify([]));
        });
    })
    
    it("third test", () => {
        expect(formatCurrency(20000)).toEqual("200.00");

    });

    it ("fourth test", () => {
        expect(formatCurrency(-2000.4)).toEqual("-20.00");
    })
    beforeAll(() => {
        // Code Inside beforeAll will run before all the test cases
    });
    

});