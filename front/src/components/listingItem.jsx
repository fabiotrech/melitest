import React from "react";
import { Link } from "react-router-dom";
import { formatCurrencyPrice } from "../utils";
import "./listingItem.scss";

const ListingItem = ({
  id,
  title,
  price,
  picture,
  free_shipping,
  location,
}) => {
  return (
    <Link to={`/items/${id}`} className="listing-item">
      <img className="item-image" src={picture} alt="Imagen del producto" />

      <div className="item-details">
        <span className="item-price">
          {formatCurrencyPrice(price.currency, price.amount)}
        </span>
        {free_shipping && (
          <img
            className="free-shipping"
            src="/ic_shipping.png"
            alt="Envio gratis"
          />
        )}
        <h2 className="item-title">{title}</h2>
      </div>

      <span className="item-location">{location}</span>
    </Link>
  );
};

export default ListingItem;
