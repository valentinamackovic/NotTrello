import API from "../api";
import {
  addCardSucceeded,
  addListSucceeded,
  archiveListSucceeded,
  fetchListsSucceeded,
  updateListSucceeded,
} from "./listActions";

type DispatchType = (args: ListAction | ListEmptyAction) => ListAction;

export const fetchLists = () => async (dispatch: DispatchType) => {
  API.get<List[]>(
    "boards/5fe8b8b82e028f8bf92c61de/lists?fields=name,id&cards=all"
  ).then((response) => {
    if (response.status === 200) {
      dispatch(fetchListsSucceeded(response.data));
    }
  });
};

export const addList = (name: string) => async (dispatch: DispatchType) => {
  API.post("lists", null, {
    params: {
      pos: "bottom",
      name,
      idBoard: "5fe8b8b82e028f8bf92c61de",
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
