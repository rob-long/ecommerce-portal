const keys = require("../config/keys");
var stripe = require("stripe")(keys.stripeSecretKey);
const requireLogin = require("../middlewares/requireLogin");

module.exports = app => {
  // create charge
  app.post("/api/stripe", requireLogin, async (req, res, next) => {
    if (!req.user) {
      return res.status(401).send({ error: "You must be logged in" });
    }

    console.log("token", req.body.token.id);
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
};
