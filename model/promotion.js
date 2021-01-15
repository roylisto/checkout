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
      freeItems.push(item);
      const tmpFreeItem = freeItems.filter((i) => i.sku === item.sku && i.counted === false);
      if (tmpFreeItem.length % freeItem.minQty === 0) {
        for (let i=0; i < freeItem.free; i++) {
          tmpFreeItem[i].price = 0;
        }
        tmpFreeItem.forEach((t) => {
          t.counted = true;
        });
      }
    }
  });
}

const discount = [
  {
    sku: 'A304SD',
    minQty: 3,
    discount: 0.1,
  },
];

const calculateDiscountItems = (checkoutItems) => {
  let discountItems = [];
  checkoutItems = checkoutItems.filter((item) => item.counted === false);
  checkoutItems.forEach((item) => {
    const discountItem = discount.find((f) => f.sku === item.sku);
    if (discountItem) {
      discountItems.push(item);
      const tmpDiscountItem = discountItems.filter((i) => i.sku === item.sku && i.counted === false);
      if (tmpDiscountItem.length % discountItem.minQty === 0) {
        for (let i=0; i < tmpDiscountItem.length; i++) {
          tmpDiscountItem[i].price = tmpDiscountItem[i].price - (tmpDiscountItem[i].price * discountItem.discount);
        }
        tmpDiscountItem.forEach((t) => {
          t.counted = true;
        });
      }
    }
  });
}

module.exports = {
  calculateBundleItems,
  calculateFreeItems,
  calculateDiscountItems,
};