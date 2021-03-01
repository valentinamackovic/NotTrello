import React from "react";
import { connect } from "react-redux";
import AddItem from "./AddItem";
import Card from "../cards/Card";
import { addCard, archiveList } from "./listThunks";

interface ListProps {
  list: List;
  addCard: (name: string, idList: string) => void;
  archiveList: (idList: string) => void;
}

function List({ list, addCard, archiveList }: ListProps) {
  const cardComponents = list?.cards?.map((card) => (
    <Card key={card.id} card={card} />
  ));

  const handleAddCard = (name: string) => {
    addCard(name, list?.id);
  };

  return (
    <div className="bg-dark rounded kanban-column p-2 align-self-start">
      <div className="list-title p-1 d-flex justify-content-between">
        {list.name}{" "}
        <i className="bi bi-trash" onClick={() => archiveList(list.id)} />
      </div>
      <div className="column-content">{cardComponents}</div>
      <AddItem
        title="Add another card"
        handleAddItemClicked={(name) => handleAddCard(name)}
      />
    </div>
  );
}

export default connect(null, { addCard, archiveList })(List);
