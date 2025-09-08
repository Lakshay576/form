const express = require('express')
const app = express();
const authroutes = require('./routes/auth')
const cors = require('cors');

app.use(cors());

app.use(express.json());
app.use('/api', authroutes)

module.exports = app;