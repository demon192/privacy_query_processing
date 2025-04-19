const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/User");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect MongoDB
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Privacy-preserving query processing (mock logic)
function processQuery(queryStr) {
  const [key, value] = queryStr.split("=");
  if (!key || !value) return {};

  // Only allow safe fields (simulate protection)
  const allowedFields = ["age", "gender", "location"];
  if (!allowedFields.includes(key.trim())) return {};

  return { [key.trim()]: value.trim() };
}

// Routes
app.post("/query", async (req, res) => {
  const queryObj = processQuery(req.body.query);
  if (!queryObj || Object.keys(queryObj).length === 0)
    return res.status(400).json({ error: "Invalid query" });

  try {
    const users = await User.find(queryObj).select(
      "-_id pseudonym age gender location"
    );
    res.json({ results: users });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Seed demo users
app.get("/seed", async (req, res) => {
  await User.deleteMany({});
  await User.insertMany([
    { pseudonym: "UserA", age: 25, gender: "M", location: "Delhi" },
    { pseudonym: "UserB", age: 30, gender: "F", location: "Mumbai" },
    { pseudonym: "UserC", age: 25, gender: "F", location: "Delhi" },
  ]);
  res.send("Seeded");
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
