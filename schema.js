const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type Inventory {
    sku: ID!,
    name: String,
    price: Float!,
    inventoryQty: Int!,
  }

  type Query {
    inventories: [Inventory],
    totalPrice(sku: [ID]): Float!,
  }
`);

module.exports = schema;