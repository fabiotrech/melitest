import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Breadcrumb from "./common/breadcrumb";
import ProductContent from "./content-details/productContent";
import BuyBox from "./buyBox";
import { getById } from "../services/itemService";
import { isEmptyObject } from "../utils";
import "./details.scss";

const Details = () => {
  const { id } = useParams();
  const [state, setState] = useState({ categories: [], item: {} });

  useEffect(() => {
    async function getData() {
      const { categories, item } = await getById(id);
      setState({ categories, item });
    }

    getData();
  }, [id]);

  /* Hasta que la api responda prefiero que no se vea contenido vacio.
   * Lo mejor seria mostrar un spinner o placeholders para que el usuario
   * entienda que algo esta sucediendo. Pero bueno, es un test.
   */
  if (isEmptyObject(state.item)) return null;

  const { item, categories } = state;
  const { picture, description, condition, sold_quantity, title, price } = item;

  return (
    <>
      <Breadcrumb values={categories} />

      <div className="details">
        {/* Pense que quizas seria normal que el layout del contenido
            sea variable segun el tipo de producto (productos, inmuebles, servicios, etc) */}
        <ProductContent picture={picture} description={description} />
        <BuyBox
          condition={condition}
          sold_quantity={sold_quantity}
          title={title}
          price={price}
        />
      </div>
    </>
  );
};

export default Details;
