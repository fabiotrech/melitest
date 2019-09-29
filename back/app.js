require("dotenv").config();

const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.get("/api/items", (req, res) => {
    const { q: term } = req.query;
    
    fetch(`${process.env.API_HOST}${process.env.ENDPOINT_SEARCH}?q=${term}`)
        .then(res => res.json())
        .then(body => {
            res.send(body);
        }).catch(err => {
            res.status(500)
                .json({ message: err.message });
        });
});

app.get("/api/items/:id", (req, res) => {
    console.log(req.params.id);
    res.send("Product");
});

app.listen(3100, function () {
    console.log('App listening on port 3100!');
});
