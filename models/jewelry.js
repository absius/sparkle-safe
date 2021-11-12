const { Schema, model } = require("mongoose");

const JewelrySchema = new Schema({
  jewelryName: {
    type: String,
    required: true,
    trim: true,
  },

  description: {
    type: String,
    required: true,
    trim: true,
  },
  jewelryPrice: {
    type: String,
    required: "Price is required",
    trim: true,
  },
  assessedValue: {
    type: String,
    trim: true,
  },
  jewelryAssessor: {
    type: String,
    trim: true,
  },
  purchasedDate: {
    type: Date,
  },
  jewelryWarranty: {
    type: Date,
  },
  serviceDate: {
    type: Date,
  },
  jewelryPhoto: {
    type: Schema.Types.ObjectId,
    ref: "Image",
  },
  receiptPhoto: {
    type: Schema.Types.ObjectId,
    ref: "Image",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
