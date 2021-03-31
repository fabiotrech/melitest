import React from "react";
import { Switch, Route } from "react-router-dom";
import SearchBox from "./components/searchBox";
import Listing from "./components/listing";
import Details from "./components/details";
import "./App.scss";

const App = () => {
  return (
    <>
      <header>
        <SearchBox />
      </header>

      <main className="container">
        <Switch>
          <Route path="/items/:id">
            <Details />
          </Route>

          <Route path="/listing">
            <Listing />
          </Route>

          <Route path="/" />
        </Switch>
      </main>
    </>
  );
};

export default App;
