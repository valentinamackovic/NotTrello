import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginPage from "./authentication/LoginPage";
import Boards from "./boards/Boards";
import KanbanBoardView from "./boards/KanbanBoard";
import Header from "./header/Header";
import ProtectedRoute from "./shared/ProtectedRoute";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <div className="min-vh-100 text-light root-container">
        <Router>
          <Header />
          <Switch>
            <Route path="/login">
              <LoginPage />
            </Route>
            <ProtectedRoute
              exact={true}
              path="/b/:id/:name"
              component={KanbanBoardView}
            />
            <ProtectedRoute path="/" component={Boards} />
          </Switch>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
