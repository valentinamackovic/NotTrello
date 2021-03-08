import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import ConfirmationModal from "../shared/ConfirmationModal";
import { onEscapeOrEnter } from "../shared/onEscapeOrEnter";
import { deleteComment, updateComment } from "./cardThunks";

interface CommentProps {
  comment: Action;
  updateComment: (comment: Action) => void;
  deleteComment: (idAction: string, idcard: string) => void;
}

function Comment({ comment, updateComment, deleteComment }: CommentProps) {
  const [isInEditState, setIsInEditState] = useState(false);
  const [text, setText] = useState("");
  const [showConfirmationMdoal, setShowConfirmationMdoal] = useState(false);

  useEffect(() => {
    setText(comment.data.text);
  }, [comment]);

  const handleOnKeyUp = (e: any) => {
    onEscapeOrEnter(
      e.key,
      () => setIsInEditState(false),
      () => handleSaveCommentClicked()
    );
  };

  const handleSaveCommentClicked = () => {
    const action = { ...comment, data: { ...comment.data, text } };
    updateComment(action);
    setIsInEditState(false);
  };

  const date = new Date(comment.date);
  return (
    <div className="inline-flex my-2 mx-2">
      <ConfirmationModal
        close={() => setShowConfirmationMdoal(false)}
        show={showConfirmationMdoal}
        onConfirm={() => deleteComment(comment.id, comment.data.card.id)}
      />
      <div className="small-text fw-bold">
        {comment.memberCreator.fullName}
        <span className="mx-2 fw-light">{date.toLocaleString()}</span>
      </div>
      <input
        className="edit-card-title-input mt-1"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyUp={(e) => handleOnKeyUp(e)}
        disabled={!isInEditState}
      />
      {isInEditState ? (
        <div className="align-self-center">
          <button
            className="btn btn-sm btn-info text-light"
            onClick={handleSaveCommentClicked}
          >
            Save
          </button>
          <i
            className="bi bi-x fs-3 align-middle ms-2"
            onClick={() => setIsInEditState(false)}
          />
        </div>
      ) : (
        <div className="small-text mt-1">
          <span
            className="text-dark clickable"
            onClick={() => setIsInEditState(true)}
          >
            Edit
          </span>
          &nbsp;-&nbsp;
          <span
            className="text-dark clickable"
            onClick={() => setShowConfirmationMdoal(true)}
          >
            Delete
          </span>
        </div>
      )}
    </div>
  );
}

export default connect(null, {
  updateComment,
  deleteComment,
})(Comment);
