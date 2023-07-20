const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const authRoute = require('./routes/auth-router');

const app = express();
const PORT = process.env.PORT || 5000;
const db_url = process.env.DB_URL;

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use('/api',authRoute);

const start = async () => {
    try {
        await mongoose.connect(db_url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(
            app.listen(PORT, console.log(`Server was start  on port: ${PORT}`))
        );
    } catch (error) {
        console.log(error)
    }
}

start();