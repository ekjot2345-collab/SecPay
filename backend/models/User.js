const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  lockedRewards: { type: Number, default: 0 },
  unlockedRewards: { type: Number, default: 0 },
  riskScore: { type: Number, default: 0 }
});

module.exports = mongoose.model("User", userSchema);