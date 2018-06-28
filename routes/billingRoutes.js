const keys = require("../config/keys");
var stripe = require("stripe")(keys.stripeSecretKey);
const requireLogin = require("../middlewares/requireLogin");

/*
module.exports = app => {
  app.post("/api/stripe", (req, res) => {
    console.log(req.body);
    stripe.charges.create({
      amount: 500,
      currency: "usd",
      description: "$5 for 5 credits",
      source: req.body.id
    });
    //res.send(req.user);
  });
};
*/

// refactored using async await
module.exports = app => {
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
};
