import React from "react";
import Header from "./header/Header";
import KanbanBoardView from "./kanbanBoardView/KanbanBoard";

function App() {
  return (
    <div className="bg-secondary min-vh-100 text-light">
      <Header />
      <KanbanBoardView />
    </div>
  );
}

export default App;
