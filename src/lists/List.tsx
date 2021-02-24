import React from "react";
import Card from "../cards/Card";
import AddItem from "./AddItem";

interface ListProps {
  list: List;
}

function List({ list }: ListProps) {
  const cardComponents = list?.cards?.map((card) => (
    <Card key={card.id} card={card} />
  ));

  return (
    <div className="bg-dark rounded kanban-column p-2 align-self-start">
      <div className="list-title p-1">{list.name}</div>
      <div className="column-content">{cardComponents}</div>
      <AddItem title="Add another card" />
    </div>
  );
}

export default List;
