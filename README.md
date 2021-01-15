# GraphQL Checkout App

### Tech

Uses a number of open source projects to work properly:

* [NodeJs](https://nodejs.org/en/)
* [ExpressJS](https://expressjs.com/)
* [GraphQL](https://graphql.org/)
### Installation

requires [Node.js](https://nodejs.org/) v14+ to run.

Install the dependencies and start the server.

```sh
$ cd checkout
$ npm install
$ node server
```
Open http://localhost:4000/ on browser, it will show a GraphiQL UI to query

### Example Input:

To list all inventories:
```
{
  inventories {
        sku
        name
        price
  }
}
```

To see total price:
```
{
    totalPrice(sku: ["A304SD", "A304SD", "A304SD"])
}
```

License
----

MIT
