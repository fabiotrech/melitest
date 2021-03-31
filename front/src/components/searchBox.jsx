import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./searchBox.scss";

const SearchBox = () => {
  const history = useHistory();
  const [term, setTerm] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    if (!term) return;

    history.push(`/listing?search=${term}`);
  };

  return (
    <div className="container search-box">
      <Link to="/" className="logo">
        <img src="/Logo_ML.png" alt="MercadoLibre logo" />
      </Link>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Nunca dejes de buscar"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />
        <button type="submit">Buscar</button>
      </form>
    </div>
  );
};

export default SearchBox;
