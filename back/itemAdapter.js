
// Esta funcion hace la suerte de un mapper
Adapt = item => {
    const { id, title, thumbnail: picture, condition, currency_id, price, seller_address } = item;
    const { city, state } = seller_address;

    return {
        id,
        title,
        "price": {
            "currency": currency_id,
            "amount": price,
            "decimals": null
        },
        picture,
        condition,
        "free_shipping": item.shipping.free_shipping,
        /* En el listado de busqueda, en el diseño se ve la ubicacion del articulo
         * pero en la definicion de la api en el pdf no figura un campo para esto.
         */
        location: city.name || state.name
    };
}

module.exports = Adapt;
