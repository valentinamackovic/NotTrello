import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { ApplicationState } from "../store";
import AddNewBoard from "./AddBoard";
import { fetchBoards } from "./boardThunks";

interface BoardsProps {
  boards: Board[];
  fetchBoards: () => void;
}

function Boards({ boards, fetchBoards }: BoardsProps) {
  useEffect(() => {
    fetchBoards();
  }, [fetchBoards]);

  const boardsComponents = boards?.map((board) => (
    <Board key={board.id} board={board} />
  ));

  return (
    <div className="container my-3">
      <p className="fs-5 fw-bold text-dark">Boards</p>
      <div className="mt-3">
        {boardsComponents}
        <AddNewBoard />
      </div>
    </div>
  );
}

interface BoardProps {
  board: Board;
}

function Board({ board }: BoardProps) {
  let history = useHistory();

  return (
    <div
      className="rounded board hover-opacity-effect"
      style={{
        backgroundImage: `url(${board.prefs.backgroundImage})`,
        backgroundColor: `${board.prefs.backgroundColor}`,
      }}
      onClick={() => history.push(`b/${board.id}/${board.name}`)}
    >
      <div className="board-content rounded ps-3 py-2">{board.name}</div>
    </div>
  );
}

const mapStateToProps = (state: ApplicationState) => ({
  boards: state.boards.boards,
});

export default connect(mapStateToProps, { fetchBoards })(Boards);
