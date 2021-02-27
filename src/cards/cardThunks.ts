import API from "../api";
import { fetchCardByIdSucceeded } from "./cardActions";

type DispatchType = (args: ListAction | ListEmptyAction) => ListAction;

export const fetchCardById = (idCard: string) => async (
  dispatch: DispatchType
) => {
  API.get<Card>("cards/" + idCard).then((response) => {
    if (response.status === 200) {
      dispatch(fetchCardByIdSucceeded(response.data));
    }
  });
};
