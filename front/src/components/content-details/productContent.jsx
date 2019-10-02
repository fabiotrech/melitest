import React from 'react';
import "./productContent.scss";

const ProductContent = ({picture, description}) => {
    return (
        <div className="product-content">
            <img src={picture} alt="Imagen del producto" />
            
            <h2 className="description-title">Descripci&oacute;n del producto</h2>
            <p className="item-description">{description}</p>
        </div>
    );
}
 
export default ProductContent;
