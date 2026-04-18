const mongoose = require("mongoose");

const txSchema = new mongoose.Schema({
  transferFrom: {
    name: String,
    bank: String
  },
  transferTo: {
    merchant: String
  },
  amount: Number,
  riskScore: Number,
  totalCoins: Number,
  spendableCoins: Number,
  lockedCoins: Number,
  status: { type: String, default: "Clean" },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Transaction", txSchema);