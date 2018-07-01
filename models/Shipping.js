const mongoose = require("mongoose");
const { Schema } = mongoose;

const shippingSchema = new Schema({
  stripe_order_id: String,
  shippo_object_id: String
});

mongoose.model("shipping", shippingSchema);
