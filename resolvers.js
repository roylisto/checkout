const inventory = require('./model/inventory');
const promotion = require('./model/promotion');

let resolvers = {
  inventories: inventory,
};

resolvers.totalPrice = (args) => {
  const {sku} = args;
  const checkoutItems = inventory.filter((i) => {
    i.counted = false;
    return sku.indexOf(i.sku) > -1;
  });

  let sumPrice = 0;
  promotion.calculateBundleItems(checkoutItems);
  checkoutItems.forEach((item) => {
    sumPrice += item.price;
  });
  return parseFloat(sumPrice).toFixed(2);
};

module.exports = resolvers;