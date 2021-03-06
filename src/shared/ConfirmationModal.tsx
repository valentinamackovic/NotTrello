import React, { useRef } from "react";
import { useOutsideClickAlert } from "./useOutsideClickAlert";

interface ConfirmationModalprops {
  show: boolean;
  close: () => void;
  onConfirm: () => void;
}

function ConfirmationModal({ show, close, onConfirm }: ConfirmationModalprops) {
  const modalContentRef = useRef(null);
  useOutsideClickAlert(modalContentRef, () => {
    close();
  });

  if (!show) {
    return null;
  }

  return (
    <div className="confirmation-modal fs-6 text-dark">
      <div ref={modalContentRef} className="confirmation-modal-content">
        <div className="d-flex justify-content-between">
          <span className="text-center w-100">Are you sure? </span>
          <i className="bi bi-x" onClick={close} />
        </div>
        <hr />
        <div className="mb-4">Deleting is forever. There is no undo.</div>
        <div className="text-center">
          <button
            className="btn btn-dark py-1 w-100"
            onClick={() => {
              close();
              onConfirm();
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
