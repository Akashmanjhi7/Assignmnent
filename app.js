require('dotenv').config();
const express = require('express');
const connectDB = require('./db/db');

const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');

const app = express();
connectDB();

app.use(express.json());

// Routes
app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
