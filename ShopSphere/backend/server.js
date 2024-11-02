require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const db = require('./config/db');
const authRouter = require('./routes/auth');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');

const app = express();
const PORT = process.env.PORT || 5000;
// cors
app.use(
    cors({
      origin: [
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:5175",
      ],
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    }),
  );

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRouter);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);

// Connect to MongoDB
db.connect();

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
