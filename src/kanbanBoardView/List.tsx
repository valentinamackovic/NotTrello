import React from "react";

interface ListProps {
  list: List;
}

function List({ list }: ListProps) {
  return (
    <div className="bg-dark rounded kanban-column-width p-2">
      <div>{list.name}</div>
    </div>
  );
}

export default List;
