import React from "react";
import { PropTypes } from "prop-types";
import "./breadcrumb.scss";

const Breadcrumb = ({ values }) => {
  return (
    <ol
      className="breadcrumb"
      itemScope
      itemType="https://schema.org/BreadcrumbList"
    >
      {values.map((item, index) => (
        <li
          key={item}
          itemProp="itemListElement"
          itemType="https://schema.org/ListItem"
          itemScope
        >
          <span itemProp="name">{item}</span>
          <meta itemProp="position" content={++index} />
        </li>
      ))}
    </ol>
  );
};

Breadcrumb.propTypes = {
  values: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Breadcrumb;
