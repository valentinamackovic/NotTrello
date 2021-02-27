import React, { useState } from "react";
import EditCard from "./EditCard";

interface CardProps {
  card: Card;
}

function Card({ card }: CardProps) {
  const [showEditCradModal, setShowEditCradModal] = useState(false);

  return (
    <div className="bg-secondary rounded m-1 px-2 py-1 d-flex justify-content-between text-wrap">
      {card.name}
      <i
        className="bi bi-pencil-fill"
        onClick={() => setShowEditCradModal(true)}
      />
      <EditCard
        idCard={card.id}
        show={showEditCradModal}
        close={() => setShowEditCradModal(false)}
      />
    </div>
  );
}

export default Card;
