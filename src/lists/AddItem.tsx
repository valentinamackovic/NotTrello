import { useRef, useState } from "react";
import { onEscapeOrEnter } from "../shared/onEscapeOrEnter";
import { useOutsideClickAlert } from "../shared/useOutsideClickAlert";

interface AddItemProps {
  title: string;
  handleAddItemClicked: (value: string) => void;
}

function AddItem({ title, handleAddItemClicked }: AddItemProps) {
  const addItemFormRef = useRef(null);
  useOutsideClickAlert(addItemFormRef, () => setIsAddingItem(false));
  const [isAddingItem, setIsAddingItem] = useState<boolean>(false);
  const [newItemName, setNewItemName] = useState<string>("");

  const handleOnKeyUp = (e: any) => {
    onEscapeOrEnter(
      e,
      () => setIsAddingItem(false),
      () => addItemAndHideForm()
    );
  };

  const addItemAndHideForm = () => {
    const name = newItemName.replace(/\n/g, "");
    if (name !== "") {
      handleAddItemClicked(newItemName);
      setIsAddingItem(false);
      setNewItemName("");
    }
  };

  if (!isAddingItem) {
    return (
      <div className="py-1 my-1 add-item" onClick={() => setIsAddingItem(true)}>
        <i className="bi bi-plus me-2" />
        {title}
      </div>
    );
  }
  return (
    <form className="py-1 my-1 mx-1" ref={addItemFormRef}>
      <textarea
        rows={3}
        className="form-control bg-secondary border-secondary add-item-teaxtarea text-light"
        value={newItemName}
        onChange={(e) => setNewItemName(e.target.value)}
        autoFocus
        onKeyUp={(e) => handleOnKeyUp(e)}
      />
      <div className="mt-1">
        <button
          type="button"
          className="btn btn-info btn-sm text-dark"
          onClick={() => addItemAndHideForm()}
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
