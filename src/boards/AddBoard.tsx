import React, { useState } from "react";
import { connect } from "react-redux";
import { createBoard } from "./boardThunks";

interface AddNewBoardProps {
  createBoard: (name: string) => void;
}

function AddNewBoard({ createBoard }: AddNewBoardProps) {
  const [isAddingBoard, setIsAddingBoard] = useState(false);
  const [name, setName] = useState("");

  const handleAddBoardClick = () => {
    if (name !== "") {
      createBoard(name);
      setIsAddingBoard(false);
      setName("");
    }
  };

  return (
    <div className="rounded board">
      {isAddingBoard ? (
        <div className="board-content rounded hover-effect-none">
          <input
            type="text"
            className="form-control add-board-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
          />
          <button
            className="btn btn-sm btn-dark mt-2 ms-2"
            onClick={handleAddBoardClick}
          >
            Save
          </button>
        </div>
      ) : (
        <div
          className="board-content rounded d-flex align-items-center justify-content-center hover-opacity-effect"
          onClick={() => setIsAddingBoard(true)}
        >
          Add new board
        </div>
      )}
    </div>
  );
}

export default connect(null, { createBoard })(AddNewBoard);
