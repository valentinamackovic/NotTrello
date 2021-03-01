import API from "../api";
import { fetchLists } from "../lists/listThunks";
import { fetchCardByIdSucceeded } from "./cardActions";

type DispatchType = (args: CardAction | CardEmptyAction) => CardAction;

export const fetchCardById = (idCard: string) => async (
  dispatch: DispatchType
) => {
  API.get<Card>("cards/" + idCard + "?fields=id,idList,name,desc").then(
    (response) => {
      if (response.status === 200) {
        dispatch(fetchCardByIdSucceeded(response.data));
      }
    }
  );
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
