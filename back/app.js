require("dotenv").config();

const express = require('express');
const app = express();
const itemsRoute = require("./routes/items");

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use("/api/items", itemsRoute);

app.listen(3100, () => {
    console.log('App listening on port 3100!');
});
