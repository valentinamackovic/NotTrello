import React, { useEffect } from "react";
import { connect } from "react-redux";
import { ApplicationState } from "../store";
import List from "./List";
import { fetchLists } from "./listThunks";

interface KanbanBoardProps {
  lists: List[];
  fetchLists: () => void;
}

function KanbanBoard({ fetchLists, lists }: KanbanBoardProps) {
  useEffect(() => {
    fetchLists();
  }, [fetchLists]);

  const listsComponents = lists?.map((list: List) => <List list={list} />);

  return <div className="mt-3 p-2 scrollable">{listsComponents}</div>;
}

const mapStateToProps = (state: ApplicationState) => ({
  lists: state.lists.lists,
});

export default connect(mapStateToProps, { fetchLists })(KanbanBoard);
