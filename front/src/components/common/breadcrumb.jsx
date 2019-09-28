import React from "react";
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
 
export default Breadcrumb;
