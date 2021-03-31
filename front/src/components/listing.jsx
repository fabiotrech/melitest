import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import qs from "qs";
import ListingItem from "./listingItem";
import Breadcrumb from "./common/breadcrumb";
import { searchTerm } from "../services/itemService";
import "./listing.scss";

const Listing = () => {
  const { search } = useLocation();
  const [state, setState] = useState({ categories: [], items: [] });

  useEffect(() => {
    async function LoadData() {
      const { search: term } = qs.parse(search, {
        ignoreQueryPrefix: true,
      });

      const { categories, items } = await searchTerm(term);
      setState({ categories, items });
    }

    LoadData();
  }, [search]);

  const { items, categories } = state;

  return (
    <>
      <Breadcrumb values={categories} />

      <ul className="list">
        {items.map((item) => (
          <li key={item.id}>
            <ListingItem {...item} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default Listing;
