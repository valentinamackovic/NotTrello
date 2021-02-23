import React from "react";
import { Provider } from "react-redux";
import Header from "./header/Header";
import KanbanBoardView from "./kanbanBoardView/KanbanBoard";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <div className="bg-secondary min-vh-100 text-light">
        <Header />
        <KanbanBoardView />
      </div>
    </Provider>
  );
}

export default App;
