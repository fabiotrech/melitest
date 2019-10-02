const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const adapter = require("../itemAdapter");
const endpoints = require("../endpoints");

const author = {
    "name": "Fabio",
    "lastname": "Trech"
};

router.get("/", (req, res) => {
    const { q: term } = req.query;

    fetch(`${process.env.API_HOST}${endpoints.search}?q=${term}`)
        .then(res => res.json())
        .then(body => {
            const { results, filters, available_filters } = body;
            /* Segun el tipo de busqueda las categorias estan
             * en filtros aplicados o en los disponibles
             */
            const categories = getCategoriesFromFilters(filters) ||
                getCategoriesFromFilters(available_filters);
            // Obtengo los primero items segun la constante y los mapo usando el adapter
            const items = results.slice(0, process.env.ITEMS_TOP)
                .map(item => adapter(item));

            res.send({ author, categories, items});
        }).catch(err => {
            res.status(500)
                .json({ message: err.message });
        });
});

router.get("/:id", (req, res) => {
    const id = req.params.id;
    // Preparo las urls
    const itemUrl = `${process.env.API_HOST}${endpoints.getItem}`.replace(":id", id);
    const descriptionUrl = `${process.env.API_HOST}${endpoints.getItemDescription}`.replace(":id", id);
    const categoryUrl = `${process.env.API_HOST}${endpoints.getCategory}`;
    // Creo un array de promesas
    const fetchs = [itemUrl, descriptionUrl].map(url => 
        fetch(url).then(res => res.json())
    );
    
    Promise.all(fetchs)
        .then(async ([ itemData, itemDesc ]) => {
            const { sold_quantity, pictures, category_id } = itemData;
            const { plain_text: description } = itemDesc;
            // Obtengo la primera imagen de pictures porque la thumbnail no me sirve
            const picture = pictures[0].url;

            // Busco el path por el id de la categoria y devuelo un array de string
            const categories = await fetch(categoryUrl.replace(":id", category_id))
                .then(res => res.json())
                .then(({path_from_root}) =>  path_from_root.map(p => p.name));
            /* Construyo un objeto como es requerido y reemplazo la propiedad
             * picture por la imagen obtenida anteriormente
             */
            const item = { ...adapter(itemData), sold_quantity, description, picture };
            
            res.send({ author, categories, item });
        }).catch(err => {
            res.send(err);
        });
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

module.exports = router;
