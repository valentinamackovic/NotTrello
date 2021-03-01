import API from "../api";
import { fetchLists } from "../lists/listThunks";
import { addCommentSucceeded, fetchCardByIdSucceeded } from "./cardActions";

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
  dispatch: DispatchType | any
) => {
  API.post<Action>("cards/" + idCard + "/actions/comments?text=" + text).then(
    (response) => {
      if (response.status === 200) {
        dispatch(addCommentSucceeded(response.data));
      }
    }
  );
};
