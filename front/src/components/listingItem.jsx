import React from "react";
import { Link } from "react-router-dom";
import "./listingItem.scss";

const ListingItem = ({ data }) => {
    const { id, title, price, picture, free_shipping } = data;

    return ( 
        <Link to={`/items/${id}`} className="listing-item" >
            <img className="item-image" src={picture} alt="" />

            <div className="item-details">
                <span className="item-price">{price.currency} {price.amount}</span>
                { free_shipping && (
                    <img className="free-shipping" src="/ic_shipping.png" alt="Envio gratis" />
                )}
                <h2 className="item-title">{title}</h2>
                <span className="item-location">Capital Federal</span>
            </div>
        </Link>
    );
}
 
export default ListingItem;
