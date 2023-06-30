const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  shippingInfo: {
    address: {
      type: String,
      required: [true, "Address is Required"],
    },
    city: {
      type: String,
      required: [true, "City Name Is Reuqired"],
    },
    state: {
      type: String,
      required: [true, "State name is reuqired"],
    },
    country: {
      type: String,
      default: "India",
      required: [true, "State name is reuqired"],
    },
    pincode: {
      type: Number,
      minlength: 6,
    },
    phoneNo: {
      type: Number,
      maxlength: 10,
    },
  },
  orderItems: [
    {
      name: {
        type: String,
        required: [true, "name is reuqired"],
      },
      price: {
        type: Number,
        required: [true, "Price is reuqired"],
      },
      quantity: {
        type: Number,
        required: [true, "quantity reuqired"],
      },
      product: {
        type: mongoose.Schema.ObjectId,
        ref: "products",
        required: [true],
      },
    },
  ],

  user: {
    type: mongoose.Schema.ObjectId,
    ref: "users",
    required: [true, "user id requried"],
  },
  paymentInfo: {
    id: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },

  paidAt: {
    type: Date,
    required: true,
  },
  itemsPrice: {
    type: Number,
    default: 0,
    required: true,
  },
  taxPrice: {
    type: Number,
    default: 0,
    required: true,
  },
  shippingPrice: {
    type: Number,
    default: 0,
    required: true,
  },
  totalPrice: {
    type: Number,
    default: 0,
    required: true,
  },
  orderStatus: {
    type: String,
    required: true,
    default: "processing",
  },
  deliveredAt: Date,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});


module.exports = mongoose.model('orders',orderSchema)