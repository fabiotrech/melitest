import React, { Component } from 'react';
import Breadcrumb from "./common/breadcrumb";
import { getById } from "../services/itemService";
import "./details.scss";

class Details extends Component {
    state = {
        categories: ["Uno", "Dos", "Tres"],
        data: {
            item: {
                price: {}
            }
        }
    }

    componentDidMount() {
        const { params } = this.props.match;

        const item = getById(params.id);
        this.setState({ data: item });
    }

    render() {
        const { data: {item}, categories } = this.state;

        return (
            <React.Fragment>
                <Breadcrumb values={categories} />

                <div className="details">
                    <div className="content">
                        <img src={item.picture} alt="Imagen producto" />

                        <h2 className="description-title">Descripci&oacute;n del producto</h2>
                        <p className="item-description">{item.description}</p>
                    </div>
                    <div className="buy-box">
                        <p className="sold-quantity">Nuevo - {item.sold_quantity} vendidos</p>
                        <h1 className="item-title">{item.title}</h1>
                        <p className="price">{item.price.currency} {item.price.amount}</p>
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
