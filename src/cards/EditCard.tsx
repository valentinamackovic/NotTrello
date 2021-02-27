import React from "react";

interface CardProps {
  card: Card;
  showModal: boolean;
  close: () => void;
}

function EditCard({ card, showModal, close }: CardProps) {
  if (!showModal) {
    return null;
  }

  return (
    <div className="edit-card-modal text-dark">
      <div className="edit-card-modal-content">
        <div className="fs-5 fw-bold mb-3 d-flex justify-content-between align-items-center">
          Naslov <i className="bi bi-x fs-3 me-2" onClick={close} />
        </div>
        <div className="mb-3">
          <span className="fw-bold">Description:</span>
          <textarea className="form-control mt-2" rows={4} />
        </div>
        <div className="mb-2 d-flex justify-content-between align-items-center">
          <span className="fw-bold">Activity</span>
          <button className="btn btn-sm btn-info text-light">
            Show activity
          </button>
        </div>
        <div>
          <input
            type="text"
            className="form-control"
            placeholder="Write a comment"
          />
        </div>
      </div>
    </div>
  );
}

export default EditCard;
