const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Transaction = require("../models/Transaction");
const calculateRisk = require("../utils/risk");


// 🔹 GET TRANSACTIONS
router.get("/transactions", async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ date: 1 });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
});

// 🔹 GET BALANCE TOTALS
router.get("/balance", async (req, res) => {
  try {
    const transactions = await Transaction.find();
    let totalTransferred = 0;
    let totalCoins = 0;
    let spendableCoins = 0;
    let lockedCoins = 0;

    transactions.forEach(tx => {
      totalTransferred += tx.amount;
      totalCoins += tx.totalCoins;
      spendableCoins += tx.spendableCoins;
      lockedCoins += tx.lockedCoins;
    });

    res.json({
      totalTransferred,
      totalCoins,
      spendableCoins,
      lockedCoins
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch balance" });
  }
});

// 🔹 SEED INITIAL DATA
router.post("/seed", async (req, res) => {
  try {
    await Transaction.deleteMany({}); // Clear existing

    const mockData = [
      {
        transferFrom: { name: "Amit J.", bank: "Axis" },
        transferTo: { merchant: "Flipkart" },
        amount: 6132, riskScore: 15, totalCoins: 850, spendableCoins: 723, lockedCoins: 127, status: "Clean"
      },
      {
        transferFrom: { name: "Sneha P.", bank: "ICICI" },
        transferTo: { merchant: "Myntra" },
        amount: 16864, riskScore: 44, totalCoins: 1200, spendableCoins: 672, lockedCoins: 528, status: "Review"
      },
      {
        transferFrom: { name: "Neha T.", bank: "SBI" },
        transferTo: { merchant: "BigBasket" },
        amount: 32437, riskScore: 59, totalCoins: 1000, spendableCoins: 410, lockedCoins: 590, status: "High risk"
      },
      {
        transferFrom: { name: "Rohit D.", bank: "HDFC" },
        transferTo: { merchant: "Amazon" },
        amount: 12202, riskScore: 4, totalCoins: 750, spendableCoins: 720, lockedCoins: 30, status: "Clean"
      },
      {
        transferFrom: { name: "Sneha P.", bank: "ICICI" },
        transferTo: { merchant: "Swiggy" },
        amount: 36, riskScore: 48, totalCoins: 400, spendableCoins: 208, lockedCoins: 192, status: "Review"
      }
    ];

    await Transaction.insertMany(mockData);
    res.json({ message: "Database seeded successfully with 5 transactions" });
  } catch (error) {
    res.status(500).json({ error: "Failed to seed database" });
  }
});

module.exports = router;