const bundles = [
  {
    mainSku: '43N23P',
    relatedItems: [
      {
        sku: '234234',
        qty: 1,
      },
    ],
  },
];

const calculateBundleItems = (checkoutItems) => {
  let bundleItems = [];
  checkoutItems = checkoutItems.filter((item) => item.counted === false);
  checkoutItems.forEach((item) => {
    const bundle = bundles.find((b) => b.mainSku === item.sku);
    if (bundle) {
      item.relatedItems = bundle.relatedItems;
      item.counted = true;
      bundleItems.push(item);
    }
  });
  bundleItems.forEach((item) => {
    item.relatedItems.forEach((relatedItem) => {
      let qty = relatedItem.qty;
      checkoutItems.forEach((checkoutItem) => {
        if (qty && !checkoutItem.counted) {
          if (checkoutItem.sku === relatedItem.sku) {
            checkoutItem.counted = true;
            checkoutItem.price = 0;
            qty--;
          }
        }
      })
    });
  });
};

const free = [
  {
    sku: '120P90',
    minQty: 3,
    free: 1,
  },
];

const calculateFreeItems = (checkoutItems) => {
  let freeItems = [];
  checkoutItems = checkoutItems.filter((item) => item.counted === false);
  checkoutItems.forEach((item) => {
    const freeItem = free.find((f) => f.sku === item.sku);
    if (freeItem) {
      item.counted = true;
      freeItems.push(item);
      const tmpFreeItem = freeItems.filter((i) => i.sku === item.sku);
      if (tmpFreeItem.length % freeItem.minQty === 0) {
        for (let i=0; i < freeItem.free; i++) {
          tmpFreeItem[i].price = 0;
        }
      }
    }
  });
  Object.assign(checkoutItems, freeItems);
}

module.exports = {
  calculateBundleItems,
  calculateFreeItems,
};