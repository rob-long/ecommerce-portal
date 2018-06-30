const keys = require("../config/keys");
var stripe = require("stripe")(keys.stripeSecretKey);
const requireLogin = require("../middlewares/requireLogin");

module.exports = app => {
  // create charge and increase credits
  app.post("/api/stripe", requireLogin, async (req, res, next) => {
    if (!req.user) {
      return res.status(401).send({ error: "You must be logged in" });
    }
    try {
      const charge = await stripe.charges.create({
        amount: 500,
        currency: "usd",
        description: "$5 for 5 credits",
        source: req.body.token.id
      });
    } catch (e) {
      console.log(e);
    }
    req.user.credits += 5;
    const user = await req.user.save();
    res.send(user);
  });

  // list orders
  app.get("/api/stripe/orders", requireLogin, async (req, res, next) => {
    if (!req.user) {
      return res.status(401).send({ error: "You must be logged in" });
    }
    try {
      const list = await stripe.orders.list({});
      res.send(list);
    } catch (e) {
      console.log(e);
    }
  });

  // list products
  app.get("/api/stripe/products", async (req, res, next) => {
    try {
      const list = await stripe.products.list({});
      res.send(list);
    } catch (e) {
      console.log(e);
    }
  });

  // create order and charge
  app.post("/api/stripe/order", requireLogin, async (req, res, next) => {
    try {
      const order = await stripe.orders.create({
        currency: "usd",
        email: req.user.email,
        items: [
          {
            type: "sku",
            parent: req.body.sku.id,
            quantity: 1
          }
        ],
        shipping: {
          name: req.body.token.email,
          address: {
            line1: "965 Mission St.",
            city: "San Francisco",
            state: "CA",
            postal_code: "94103",
            country: "US"
          }
        }
      });

      const charge = await stripe.orders.pay(order.id, {
        source: req.body.token.id
      });
      console.log(charge);
    } catch (error) {
      console.log(error);
    }
  });
};
