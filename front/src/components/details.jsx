import React, { Component } from 'react';
import Breadcrumb from "./common/breadcrumb";
import ProductContent from './content-details/productContent';
import BuyBox from "./buyBox";
import { getById } from "../services/itemService";
import { isEmptyObject } from "../utils";
import "./details.scss";

class Details extends Component {
    state = {
        categories: [],
        item: {}
    }

    async componentDidMount() {
        const { params } = this.props.match;
        const { categories, item } = await getById(params.id);

        this.setState({ categories, item });
    }

    render() {
        /* Hasta que la api responda prefiero que no se vea contenido vacio.
         * Lo mejor seria mostrar un spinner o placeholders para que el usuario
         * entienda que algo esta sucediendo. Pero bueno, es un test.
         */
        if (isEmptyObject(this.state.item)) return null;

        const { item, categories } = this.state;
        const { picture, description, condition, sold_quantity, title, price } = item;

        return (
            <React.Fragment>
                <Breadcrumb values={categories} />

                <div className="details">
                    {/* Pense que quizas seria normal que el layout del contenido
                    sea variable segun el tipo de producto (productos, inmuebles, servicios, etc) */}
                    <ProductContent
                        picture={picture}
                        description={description}
                    />
                    <BuyBox 
                        condition={condition}
                        sold_quantity={sold_quantity}
                        title={title}
                        price={price}
                     />
                </div>
            </React.Fragment>
        );
    }
}
 
export default Details;
