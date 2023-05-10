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
    const sidesPrices = selectedSides.map((selectedSide) => sides[selectedSide]);
    const sidesTotal = sidesPrices.reduce((acc, next) => acc += next);
    return (sidesTotal + pizzaPrice).toFixed(2);
  }

  return pizzaPrice.toFixed(2);

}

module.exports = {
  orderTotal
}