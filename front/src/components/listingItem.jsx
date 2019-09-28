import React from "react";
import { Link } from "react-router-dom";

const ListingItem = ({ data }) => {
    const { id, title, price, picture, condition, free_shipping } = data;

    return ( 
        <Link to={`/items/${id}`} >
            <img src={picture} alt="" />
            <p>{title}</p>
            <p>{free_shipping}</p>
            <p>{price.currency} {price.amount}</p>
            <p>{condition}</p>
        </Link>
    );
}
 
export default ListingItem;
