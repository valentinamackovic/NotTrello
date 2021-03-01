import React from "react";
import AddItem from "./AddItem";

interface AddItemListProps {
  handleAddListClicked: (name: string) => void;
}

function AddItemList({ handleAddListClicked }: AddItemListProps) {
  return (
    <div className="bg-dark rounded kanban-column p-2 align-self-start">
      <AddItem
        title="Add another list"
        handleAddItemClicked={(name) => handleAddListClicked(name)}
      />
    </div>
  );
}

export default AddItemList;
