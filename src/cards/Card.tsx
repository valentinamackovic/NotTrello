import React, { useState } from "react";
import { Draggable, DraggableProvided } from "react-beautiful-dnd";
import EditCard from "./EditCard";

interface CardProps {
  card: Card;
  index: number;
}

function Card({ card, index }: CardProps) {
  const [showEditCradModal, setShowEditCradModal] = useState(false);

  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided: DraggableProvided) => (
        <div
          className="rounded m-1 px-2 py-1 d-flex justify-content-between text-wrap bg-white"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {card.name}
          <i
            className="bi bi-pencil-fill ps-1"
            onClick={() => setShowEditCradModal(true)}
          />
          <EditCard
            idCard={card.id}
            show={showEditCradModal}
            close={() => setShowEditCradModal(false)}
          />
        </div>
      )}
    </Draggable>
  );
}

export default Card;
