import React, { useEffect } from "react";
import {
  DragDropContext,
  Droppable,
  DroppableProvided,
  DropResult,
} from "react-beautiful-dnd";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import AddItemList from "../lists/AddItemList";
import List from "../lists/List";
import { fetchListsSucceeded } from "../lists/listActions";
import { addList, fetchLists, onDragEnd } from "../lists/listThunks";
import { ApplicationState } from "../store";
import { resetColors, setBackgroundColorFromPreferences } from "./boardStyle";

interface KanbanBoardProps {
  lists: List[];
  boardPreferences: Map<string, BoardPref>;
  fetchLists: (idBoard: string) => void;
  addList: (name: string, idBoard: string) => Promise<void>;
  onDragEnd: (result: DropResult, lists: List[]) => void;
  fetchListsSucceeded: (lists: List[]) => void;
}

function KanbanBoard({
  fetchLists,
  lists,
  boardPreferences,
  addList,
  onDragEnd,
  fetchListsSucceeded,
}: KanbanBoardProps) {
  const { id, name: boardName } = useParams<RouterParamTypes>();

  useEffect(() => {
    fetchLists(id);

    setBackgroundColorFromPreferences(boardPreferences.get(id));

    return () => {
      fetchListsSucceeded([]);
      resetColors();
    };
  }, [fetchLists, fetchListsSucceeded, id]);

  const handleAddListClicked = (name: string) => {
    if (name === "") {
      return;
    }
    addList(name, id);
  };

  const handleDragEnd = (result: DropResult) => {
    onDragEnd(result, lists);
  };

  const listsComponents = lists?.map((list: List, index: number) => (
    <List key={list.id} list={list} index={index} />
  ));

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <BoardName name={boardName} />
      <div
        className="p-2 horizontal-scrollable d-flex align-items-start"
        id="fancy-scrollbar"
      >
        <Droppable
          droppableId="board"
          type="COLUMN"
          direction="horizontal"
          ignoreContainerClipping={true}
          isCombineEnabled={false}
        >
          {(provided: DroppableProvided) => (
            <div>
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="d-flex align-items-start"
              >
                {listsComponents}
                <AddItemList
                  handleAddListClicked={(name) => handleAddListClicked(name)}
                  index={lists.length}
                />
                {provided.placeholder}
              </div>
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
}

function BoardName({ name }: any) {
  return (
    <nav className="m-0 fs-5 ps-3 text-color mt-1 text-center">{name}</nav>
  );
}

const mapStateToProps = (state: ApplicationState) => ({
  lists: state.lists.lists,
  boardPreferences: state.boards.boardPreferences,
});

export default connect(mapStateToProps, {
  fetchLists,
  addList,
  onDragEnd,
  fetchListsSucceeded,
})(KanbanBoard);
