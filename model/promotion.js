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
            checkoutItem.price = 0; // set 0 for related item in bundle
            qty--;
          }
        }
      })
    });
  });
  console.log(checkoutItems);
}

module.exports = {
  calculateBundleItems,
};