import React from "react";
import { PropTypes } from "prop-types";
import "./breadcrumb.scss";

const Breadcrumb = ({values}) => {
    return (
        <ul className="breadcrumb">
            { values.map(item => 
                <li key={item}>
                    {item}
                </li>
            ) }
        </ul>
     );
}

Breadcrumb.propTypes = {
    values: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default Breadcrumb;
