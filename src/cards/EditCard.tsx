import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { ApplicationState } from "../store";
import { resetCardState } from "./cardActions";
import { fetchCardById, updateCard } from "./cardThunks";

interface CardProps {
  card: Card | null;
  idCard: string;
  show: boolean;
  close: () => void;
  resetCardState: () => void;
  fetchCardById: (idCard: string) => void;
  updateCard: (card: Card) => void;
}

function EditCard({
  card,
  idCard,
  show,
  close,
  resetCardState,
  fetchCardById,
  updateCard,
}: CardProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (show) {
      fetchCardById(idCard);
    }
  }, [fetchCardById, idCard, show]);

  useEffect(() => {
    setTitle(card?.name || "");
    setDescription(card?.desc || "");
  }, [card]);

  const onSave = () => {
    const updatedCard: Card = {
      name: title,
      id: card?.id || "",
      desc: description,
      idList: card?.idList || "",
    };
    updateCard(updatedCard);
    close();
  };

  if (!show) {
    return null;
  }

  return (
    <div className="edit-card-modal text-dark">
      <div className="edit-card-modal-content">
        <div className="fs-5 fw-bold mb-3 d-flex justify-content-between align-items-start">
          <input
            type="text"
            className="edit-card-title-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <i
            className="bi bi-x fs-3 me-2"
            onClick={() => {
              resetCardState();
              close();
            }}
          />
        </div>
        <div className="mb-3">
          <span className="fw-bold">Description:</span>
          <textarea
            className="form-control mt-2"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mb-2 d-flex justify-content-between align-items-center">
          <span className="fw-bold">Activity</span>
          <button className="btn btn-sm btn-info text-light">
            Show activity
          </button>
        </div>
        <div className="pb-5">
          <input
            type="text"
            className="form-control"
            placeholder="Write a comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <button className="btn btn-info text-light mt-4" onClick={onSave}>
          Save
        </button>
      </div>
    </div>
  );
}

const mapStateToProps = (state: ApplicationState) => ({
  card: state.cards.card,
});

export default connect(mapStateToProps, {
  fetchCardById,
  resetCardState,
  updateCard,
})(EditCard);
