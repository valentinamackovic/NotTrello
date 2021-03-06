import React from "react";
import { Draggable, DraggableProvided } from "react-beautiful-dnd";
import AddItem from "./AddItem";

interface AddItemListProps {
  handleAddListClicked: (name: string) => void;
  index: number;
}

function AddItemList({ handleAddListClicked, index }: AddItemListProps) {
  return (
    <Draggable draggableId={"id"} index={index} isDragDisabled={true}>
      {(provided: DraggableProvided) => (
        <div
          className="bg-dark rounded kanban-column p-2 align-self-start mx-1"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <AddItem
            title="Add another list"
            handleAddItemClicked={(name) => handleAddListClicked(name)}
          />
        </div>
      )}
    </Draggable>
  );
}

export default AddItemList;
