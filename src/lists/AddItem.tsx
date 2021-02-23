import { useState } from "react";

interface AddItem {
  title: string;
}

function AddItem({ title }: AddItem) {
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
    <div className="py-1 my-1 mx-1">
      <textarea
        rows={3}
        className="form-control bg-secondary border-secondary add-item-teaxtarea text-light"
        value={newItemName}
        onChange={(e) => setNewItemName(e.target.value)}
      />
      <div className="mt-1">
        <button type="button" className="btn btn-info btn-sm text-dark">
          Add item
        </button>
        <i
          className="bi bi-x fs-4 align-middle"
          onClick={() => setIsAddingItem(false)}
        />
      </div>
    </div>
  );
}

export default AddItem;
