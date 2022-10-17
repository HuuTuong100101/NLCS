require('dotenv').config();
const port = process.env.PORT;
const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./config/db');
const route = require('./routes/routes');

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('uploads'));

// database connect
db.connect();

// Routes
app.use('/admin/shoe', route);

app.listen(port, () => { console.log(`Server is running on port ${port}`) });