const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();

const cors = require("cors");
const paymentRoutes = require("./routes/payment");

app.use(cors());
app.use(express.json());

// Serve static frontend files from the public directory
app.use(express.static(path.join(__dirname, "public")));

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/secpay";
const PORT = process.env.PORT || 3000;

mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 2000 })
  .then(() => console.log("Connected to MongoDB database"))
  .catch(async (err) => {
    console.log("MongoDB not found at URI. Starting in-memory MongoDB fallback...");
    const { MongoMemoryServer } = require("mongodb-memory-server");
    const mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);
    console.log("Connected to in-memory MongoDB at", mongoUri);
  });

app.use("/", paymentRoutes);

// Catch-all route to serve index.html for any other requests (useful for SPA routing)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});