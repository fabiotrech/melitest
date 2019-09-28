import React, { Component } from "react";
import ListingItem from "./listingItem";
import Breadcrumb from "./common/breadcrumb";
import { search } from "../services/searchService";
import qs from "qs";

class Listing extends Component {
    state = {
        categories: [],
        items: []
    }

    componentDidMount() {
        const { search: term } = qs.parse(this.props.location.search, { ignoreQueryPrefix: true });
        
        const { categories, items } = search(term);
        this.setState({ categories, items });
    }

    render() {
        const { items, categories } = this.state;

        return (
            <React.Fragment>
                <Breadcrumb values={categories} />

                <ul>
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
