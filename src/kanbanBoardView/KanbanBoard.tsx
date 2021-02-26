import React, { useEffect } from "react";
import { connect } from "react-redux";
import AddItem from "../addItem/AddItem";
import List from "../lists/List";
import { addList, fetchLists } from "../lists/listThunks";
import { ApplicationState } from "../store";

interface KanbanBoardProps {
  lists: List[];
  fetchLists: () => void;
  addList: (name: string) => Promise<void>;
}

function KanbanBoard({ fetchLists, lists, addList }: KanbanBoardProps) {
  useEffect(() => {
    window.addEventListener("focus", () => fetchLists());

    return function cleanup() {
      window.removeEventListener("focus", () => fetchLists());
    };
  }, [fetchLists]);

  useEffect(() => {
    fetchLists();
  }, [fetchLists]);

  const handleAddListClicked = (name: string) => {
    if (name === "") {
      return;
    }
    addList(name);
  };

  const listsComponents = lists?.map((list: List) => (
    <List key={list.id} list={list} />
  ));

  return (
    <div className="mt-3 p-2 scrollable d-flex align-items-start">
      {listsComponents}
      <div className="bg-dark rounded kanban-column p-2 align-self-start">
        <AddItem
          title="Add another list"
          handleAddItemClicked={(name) => handleAddListClicked(name)}
        />
      </div>
    </div>
  );
}

const mapStateToProps = (state: ApplicationState) => ({
  lists: state.lists.lists,
});

export default connect(mapStateToProps, { fetchLists, addList })(KanbanBoard);
