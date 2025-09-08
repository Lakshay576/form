const express = require('express')
const app = express();
const authroutes = require('./routes/auth')
const cors = require('cors');

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))

app.use(express.json());
app.use('/api', authroutes)

module.exports = app;