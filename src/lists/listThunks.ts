import { DropResult } from "react-beautiful-dnd";
import API from "../api";
import {
  addCardSucceeded,
  addListSucceeded,
  archiveListSucceeded,
  fetchListsSucceeded,
  reorderListsSucceeded,
  updateCardSucceeded,
  updateListSucceeded,
} from "./listActions";

type DispatchType = (args: ListAction | ListEmptyAction) => ListAction;

export const fetchLists = (idBoard: string) => async (
  dispatch: DispatchType
) => {
  API.get<List[]>(
    "boards/" + idBoard + "/lists?fields=name,id,pos&cards=all"
  ).then((response) => {
    if (response.status === 200) {
      dispatch(fetchListsSucceeded(response.data));
    }
  });
};

export const addList = (name: string, idBoard: string) => async (
  dispatch: DispatchType
) => {
  API.post("lists", null, {
    params: {
      pos: "bottom",
      name,
      idBoard,
    },
  }).then((response) => dispatch(addListSucceeded(response.data)));
};

export const updateListName = (idList: string, name: string) => async (
  dispatch: DispatchType
) => {
  API.put<List>("lists/" + idList, null, {
    params: {
      name,
    },
  }).then((response) => dispatch(updateListSucceeded(response.data)));
};

export const archiveList = (idList: string) => async (
  dispatch: DispatchType
) => {
  API.put<List[]>("lists/" + idList + "/closed", null, {
    params: { value: true },
  }).then((response) => {
    if (response.status === 200) {
      dispatch(archiveListSucceeded(idList));
    }
  });
};

export const addCard = (name: string, idList: string) => async (
  dispatch: DispatchType
) => {
  API.post("cards", null, {
    params: {
      name,
      idList,
    },
  }).then((response) => dispatch(addCardSucceeded(response.data, idList)));
};

export const onDragEnd = (result: DropResult, lists: List[]) => async (
  dispatch: any
) => {
  const { source, destination, draggableId } = result;
  if (!destination) {
    return;
  }
  if (
    source.droppableId === destination.droppableId &&
    source.index === destination.index
  ) {
    return;
  }
  if (result.type === "COLUMN") {
    let reorderedLists = reorder(source.index, destination.index, lists);
    const [movedBetween1st, movedBetween2nd] = getSurroundingLists(
      reorderedLists,
      draggableId
    );

    if (!movedBetween1st || !movedBetween2nd) {
      return;
    }

    const newPos =
      movedBetween1st.pos === 0
        ? "top"
        : randomInRange(movedBetween2nd.pos, movedBetween1st.pos);
    dispatch(reorderListsSucceeded(reorderedLists));
    API.put<List>("lists/" + draggableId, null, {
      params: {
        pos: newPos,
      },
    })
      .then((response) => dispatch(updateListSucceeded(response.data)))
      .catch((e) => dispatch(reorderListsSucceeded(lists)));

    return;
  }

  const movedFromList = lists.find((list) => list.id === source.droppableId);
  const movedToList = lists.find((list) => list.id === destination.droppableId);

  if (!movedToList || !movedFromList) {
    return;
  }

  const movedCard =
    movedFromList.cards.find((card) => card.id === draggableId) || ({} as Card);

  if (movedFromList.id === movedToList.id) {
    const shallow = reorder(
      source.index,
      destination.index,
      movedFromList.cards
    );
    const updatedCardList = lists.map((list) => {
      if (list.id === source.droppableId) {
        return { ...list, cards: [...shallow] };
      }
      return list;
    });
    const updatedCard = updateMovedCard(
      shallow,
      draggableId,
      movedCard,
      movedToList.id
    );
    dispatch(fetchListsSucceeded(updatedCardList));
    API.put<Card>("cards/" + draggableId, updatedCard, {
      headers: { "Content-Type": "application/json" },
    })
      .then(({ status, data }) => {
        if (status === 200) {
          dispatch(updateCardSucceeded(data));
          dispatch(fetchListsSucceeded(updatedCardList));
        }
      })
      .catch((e) => dispatch(reorderListsSucceeded(lists)));

    return;
  }

  const movedFromListCopy = JSON.parse(JSON.stringify(movedFromList));
  const movedToListCopy = JSON.parse(JSON.stringify(movedToList));
  movedFromList.cards.splice(source.index, 1);
  movedToList.cards.splice(destination.index, 0, movedCard);
  const updatedCard = updateMovedCard(
    movedToList.cards,
    draggableId,
    movedCard,
    movedToList.id
  );
  dispatch(updateListSucceeded(movedFromList));
  dispatch(updateListSucceeded(movedToList));
  API.put<Card>("cards/" + draggableId, updatedCard, {
    headers: { "Content-Type": "application/json" },
  })
    .then(({ status, data }) => {
      if (status === 200) {
        const reorderedLists = lists.map((l) => {
          if (l.id === movedToList.id) {
            return { ...movedToList };
          } else if (l.id === movedFromList.id) {
            return { ...movedFromList };
          }
          return l;
        });
        dispatch(updateCardSucceeded(data));
        dispatch(fetchListsSucceeded(reorderedLists));
      }
    })
    .catch((e) => {
      dispatch(updateListSucceeded(movedFromListCopy));
      dispatch(updateListSucceeded(movedToListCopy));
    });
};

function reorder(from: number, to: number, list: any[]) {
  const shallow = [...list];
  shallow.splice(to, 0, shallow.splice(from, 1)[0]);
  return shallow;
}

function randomInRange(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getSurroundingLists(list: any[], listId: string): [any, any] {
  const movedListNewIndex = list.find((list) => list.id === listId);
  const movedBetween1st = list[list.indexOf(movedListNewIndex) - 1] || {
    pos: 0,
  };
  const movedBetween2nd = list[list.indexOf(movedListNewIndex) + 1] || {
    pos: Number.MAX_SAFE_INTEGER,
  };
  return [movedBetween1st, movedBetween2nd];
}

function updateMovedCard(
  list: Card[],
  draggableId: string,
  movedCard: Card,
  newIdList: string
): Card {
  const [movedBetween1st, movedBetween2nd] = getSurroundingLists(
    list,
    draggableId
  );
  const newPos = randomInRange(movedBetween2nd.pos, movedBetween1st.pos);
  const updatedMovedCard = { ...movedCard, pos: newPos, idList: newIdList };

  return updatedMovedCard;
}
