import React from "react";
import List from "./List";

function KanbanBoard() {
  return (
    <div className="mt-3 p-2 scrollable">
      <List />
      <List />
      <List />
      <List />
      <List />
      <List />
      <List />
      <List />
    </div>
  );
}

export default KanbanBoard;
