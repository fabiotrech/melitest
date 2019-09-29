import React, { Component } from "react";
import ListingItem from "./listingItem";
import Breadcrumb from "./common/breadcrumb";
import { search } from "../services/itemService";
import qs from "qs";
import "./listing.scss";

class Listing extends Component {
    state = {
        categories: [],
        items: []
    }

    async componentDidMount() {
        const { search: term } = qs.parse(this.props.location.search, { ignoreQueryPrefix: true });
        
        const { categories, items } = await search(term);
        this.setState({ categories, items });
    }

    render() {
        const { items, categories } = this.state;

        return (
            <React.Fragment>
                <Breadcrumb values={categories} />

                <ul className="list">
                    { items.map(item => 
                        <li key={item.id}>
                            <ListingItem data={item} />
                        </li>
                    )}
                </ul>
            </React.Fragment>
        );
    }
}
 
export default Listing;
