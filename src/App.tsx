import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Boards from "./boards/Boards";
import KanbanBoardView from "./boards/KanbanBoard";
import Header from "./header/Header";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <div className="min-vh-100 text-light">
        <Header />
        <Router>
          <Switch>
            <Route exact path="/b/:id/:name">
              <KanbanBoardView />
            </Route>
            <Route path="/">
              <Boards />
            </Route>
          </Switch>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
