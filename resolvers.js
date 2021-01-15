const inventory = require('./model/inventory');
const promotion = require('./model/promotion');

let resolvers = {
  inventories: inventory,
};

resolvers.totalPrice = (args) => {
  const {sku} = args;

  let checkoutItems = [];
  sku.forEach((s) => {
    const item = inventory.find((i) => {
      i.counted = false;
      return s === i.sku;
    });
    checkoutItems.push(JSON.parse(JSON.stringify(item)));
  })

  let sumPrice = 0;
  promotion.calculateBundleItems(checkoutItems);
  checkoutItems.forEach((item) => {
    sumPrice += item.price;
  });
  return parseFloat(sumPrice).toFixed(2);
};

module.exports = resolvers;