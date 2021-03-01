import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { deleteComment, updateComment } from "./cardThunks";

interface CommentProps {
  comment: Action;
  updateComment: (comment: Action) => void;
  deleteComment: (idAction: string, idcard: string) => void;
}

function Comment({ comment, updateComment, deleteComment }: CommentProps) {
  const [isInEditState, setIsInEditState] = useState(false);
  const [text, setText] = useState("");

  useEffect(() => {
    setText(comment.data.text);
  }, [comment]);

  const handleSaveCommentClicked = () => {
    const action = { ...comment, data: { ...comment.data, text } };
    updateComment(action);
    setIsInEditState(false);
  };

  const date = new Date(comment.date);
  return (
    <div className="inline-flex my-2 mx-2">
      <div className="small-text fw-bold">
        {comment.memberCreator.fullName}
        <span className="mx-2 fw-light">{date.toLocaleString()}</span>
      </div>
      <input
        className="edit-card-title-input mt-1"
        value={text}
        onChange={(e) => setText(e.target.value)}
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
          <a
            href="#"
            className="text-dark"
            onClick={() => setIsInEditState(true)}
          >
            Edit
          </a>
          &nbsp;-&nbsp;
          <a
            href="#"
            className="text-dark"
            onClick={() => deleteComment(comment.id, comment.data.card.id)}
          >
            Delete
          </a>
        </div>
      )}
    </div>
  );
}

export default connect(null, {
  updateComment,
  deleteComment,
})(Comment);
