const pizzaPrice = 10;

const sides = {
    "Garlic Bread": 3,
    "Cheesy Garlic Bread": 3.5,
    "Fries": 3.5,
    "Potato Tots": 4,
    "BBQ Chicken Wings": 5.5,
    "Chicken Bites": 4.5,
};

function orderTotal(selectedSides) {
  if (selectedSides) {
    // TODO: calculate the total of the order
    // Step 1: get all individual prices of selected sides
    // Step 2: get total cost of sides
    // Step 3: add total cost of sides and pizza price and return in x.xx format
  }

  return pizzaPrice.toFixed(2);
}

module.exports = {
  orderTotal
}
