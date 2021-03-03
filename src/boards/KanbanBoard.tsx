import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import AddItemList from "../lists/AddItemList";
import List from "../lists/List";
import { addList, fetchLists } from "../lists/listThunks";
import { ApplicationState } from "../store";

interface KanbanBoardProps {
  lists: List[];
  fetchLists: (idBoard: string) => void;
  addList: (name: string) => Promise<void>;
}

function KanbanBoard({ fetchLists, lists, addList }: KanbanBoardProps) {
  const { id } = useParams<RouterParamTypes>();

  useEffect(() => {
    fetchLists(id);
  }, [fetchLists, id]);

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
    <div
      className="p-2 horizontal-scrollable d-flex align-items-start bg-secondary"
      id="fancy-scrollbar"
    >
      {listsComponents}
      <AddItemList
        handleAddListClicked={(name) => handleAddListClicked(name)}
      />
    </div>
  );
}

const mapStateToProps = (state: ApplicationState) => ({
  lists: state.lists.lists,
});

export default connect(mapStateToProps, { fetchLists, addList })(KanbanBoard);
