const keys = require("../config/keys");
var stripe = require("stripe")(keys.stripeSecretKey);
var shippo = require("shippo")(keys.shippoSecretKey);
const requireLogin = require("../middlewares/requireLogin");

const mongoose = require("mongoose");
require("../models/Shipping");
const Shipping = mongoose.model("shipping");
const BillingService = require("../services/Billing");

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
      const list = await stripe.orders.list({
        customer: req.user.stripeCustomer,
        limit: 100
      });
      console.log(list);
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
  // TODO: token does not update for existing customers
  app.post("/api/stripe/order", requireLogin, async (req, res, next) => {
    const token = req.body.token;

    try {
      let user;
      if (!req.user.stripeCustomer) {
        const customer = await stripe.customers.create({
          description: `Customer for ${req.user.email}`,
          source: token.id // obtained with Stripe.js
        });
        req.user.stripeCustomer = customer.id;
        user = await req.user.save();
      } else {
        user = req.user;
      }

      const order = await stripe.orders.create({
        customer: user.stripeCustomer,
        currency: "usd",
        email: user.email,
        items: [
          {
            type: "sku",
            parent: req.body.sku.id,
            quantity: 1
          }
        ],
        shipping: {
          name: token.card.name,
          address: {
            line1: token.card.address_line1,
            city: token.card.address_city,
            state: token.card.address_state,
            postal_code: token.card.address_zip,
            country: token.card.country
          }
        }
      });

      const charge = await stripe.orders.pay(order.id, {
        customer: user.stripeCustomer
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
    try {
      const order = await stripe.orders.retrieve(req.body.order_id);
      console.log(order);

      var addressFrom = BillingService.addressFrom;

      var addressTo = {
        name: order.shipping.name,
        street1: order.shipping.address.line1,
        city: order.shipping.address.city,
        state: order.shipping.address.state,
        zip: order.shipping.address.postal_code,
        country: order.shipping.address.country,
        email: order.email
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
