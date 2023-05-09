const { expect } = require("chai");
const { orderTotal } = require("../app/order-calculator");

describe("order total", () => {
  it("should return the total cost of the order - pizza and sides", () => {
    const selectedSides = ["Garlic Bread", "Cheesy Garlic Bread", "Fries"];

    expect(orderTotal(selectedSides)).to.be.eq('20.00');
  });

  it("should return the total cost of the order - pizza only", () => {
    const selectedSides = undefined;

    expect(orderTotal(selectedSides)).to.be.eq('10.00');
  });
});
