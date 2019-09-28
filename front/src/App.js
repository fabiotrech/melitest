import React from 'react';
import { Switch, Route } from "react-router-dom";
import SearchBox from './components/searchBox';
import Listing from './components/listing';
import Details from './components/details';
import './App.scss';

const App = () => {
  return (
    <React.Fragment>
      <header>
        <SearchBox />
      </header>
      
      <main className="container">
        <Switch>
          <Route path="/items/:id" component={Details} />
          <Route path="/items" component={Listing} />
          <Route path="/" component={null} />
        </Switch>
      </main>
    </React.Fragment>
  );
}

export default App;
