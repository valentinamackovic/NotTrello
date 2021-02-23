import React from "react";
import Card from "../cards/Card";

interface ListProps {
  list: List;
}

function List({ list }: ListProps) {
  return (
    <div className="bg-dark rounded kanban-column-width p-2">
      <div className="list-title p-1">{list.name}</div>
      <Card />
      <Card />
      <Card />
      <Card />
    </div>
  );
}

export default List;
