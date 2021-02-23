import React, { useEffect } from "react";
import { connect } from "react-redux";
import List from "../lists/List";
import { fetchLists } from "../lists/listThunks";
import { ApplicationState } from "../store";

interface KanbanBoardProps {
  lists: List[];
  fetchLists: () => void;
}

function KanbanBoard({ fetchLists, lists }: KanbanBoardProps) {
  useEffect(() => {
    fetchLists();
  }, [fetchLists]);

  const listsComponents = lists?.map((list: List) => <List list={list} />);

  return (
    <div className="mt-3 p-2 scrollable d-flex align-items-start">
      {listsComponents}
    </div>
  );
}

const mapStateToProps = (state: ApplicationState) => ({
  lists: state.lists.lists,
});

export default connect(mapStateToProps, { fetchLists })(KanbanBoard);
