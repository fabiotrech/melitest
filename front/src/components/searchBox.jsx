import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import "./searchBox.scss";

// Candidato a ser function component con Hooks
class SearchBox extends Component {
    state = {
        searchTerm: ""
    }

    handleChange = e => {
        this.setState({
            searchTerm: e.target.value
        });
    };

    onSubmit = e => {
        e.preventDefault();
        const { searchTerm } = this.state;

        if (!searchTerm) return;
        
        this.props.history.push(`/items?search=${searchTerm}`);
    };

    render() {
        return (
            <div className="container search-box">
                <Link to="/" className="logo">
                    <img src="/Logo_ML.png" alt="MercadoLibre logo" />
                </Link>
                <form onSubmit={this.onSubmit}>
                    <input
                        type="text"
                        placeholder="Nunca dejes de buscar"
                        value={this.state.searchTerm}
                        onChange={this.handleChange}
                    />
                    <button type="submit">
                        Buscar
                    </button>
                </form>
            </div>
        );
    }
}
 
export default withRouter(SearchBox);
