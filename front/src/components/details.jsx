import React, { Component } from 'react';
import { getById } from "../services/itemService";

class Details extends Component {
    state = { 
        data: {}
    }

    componentDidMount() {
        const { params } = this.props.match;

        const item = getById(params.id);
        this.setState({ data: item });
    }

    render() { 
        return ( <h1>Details</h1> );
    }
}
 
export default Details;
