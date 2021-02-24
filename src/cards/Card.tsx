import React from "react";

interface CardProps {
  card: Card;
}

function Card({ card }: CardProps) {
  return (
    <div className="bg-secondary rounded m-1 px-2 py-1 d-flex justify-content-between text-wrap">
      {card.name}
      <i className="bi bi-pencil-fill" />
    </div>
  );
}

export default Card;
