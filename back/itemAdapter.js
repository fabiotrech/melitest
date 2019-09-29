
Adapt = item => {
    const { id, title, thumbnail: picture, condition } = item;
    return {
        id, title,
        "price": {
            "currency": item.currency_id,
            "amount": item.price,
            "decimals": null
        },
        picture,
        condition,
        "free_shipping": item.shipping.free_shipping
    };
}

module.exports = Adapt;
