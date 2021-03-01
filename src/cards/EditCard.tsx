import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { ApplicationState } from "../store";
import { useOutsideClickAlert } from "../useOutsideClickAlert";
import { resetCardState } from "./cardActions";
import { addComment, fetchCardById, updateCard } from "./cardThunks";
import Comment from "./Comment";

interface CardProps {
  card: Card | null;
  idCard: string;
  show: boolean;
  close: () => void;
  resetCardState: () => void;
  fetchCardById: (idCard: string) => void;
  updateCard: (card: Card) => void;
  addComment: (idCard: string, text: string) => void;
}

function EditCard({
  card,
  idCard,
  show,
  close,
  resetCardState,
  fetchCardById,
  updateCard,
  addComment,
}: CardProps) {
  const modalContentRef = useRef(null);
  useOutsideClickAlert(modalContentRef, () => {
    setIsBtnSaveCommentVisible(false);
    close();
  });
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [comment, setComment] = useState("");
  const [isBtnSaveCommentVisible, setIsBtnSaveCommentVisible] = useState(false);

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
      actions: card?.actions || [],
    };
    updateCard(updatedCard);
    close();
  };

  const onAddComment = () => {
    addComment(card?.id || "", comment);
    setComment("");
    setIsBtnSaveCommentVisible(false);
  };

  const comments = card?.actions?.map((comment) => (
    <Comment comment={comment} />
  ));

  if (!show) {
    return null;
  }

  return (
    <div className="edit-card-modal text-dark">
      <div className="edit-card-modal-content" ref={modalContentRef}>
        <div className="fs-5 fw-bold mb-3 d-flex justify-content-between align-items-start">
          <input
            type="text"
            className="edit-card-title-input text-wrap"
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
        <div className="mb-2 d-flex justify-content-between align-items-center fw-bold">
          Activity
        </div>
        <div
          className="pb-1"
          onBlur={(event) => {
            //@ts-ignore
            if (!event.currentTarget.contains(event.relatedTarget)) {
              setIsBtnSaveCommentVisible(false);
            }
          }}
        >
          <input
            type="text"
            className="form-control border-bottom-0 comment-input"
            placeholder="Write a comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onFocus={() => setIsBtnSaveCommentVisible(true)}
          />
          {isBtnSaveCommentVisible && (
            <button
              className="btn btn-sm btn-info text-light mt-2 ms-2"
              onClick={onAddComment}
            >
              Add
            </button>
          )}
        </div>
        <div>{comments}</div>
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
  addComment,
})(EditCard);
