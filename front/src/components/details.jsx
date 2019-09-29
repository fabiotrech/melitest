import React, { Component } from 'react';
import Breadcrumb from "./common/breadcrumb";
import { getById } from "../services/itemService";
import "./details.scss";

class Details extends Component {
    state = {
        categories: [],
        item: {
            price: {}
        }
    }

    async componentDidMount() {
        const { params } = this.props.match;
        const { categories, item } = await getById(params.id);

        this.setState({ categories, item });
    }

    formatCondition = condition => {
        return condition === "new" ? "Nuevo" : "Usado";
    }

    render() {
        const { item, categories } = this.state;
        const { picture, description, condition, sold_quantity, title, price } = item;

        return (
            <React.Fragment>
                <Breadcrumb values={categories} />

                <div className="details">
                    <div className="content">
                        <img src={picture} alt="Imagen producto" />
                        
                        <h2 className="description-title">Descripci&oacute;n del producto</h2>
                        <p className="item-description">{description}</p>
                    </div>
                    <div className="buy-box">
                        <p className="sold-quantity">{this.formatCondition(condition)} - {sold_quantity} vendidos</p>
                        <h1 className="item-title">{title}</h1>
                        <p className="price">{price.currency} {price.amount}</p>
                        <button type="button">
                            Comprar
                        </button>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
 
export default Details;
