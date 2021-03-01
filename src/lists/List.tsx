import React, { useState } from "react";
import { connect } from "react-redux";
import Card from "../cards/Card";
import AddItem from "./AddItem";
import { addCard, archiveList, updateListName } from "./listThunks";

interface ListProps {
  list: List;
  addCard: (name: string, idList: string) => void;
  archiveList: (idList: string) => void;
  updateListName: (isList: string, name: string) => void;
}

function List({ list, addCard, archiveList, updateListName }: ListProps) {
  const [isListNameBeingUpdated, setIsListNameBeingUpdated] = useState(false);
  const [updatedListName, setUpdatedListName] = useState(list.name);

  const handleAddCard = (name: string) => {
    addCard(name, list?.id);
  };

  const handleUpdateListName = () => {
    if (updatedListName !== list.name) {
      updateListName(list.id, updatedListName);
    }
    setIsListNameBeingUpdated(false);
  };

  const cardComponents = list?.cards?.map((card) => (
    <Card key={card.id} card={card} />
  ));

  return (
    <div className="bg-dark rounded kanban-column p-2 align-self-start">
      {isListNameBeingUpdated ? (
        <input
          type="text"
          className="form-control"
          value={updatedListName}
          onChange={(e) => setUpdatedListName(e.target.value)}
          onBlur={() => handleUpdateListName()}
          autoFocus
        />
      ) : (
        <div
          className="list-title p-1 d-flex justify-content-between"
          onClick={() => setIsListNameBeingUpdated(true)}
        >
          {list.name}
          <i className="bi bi-trash" onClick={() => archiveList(list.id)} />
        </div>
      )}
      <div className="column-content">{cardComponents}</div>
      <AddItem
        title="Add another card"
        handleAddItemClicked={(name) => handleAddCard(name)}
      />
    </div>
  );
}

export default connect(null, { addCard, archiveList, updateListName })(List);
