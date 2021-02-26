import { useState } from "react";

interface AddItemProps {
  title: string;
  handleAddItemClicked: (value: string) => void;
}

function AddItem({ title, handleAddItemClicked }: AddItemProps) {
  const [isAddingItem, setIsAddingItem] = useState<boolean>(false);
  const [newItemName, setNewItemName] = useState<string>("");

  if (!isAddingItem) {
    return (
      <div className="py-1 my-1 add-item" onClick={() => setIsAddingItem(true)}>
        <i className="bi bi-plus me-2" />
        {title}
      </div>
    );
  }
  return (
    <form className="py-1 my-1 mx-1">
      <textarea
        rows={3}
        className="form-control bg-secondary border-secondary add-item-teaxtarea text-light"
        value={newItemName}
        onChange={(e) => setNewItemName(e.target.value)}
      />
      <div className="mt-1">
        <button
          type="button"
          className="btn btn-info btn-sm text-dark"
          onClick={() => {
            handleAddItemClicked(newItemName);
            setIsAddingItem(false);
            setNewItemName("");
          }}
        >
          Add item
        </button>
        <i
          className="bi bi-x fs-4 align-middle"
          onClick={() => setIsAddingItem(false)}
        />
      </div>
    </form>
  );
}

export default AddItem;
