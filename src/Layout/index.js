import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import {
  Switch,
  Route,
} from "react-router-dom";

import Home from "./Home";
import Study from "./Study";
import CreateDeck from "./CreateDeck";
import Deck from "./Deck";
import EditCard from "./EditCard";
import CreateCard from "./CreateCard";
import EditDeck from "./EditDeck";

function Layout() {

  return (
    <div>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/decks/:deckId/edit">

            <EditDeck />

          </Route>
          <Route exact path="/decks/new">

            <CreateDeck />

          </Route>
          <Route exact path="/decks/:deckId/study">

            <Study />

          </Route>
          <Route exact path="/decks/:deckId">

            <Deck />

          </Route>
          <Route exact path="/decks/:deckId/cards/:cardId/edit">

            <EditCard />

          </Route>
          <Route exact path="/decks/:deckId/cards/new">

            <CreateCard />

          </Route>
          <Route exact path="/">

            <Home />

          </Route>
          <Route>

            <NotFound />

          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default Layout;
