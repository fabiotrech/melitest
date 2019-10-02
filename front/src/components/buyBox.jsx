import React from 'react';
import { formatCurrencyPrice } from "../utils";
import "./buyBox.scss";

const BuyBox = ({ condition, sold_quantity, title, price }) => {
    
    const formatCondition = condition => {
        return condition === "new" ? "Nuevo" : "Usado";
    };

    return (
        <div className="buy-box">
            <p className="sold-quantity">
                {formatCondition(condition)} - {sold_quantity} vendidos
            </p>
            <h1 className="item-title">{title}</h1>
            <p className="price">
                {formatCurrencyPrice(price.currency, price.amount)}
            </p>
            <button type="button" className="btn-primary">
                Comprar
            </button>
        </div>
    );
}
 
export default BuyBox;