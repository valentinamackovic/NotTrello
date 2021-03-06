import React, { useState } from "react";
import {
  Draggable,
  DraggableProvided,
  Droppable,
  DroppableProvided,
} from "react-beautiful-dnd";
import { connect } from "react-redux";
import Card from "../cards/Card";
import AddItem from "./AddItem";
import { addCard, archiveList, updateListName } from "./listThunks";

interface ListProps {
  list: List;
  index: number;
  addCard: (name: string, idList: string) => void;
  archiveList: (idList: string) => void;
  updateListName: (isList: string, name: string) => void;
}

function List({
  list,
  addCard,
  archiveList,
  updateListName,
  index,
}: ListProps) {
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

  const cardComponents = list?.cards?.map((card, index) => (
    <Card key={card.id} card={card} index={index} />
  ));

  return (
    <Draggable draggableId={list.id} index={index}>
      {(provided: DraggableProvided) => (
        <div
          className="bg-dark rounded kanban-column p-2 align-self-start"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
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
          <Droppable
            droppableId={list.id}
            type="CARD"
            direction="vertical"
            ignoreContainerClipping={true}
            isCombineEnabled={false}
          >
            {(provided: DroppableProvided) => (
              <div>
                <div
                  className="column-content"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {cardComponents}
                </div>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <AddItem
            title="Add another card"
            handleAddItemClicked={(name) => handleAddCard(name)}
          />
        </div>
      )}
    </Draggable>
  );
}

export default connect(null, { addCard, archiveList, updateListName })(List);
