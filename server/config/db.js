const mongoose = require('mongoose');
require('dotenv').config();

const db_uri = process.env.DB_URI;

async function connect () {
    try {
        await mongoose.connect(db_uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected database !');
    } catch (error) {
        console.log(error);
    }
};

module.exports = { connect };
