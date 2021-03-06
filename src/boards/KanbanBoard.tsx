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
import { addList, fetchLists, onDragEnd } from "../lists/listThunks";
import { ApplicationState } from "../store";

interface KanbanBoardProps {
  lists: List[];
  fetchLists: (idBoard: string) => void;
  addList: (name: string, idBoard: string) => Promise<void>;
  onDragEnd: (result: DropResult, lists: List[]) => void;
}

function KanbanBoard({
  fetchLists,
  lists,
  addList,
  onDragEnd,
}: KanbanBoardProps) {
  const { id } = useParams<RouterParamTypes>();

  useEffect(() => {
    fetchLists(id);
  }, [fetchLists, id]);

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
      <div
        className="p-2 horizontal-scrollable d-flex align-items-start bg-secondary"
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
                className="d-flex align-items-start bg-secondary"
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

const mapStateToProps = (state: ApplicationState) => ({
  lists: state.lists.lists,
});

export default connect(mapStateToProps, { fetchLists, addList, onDragEnd })(
  KanbanBoard
);
