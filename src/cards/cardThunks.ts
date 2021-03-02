import API from "../api";
import { fetchLists } from "../lists/listThunks";
import {
  addCommentSucceeded,
  fetchCardByIdSucceeded,
  updateCommentSucceeded,
} from "./cardActions";

type DispatchType = (args: CardAction | CardEmptyAction) => CardAction;

export const fetchCardById = (idCard: string) => async (
  dispatch: DispatchType
) => {
  API.get<Card>(
    "cards/" + idCard + "?fields=id,idList,name,desc&actions=commentCard"
  ).then(({ status, data }) => {
    if (status === 200) {
      dispatch(fetchCardByIdSucceeded(data));
    }
  });
};

export const updateCard = (card: Card) => async (
  dispatch: DispatchType | any
) => {
  API.put<Card>("cards/" + card.id, card, {
    headers: { "Content-Type": "application/json" },
  }).then((response) => {
    if (response.status === 200) {
      dispatch(fetchLists());
    }
  });
};

export const addComment = (idCard: string, text: string) => async (
  dispatch: DispatchType
) => {
  API.post<Action>("cards/" + idCard + "/actions/comments?text=" + text).then(
    (response) => {
      if (response.status === 200) {
        dispatch(addCommentSucceeded(response.data));
      }
    }
  );
};

export const updateComment = (action: Action) => async (
  dispatch: DispatchType
) => {
  API.put<Action>("actions/" + action.id, null, {
    params: { text: action.data.text },
  }).then((response) => {
    if (response.status === 200) {
      dispatch(updateCommentSucceeded(response.data));
    }
  });
};

export const deleteComment = (idAction: string, idCard: string) => async (
  dispatch: DispatchType | any
) => {
  API.delete<Action>("actions/" + idAction).then((response) => {
    if (response.status === 200) {
      dispatch(fetchCardById(idCard));
    }
  });
};

export const archiveCard = (idCard: string) => async (
  dispatch: DispatchType | any
) => {
  API.delete("cards/" + idCard).then((response) => {
    if (response.status === 200) {
      dispatch(fetchLists());
    }
  });
};
