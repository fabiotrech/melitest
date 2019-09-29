require("dotenv").config();

const express = require('express');
const fetch = require('node-fetch');
const app = express();
const adapter = require("./itemAdapter");
const endpoints = require("./endpoints");

const ITEMS_LIMIT = 4;
const author = {
    "name": "Fabio",
    "lastname": "Trech"
};

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get("/api/items", (req, res) => {
    const { q: term } = req.query;

    fetch(`${process.env.API_HOST}${endpoints.search}?q=${term}`)
        .then(res => res.json())
        .then(body => {
            const { results, filters, available_filters } = body;

            const categories = getCategoriesFromFilters(filters) ||
                getCategoriesFromFilters(available_filters);
            
            const items = results.slice(0, ITEMS_LIMIT)
                .map(item => adapter(item));

            res.send({ author, categories, items});
        }).catch(err => {
            res.status(500)
                .json({ message: err.message });
        });
});

app.get("/api/items/:id", (req, res) => {
    const id = req.params.id;
    const itemUrl = `${process.env.API_HOST}${endpoints.getItem}`.replace(":id", id);
    const descriptionUrl = `${process.env.API_HOST}${endpoints.getItemDescription}`.replace(":id", id);
    const categoryUrl = `${process.env.API_HOST}${endpoints.getCategory}`;

    const fetchs = [itemUrl, descriptionUrl].map(url => 
        fetch(url).then(res => res.json())
    );
    
    Promise.all(fetchs)
        .then(async ([ itemData, itemDesc ]) => {
            const { sold_quantity, pictures, category_id } = itemData;
            const { plain_text: description } = itemDesc;
            const picture = pictures[0].url;

            const categories = await fetch(categoryUrl.replace(":id", category_id))
                .then(res => res.json())
                .then(({path_from_root}) =>  path_from_root.map(p => p.name));

            const item = { ...adapter(itemData), sold_quantity, description, picture };
            
            res.send({ author, categories, item });
        }).catch(err => {
            res.send(err);
        });
});

app.listen(3100, function () {
    console.log('App listening on port 3100!');
});

getCategoriesFromFilters = items => {
    if (items.length === 0) return;

    const { values } = items.find(i => i.id === "category");

    // El caso donde solo hay una categoria (filters) y existe la propiedad "path_from_root"
    if (values.length === 1) {
        const { path_from_root: path } = values[0];
        
        return path.map(p => p.name);
    }

    // El caso donde solo hay resultados por categoria (available_filters)
    const maxCategory = values.reduce((prev, current) => prev.results > current.results ? prev : current);

    return [maxCategory.name];
};
