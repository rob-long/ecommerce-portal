const keys = require("../config/keys");
var stripe = require("stripe")(keys.stripeSecretKey);
var shippo = require("shippo")(keys.shippoSecretKey);
const requireLogin = require("../middlewares/requireLogin");

const mongoose = require("mongoose");
require("../models/Shipping");
const Shipping = mongoose.model("shipping");

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

  app.get("/api/stripe/orders/:id", requireLogin, async (req, res, next) => {
    if (!req.user) {
      return res.status(401).send({ error: "You must be logged in" });
    }
    try {
      const list = await stripe.orders.retrieve(req.params.id);
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

  app.get("/api/shippo/:id", async (req, res, next) => {
    const transaction = await shippo.transaction.retrieve(req.params.id);
    res.send(transaction);
  });

  // single label shipping
  app.post("/api/shippo", async (req, res, next) => {
    console.log("why am i here");
    try {
      const order = await stripe.orders.retrieve(req.body.order_id);

      var addressFrom = {
        name: "Shawn Ippotle",
        street1: "215 Clayton St.",
        city: "San Francisco",
        state: "CA",
        zip: "94117",
        country: "US",
        phone: "+1 555 341 9393",
        email: "shippotle@goshippo.com"
      };

      var addressTo = {
        name: "Mr Hippo",
        street1: "1801 East Chestnut Ave",
        city: "Santa Ana",
        state: "CA",
        zip: "92701",
        country: "US",
        email: "mrhippo@goshippo.com"
      };

      var parcel = {
        length: "5",
        width: "5",
        height: "5",
        distance_unit: "in",
        weight: "2",
        mass_unit: "lb"
      };

      shippo.shipment.create(
        {
          address_from: addressFrom,
          address_to: addressTo,
          parcels: [parcel],
          async: false
        },
        function(err, shipment) {
          // asynchronously called
          // Get the first rate in the rates results.
          // Customize this based on your business logic.
          var rate = shipment.rates[0];

          // Purchase the desired rate.
          shippo.transaction.create(
            {
              rate: rate.object_id,
              label_file_type: "PDF",
              async: false
            },
            function(err, transaction) {
              const shipping = new Shipping({
                stripe_order_id: req.body.order_id,
                shippo_object_id: transaction.object_id
              });
              shipping.save();

              stripe.orders.update(req.body.order_id, {
                status: "fulfilled",
                metadata: {
                  tracking_url_provider: transaction.tracking_url_provider
                },
                shipping: {
                  carrier: "USPS",
                  tracking_number: transaction.tracking_number
                }
              });
              res.send({ url: transaction.tracking_url_provider });
            }
          );
        }
      );
    } catch (error) {
      console.log(error);
    }
    return;
  });
};
